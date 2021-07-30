import { requireSession, RequireSessionProp } from '@clerk/clerk-sdk-node';
import axios from 'axios';
import { decryptToken } from 'libs/crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import { createPOSTGQL } from 'utils/hashnode/gqls';
import prisma from 'utils/prisma';

async function handler(
  req: RequireSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  const userId = <string>req.session.userId;
  let {
    title,
    content,
    coverImage,
    scheduledAt,
    isHashnode,
    isDevTo,
    isScheduled,
    hashnodeTags,
    hideFromHashnodeFeed,
    hashnodeCoverImageUrl,
    devToCoverImageUrl,
    devToTags,
    devToSeries,
  } = req.body;

  const mainHashnodeImage = hashnodeCoverImageUrl
    ? hashnodeCoverImageUrl
    : coverImage;
  const mainDevToImage = devToCoverImageUrl ? devToCoverImageUrl : coverImage;
  content += '\n\n\n Posted using Postlr. ';
  if (isScheduled) {
    try {
      const addDataResponse = await prisma.articles.create({
        data: {
          title,
          content,
          coverImageUrl: coverImage,
          scheduledAt,
          isHashnode,
          isDevTo,
          hashnodeSelectedTags: hashnodeTags,
          hideFromHashnodeFeed,
          hashnodeCoverImageUrl,
          devToCoverImageUrl,
          devToTags,
          devToSeries,
          userId,
        },
      });

      res.json({
        success: true,
        message: 'Content Added for Scheduling',
      });
    } catch (error) {
      res.json({
        success: false,
        message: error.message,
        error: 'Something went wrong',
      });
    }
  } else {
    try {
      const addDataResponse = await prisma.articles.create({
        data: {
          title,
          content,
          coverImageUrl: coverImage,
          scheduledAt,
          isHashnode,
          isDevTo,
          hashnodeSelectedTags: hashnodeTags,
          hideFromHashnodeFeed,
          hashnodeCoverImageUrl,
          devToCoverImageUrl,
          devToTags,
          devToSeries,
          userId,
        },
      });

      if (isHashnode) {
        try {
          const tokenResponse = await prisma.tokens.findFirst({
            where: {
              userId,
              platform: 'hashnode',
            },
          });

          const userInfoResponse = await prisma.hashnodeInfo.findFirst({
            where: {
              tokenId: tokenResponse?.id,
            },
          });

          const token = decryptToken(<string>tokenResponse?.token);
          const publicationId = <string>userInfoResponse?.publicationId;

          try {
            const hashnodeResponse = await axios({
              method: 'POST',
              url: <string>process.env.HASHNODE_API,
              headers: {
                Authorization: '6a8ff3c9-f5ed-496d-b751-65e2365a0f71',
              },
              data: {
                query: `
                mutation($content: String!, $tags:[TagsInput]!) {
                  createPublicationStory(
                    publicationId:"${publicationId}",
                    input: {
                      title: "${title}",
                      contentMarkdown: $content,
                      tags: $tags,
                      coverImageURL: "$coverImageUrl",
                    }
                  ) {
                    code
                  }
                }`,
                variables: {
                  content: `${content}`,
                  tags: hashnodeTags,
                },
              },
            });
          } catch (error) {
            res.json({
              success: false,
              message: error.message,
              error: 'Something went wrong hashnodeGrql',
            });
          }
        } catch (error) {
          res.json({
            success: false,
            message: error.message,
            error: 'Hashnode detail Fetch',
          });
        }
      }

      if (isDevTo) {
        try {
          const tokenResponse = await prisma.tokens.findFirst({
            where: {
              userId,
              platform: 'devto',
            },
          });

          const token = decryptToken(<string>tokenResponse?.token);
          const devToApiResponse = await axios.post(
            <string>process.env.DEVTO_API + '/articles',
            {
              article: {
                title,
                published: true,
                body_markdown: `${content}`,
                series: devToSeries,
              },
            },
            {
              headers: {
                api_key: token,
              },
            }
          );
        } catch (error) {
          res.json({
            success: false,
            message: error.message,
            error: 'Something went wrong devTO',
          });
        }
      }

      res.json({
        success: true,
        message: 'Article Published',
      });
    } catch (error) {
      res.json({
        success: false,
        message: error.message,
        error: 'Something went wrong create',
      });
    }
  }
}

export default requireSession(handler);
