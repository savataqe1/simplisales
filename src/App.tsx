import React from "react";
import MyRouter from "routers/index";
import { client } from "./ApolloClient/client";
import { AuthProvider } from "./contexts/AuthContext";
// import { UserContext } from "../contexts/UserContext";
import { ApolloProvider, useQuery, gql } from "@apollo/client";
function App() {
  console.log(
    "%c Made by sᴀlvᴀ → ",
    "background: black; color: white; padding: 1ch 2ch; border-radius: 2rem;",
  );
  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <AuthProvider>
        <ApolloProvider client={client}>
          <MyRouter />
        </ApolloProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
