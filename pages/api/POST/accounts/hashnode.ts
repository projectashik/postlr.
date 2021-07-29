import { requireSession, RequireSessionProp } from '@clerk/clerk-sdk-node';
import axios from 'axios';
import { encryptToken } from 'libs/crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import { createTestPOSTGQL, deletePost } from 'utils/hashnode/gqls';
import prisma from 'utils/prisma';

async function handler(
  req: RequireSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  const userId = <string>req.session.userId;
  const { username, token } = req.body;
  const usernameCheckResponse = await prisma.hashnodeInfo.findFirst({
    where: {
      username,
    },
  });

  if (usernameCheckResponse) {
    res.json({
      success: false,
      error: {
        field: 'username',
        message: 'Username already exists.',
      },
    });
  } else {
    try {
      // === Check username
      // Send request to hashnode api to check whether the user exist or not
      const hashnodeApiRes = await axios.post(
        <string>process.env.HASHNODE_API,
        {
          query: `query {
            user(username: "${username}") {
              publication {
                _id
              }
            }
          }`,
        }
      );
      // Fetched Publication ID
      const publicationId = hashnodeApiRes.data.data.user.publication._id;

      if (publicationId) {
        // === Check Token
        try {
          // Send Request to hashnode api to create the post
          const hashnodeCreatePostResponse = await axios({
            url: <string>process.env.HASHNODE_API,
            method: 'POST',
            data: {
              query: createTestPOSTGQL(publicationId),
            },
            headers: {
              Authorization: token,
            },
          });
          // If the token is valid remove post
          const postId =
            hashnodeCreatePostResponse.data.data.createPublicationStory.post
              ._id;
          try {
            const hashnodeDeletePostResponse = await axios({
              url: <string>process.env.HASHNODE_API,
              method: 'POST',
              data: {
                query: deletePost(postId),
              },
              headers: {
                Authorization: token,
              },
            });

            try {
              const tokenResponse = await prisma.tokens.create({
                data: {
                  token: encryptToken(token),
                  platform: 'hashnode',
                  userId,
                },
              });

              const { id: tokenId } = tokenResponse;

              try {
                const hashnodeInfoResponse = await prisma.hashnodeInfo.create({
                  data: {
                    publicationId,
                    username,
                    userId,
                    tokenId,
                  },
                });

                res.json({
                  success: true,
                });
              } catch (error) {
                res.json({
                  success: false,
                  message: error,
                });
              }
            } catch (error) {
              res.json({
                success: false,
                message: error,
              });
            }
          } catch (error) {
            res.json({
              success: false,
              message: error.message,
              error:
                'Unable to delete test post. Please visit you blog and delete the test post',
            });
          }
        } catch (error) {
          res.json({
            success: false,
            message: error.message,
            error: {
              field: 'token',
              message: 'Maybe your token is not correct',
            },
          });
        }
      } else {
        res.json({
          success: false,
          error: {
            field: 'username',
            message: 'Maybe your username is not correct',
          },
        });
      }
    } catch (error) {
      res.json({
        success: false,
        message: error.message,
        error: {
          field: 'username',
          message: 'Maybe your username is not correct',
        },
      });
    }
  }
}

export default requireSession(handler);
