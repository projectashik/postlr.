import { NextApiRequest, NextApiResponse } from 'next';

import { requireSession, RequireSessionProp } from '@clerk/clerk-sdk-node';
import prisma from 'utils/prisma';

async function handler(
  req: RequireSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  const userId = <string>req.session.userId;
  const response = await prisma.images.findMany({
    where: {
      userId,
    },
  });

  res.json(response);
}

export default requireSession(handler);
