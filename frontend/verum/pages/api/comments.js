import { gql } from '@apollo/client';
import { client } from '../../utils/apolloClient';

function commentsQuery(id) {
  return `
    {
      comments(where: { contentURI_contains: "ipfs", postID: "${id}" }) {
        id
        blockNumber
        timestamp
        profile
        postID
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
      query: gql(commentsQuery(id)),
    })
    .then((data) => {
      res.status(200).json(data.data.comments);
      resolve();
    })
    .catch((err) => {
      console.log('Error fetching data: ', err)
      res.status(500);
      resolve();
    })
  })
}
