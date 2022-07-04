import { gql } from '@apollo/client';
import { client } from '../../utils/apolloClient';

function postsQuery(id) {
  return `
    {
      posts(where: { contentURI_contains: "ipfs", id: "${id}" }) {
        id
        blockNumber
        timestamp
        profile
        contentURI
        count
      }
    }
  `
}

export default function handler(req, res) {
  const { id } = req.query;
  return new Promise((resolve, reject) => {
  client
    .query({
      query: gql(postsQuery(id)),
    })
    .then((data) => {
      res.status(200).json(data.data.posts[0] || {});
      resolve();
    })
    .catch((err) => {
      console.log('Error fetching data: ', err);
      res.status(500);
      resolve();
    })
  })
}
