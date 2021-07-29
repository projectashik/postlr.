import { NextApiRequest, NextApiResponse } from 'next';

import { requireSession, RequireSessionProp } from '@clerk/clerk-sdk-node';
import prisma from 'utils/prisma';

async function handler(
  req: RequireSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  const userId = <string>req.session.userId;
  const { id }: any = req.query;
  try {
    const response = await prisma.images.findFirst({
      where: {
        userId,
        id,
      },
    });

    res.json(response);
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
}

export default requireSession(handler);
