import { requireSession, RequireSessionProp } from '@clerk/clerk-sdk-node';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

async function handler(
  req: RequireSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const userId = <string>req.session.userId;
    const { id } = req.body;
    try {
      const tokenResponse = await prisma.tokens.findFirst({
        where: {
          userId,
          id,
        },
      });

      if (tokenResponse?.platform === 'hashnode') {
        try {
          const hashnodeInfoResponse = await prisma.hashnodeInfo.delete({
            where: {
              tokenId: id,
            },
          });

          const tokenResponse = await prisma.tokens.delete({
            where: {
              id,
            },
          });

          res.json({
            success: true,
          });
        } catch (error) {
          res.json({
            success: false,
            error: 'Unable to remove',
          });
        }
      } else {
        try {
          const tokenResponse = await prisma.tokens.delete({
            where: {
              id,
            },
          });

          res.json({
            success: true,
          });
        } catch (error) {
          res.json({
            success: false,
            error: 'Unable to remove',
          });
        }
      }
    } catch (error) {
      res.json({
        success: false,
        error: "Account doesn't exists",
      });
    }
  } else {
    res.json({
      success: false,
      error: 'Invalid Method',
    });
  }
}

export default requireSession(handler);
