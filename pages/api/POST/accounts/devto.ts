import { requireSession, RequireSessionProp } from '@clerk/clerk-sdk-node';
import axios from 'axios';
import { decryptToken, encryptToken } from 'libs/crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

async function handler(
  req: RequireSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const userId = <string>req.session.userId;
    const { token } = req.body;
    const tokenUniqueCheckResponse = await prisma.tokens.findMany({
      where: {
        platform: 'devto',
      },
    });
    const filteredTokens = tokenUniqueCheckResponse.filter((fetchedToken) => {
      return decryptToken(fetchedToken.token) === token;
    });
    if (filteredTokens.length > 0) {
      res.json({
        success: false,
        error: {
          field: 'token',
          message: 'Token already exists',
        },
      });
    } else {
      try {
        const devToApiResponse = await axios({
          url: <string>process.env.DEVTO_API + '/articles',
          method: 'POST',
          data: {
            article: {
              title: 'Test post of postlr.' + new Date(),
              published: false,
              body_markdown:
                '#Hello DEV, this is test post of postlr.' + new Date(),
              tags: ['postlr'],
            },
          },
          headers: {
            api_key: token,
          },
        });

        try {
          const addTokenResponse = await prisma.tokens.create({
            data: {
              platform: 'devto',
              token: encryptToken(token),
              userId,
            },
          });

          res.json({
            success: true,
          });
        } catch (error) {
          res.json({
            success: false,
            error: {
              field: 'token',
              message: 'Something went wrong',
            },
          });
        }
      } catch (error) {
        res.json({
          success: false,
          message: error,
          error: {
            field: 'token',
            message: 'Maybe your token is not correct',
          },
        });
      }
    }
  } else {
    res.json({
      success: false,
      error: {
        message: 'Invalid method',
      },
    });
  }
}

export default requireSession(handler);
