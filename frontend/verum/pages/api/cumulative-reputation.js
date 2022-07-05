import { gql } from '@apollo/client';
import { client } from '../../utils/apolloClient';

function reputationQuery(address) {
  return `
  {
    cumulativeReputations(where: {profile: "${address.toLowerCase()}"}) {
      timestamp
      value
    }
  }
  `
}

export default function handler(req, res) {
  const { address } = req.query;
  return new Promise((resolve, reject) => {
    client
      .query({
        query: gql(reputationQuery(address)),
      })
      .then((data) => {
        res.status(200).json(data.data.cumulativeReputations);
        resolve();
      })
      .catch((err) => {
        console.log('Error fetching data: ', err)
        res.status(405);
        resolve();
      })
  });
}
