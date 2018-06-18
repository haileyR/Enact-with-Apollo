# Use Apollo with Enact and Github GraphqQL API

## Setup and use
1. Get Personal access token for github API from https://github.com/settings/tokens/new.
  - Select repo for scopes.
2. Replace the dummy token in [src/config.json](src/config.json) with your token.
3. Install node_modules
```
npm install
```
4. Serve
```
npm run serve
```
5. Open http://localhost:8080/.
6. Search a github id with selections of repositories, followers, and/or organizations.


### How Apollo is used.

You need to make a new ApolloClient with uri and request setup.
[src/App/App.js]
```javascript
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
	request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${config.token}`,
      },
    });
  },
});
```

Pass the client as a prop to the ApolloProvider component which wraps your components which will need the data from Query.
[src/App/App.js](src/App/App.js)
```javascript
import { ApolloProvider } from "react-apollo";

<ApolloProvider client={client}>
  ...
</ApolloProvider>
```

Write a query (GET_USER) using gql and pass it as query prop for the Query component.

[src/views/Detail.js](src/views/Detail.js)
```javascript
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_USER = gql`
  query($login: String!) {
    user(login: $login) {
      name
      avatarUrl
      organizations(first: 10) {
        nodes {
          name
        }
      }
      repositories(first: 10) {
        nodes {
          name
          url
        }
      }
      followers(first: 10) {
        nodes {
          name
        }
      }
    }
  }
`;

<Query query={GET_USER} variables={{ login: formData.userId }}>
  {({loading, data}) => {
    ...
  }}
</Query>
```
