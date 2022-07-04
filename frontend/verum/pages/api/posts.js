import { gql } from '@apollo/client';
import { client } from '../../utils/apolloClient';

function postsQuery(address) {
  return `
    {
      posts(where: { contentURI_contains: "ipfs", profile: "${address.toLowerCase()}" }) {
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
  const { address } = req.query;
  return new Promise((resolve, reject) => {
    client
      .query({
        query: gql(postsQuery(address)),
      })
      .then((data) => {
        res.status(200).json(data.data.posts);
        resolve();
      })
      .catch((err) => {
        console.log('Error fetching data: ', err);
        res.status(500);
        resolve();
      })
  })
}
