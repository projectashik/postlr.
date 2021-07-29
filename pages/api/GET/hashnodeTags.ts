import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchTags } from 'utils/hashnode/gqls';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const hashnodeResponse = await axios.post(<string>process.env.HASHNODE_API, {
    query: fetchTags,
  });

  res.json({
    tags: hashnodeResponse.data.data.tagCategories,
  });
}

export default handler;
