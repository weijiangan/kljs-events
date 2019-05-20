import React from "react";
import { hot } from "react-hot-loader/root";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faClock, faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import LandingPage from "./LandingPage";
import "./app.css";

library.add(faClock, faCalendar, faMapMarkedAlt);

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route path="/" component={LandingPage} />
      </Switch>
    </Router>
  </ApolloProvider>
);

export default hot(App);
