import { gql } from '@apollo/client';
import { client } from '../../utils/apolloClient';

function attestationsQuery(attestor, profile) {
  return `
    {
      attestations(where: { attestor: "${attestor.toLowerCase()}", profile: "${profile.toLowerCase()}" }) {
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
  const { attestor, profile } = req.query;
  return new Promise((resolve, reject) => {
  client
    .query({
      query: gql(attestationsQuery(attestor, profile)),
    })
    .then((data) => {
      res.status(200).json(data.data.attestations[0] || {value: 0});
      resolve();
    })
    .catch((err) => {
      console.log('Error fetching data: ', err)
      res.status(500);
      resolve();
    })
  })
}
