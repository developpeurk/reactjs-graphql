import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { URI } from './base';
const client = new ApolloClient({
  link: new WebSocketLink({
    uri: URI,
    options: {
      reconnect: true,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
