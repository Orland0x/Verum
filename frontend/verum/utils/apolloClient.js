import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GRAPH_API_URL } from './variables';

const APIURL = GRAPH_API_URL;

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
})
 export { client };
