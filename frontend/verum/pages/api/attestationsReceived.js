import { gql } from '@apollo/client';
import { client } from '../../utils/apolloClient';

function attestationsQuery(address) {
  return `
    {
      attestations(where: { profile: "${address.toLowerCase()}" }) {
            id
        blockNumber
        timestamp
        attestor
        profile
        value
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
        query: gql(attestationsQuery(address)),
      })
      .then((data) => {
        res.status(200).json(data.data.attestations);
        resolve();
      })
      .catch((err) => {
        console.log('Error fetching data: ', err);
        res.status(500);
        resolve();
      })
  })
}
