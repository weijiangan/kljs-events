import React, { lazy, Suspense } from "react";
import { hot } from "react-hot-loader/root";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faClock, faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faMapMarkedAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { client } from "./ApolloClient";
import "./app.css";

const LandingPage = lazy(() => import("./LandingPage"));
const TalkPage = lazy(() => import("./Talk"));

library.add(faClock, faCalendar, faMapMarkedAlt, faUser);

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/talk/:id" component={TalkPage} />
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </Suspense>
    </Router>
  </ApolloProvider>
);

export default hot(App);
