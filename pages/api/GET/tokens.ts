import { requireSession, RequireSessionProp } from '@clerk/clerk-sdk-node';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

async function handler(
  req: RequireSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  const userId = <string>req.session.userId;
  const response = await prisma.tokens.findMany({
    where: {
      userId,
    },
  });

  res.json(response);
}

export default requireSession(handler);
