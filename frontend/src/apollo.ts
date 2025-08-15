import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL || "http://localhost:8000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const org = (window as any).__ORG__ || "demo-org";
  return { headers: { ...headers, "X-Org-Slug": org } };
});

const loggerLink = new ApolloLink((operation, forward) => {
  const start = performance.now();
  return forward(operation).map((result) => {
    const elapsed = performance.now() - start;
    console.log(
      `%c[GraphQL] ${operation.operationName} took ${elapsed.toFixed(2)}ms`,
      "color: #4caf50; font-weight: bold;"
    );
    return result;
  });
});

// Combine links: logger → auth → http
const link = ApolloLink.from([loggerLink, authLink, httpLink]);

export const client = new ApolloClient({
  link,
  connectToDevTools: true,
  headers: {
    "X-Org-Slug": "demo-org",
  },
  cache: new InMemoryCache({
    typePolicies: {
      Project: { keyFields: ["id"] },
      Task: { keyFields: ["id"] },
    },
  }),
});
