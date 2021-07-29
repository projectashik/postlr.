import {
  requireSession,
  RequireSessionProp,
  WithSessionProp,
} from '@clerk/clerk-sdk-node';
import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'libs/cloudinary';
import prisma from 'utils/prisma';

async function handler(
  req: RequireSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  try {
    const userId = <string>req.session.userId;
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr);
    const { url } = uploadedResponse;
    if (uploadedResponse) {
      try {
        const response = await prisma.images.create({
          data: {
            url,
            userId,
          },
        });

        res.json({
          success: true,
          data: response,
        });
      } catch (error) {
        res.json({
          success: false,
          error: error.message,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ err: 'Something went wrong' });
  }
}

export default requireSession(handler);
