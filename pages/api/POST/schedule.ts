import axios from 'axios';
import { decryptToken } from 'libs/crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const posts = await prisma.articles.findMany({
    where: {
      publishedAt: null,
      scheduledAt: {
        lte: new Date(),
      },
    },
  });

  if (posts) {
    posts.map(async (article) => {
      if (article.isHashnode) {
        try {
          const tokenResponse = await prisma.tokens.findFirst({
            where: {
              userId: article.userId,
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

          console.log({
            tokenResponse,
            userInfoResponse,
            token,
            publicationId,
          });

          try {
            const hashnodeResponse = await axios({
              method: 'POST',
              url: <string>process.env.HASHNODE_API,
              headers: {
                Authorization: token,
              },
              data: {
                query: `
                mutation($content: String!, $tags:[TagsInput]!) {
                  createPublicationStory(
                    publicationId:"${publicationId}",
                    input: {
                      title: "${article.title}",
                      contentMarkdown: $content,
                      tags: $tags,
                      coverImageURL: "$coverImageUrl",
                    }
                  ) {
                    code
                  }
                }`,
                variables: {
                  content: `${article.content}`,
                  tags: article.hashnodeSelectedTags,
                },
              },
            });
            console.log(hashnodeResponse.data);
            console.log('Done');
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      }

      if (article.isDevTo) {
        try {
          const tokenResponse = await prisma.tokens.findFirst({
            where: {
              userId: article.userId,
              platform: 'devto',
            },
          });

          const token = decryptToken(<string>tokenResponse?.token);
          const devToApiResponse = await axios.post(
            <string>process.env.DEVTO_API + '/articles',
            {
              article: {
                title: article.title,
                published: true,
                body_markdown: `${article.content}`,
                series: article.devToSeries,
              },
            },
            {
              headers: {
                api_key: token,
              },
            }
          );
        } catch (error) {
          console.log(error);
        }
      }

      await prisma.articles.update({
        where: {
          id: article.id,
        },
        data: {
          publishedAt: new Date(),
        },
      });
    });
  }
}
