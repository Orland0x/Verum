import { gql } from '@apollo/client';
import { client } from '../../utils/apolloClient';
import { fetchIPFSData } from '../../utils/ethersUtils';

function postsQuery(addresses) {
  return `
  {
    posts(where: { profile_in: ${addresses}, contentURI_contains: "ipfs" } ) {
      id
      timestamp
      contentURI
      profile
    }
  }
  `
}

export default async function handler(req, res) {
  const { cid } = req.query;
  const networkData = await fetchIPFSData(cid);
  const addressArray = [];
  networkData.addresses.map((el) => {
    addressArray.push(el.toString());
  })
  return new Promise((resolve, reject) => {
  client
    .query({
      query: gql(postsQuery(JSON.stringify(addressArray))),
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
