import React, { lazy, Suspense } from "react";
import { hot } from "react-hot-loader/root";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faClock, faCalendar } from "@fortawesome/free-regular-svg-icons";
import {
  faMapMarkerAlt,
  faUser,
  faPizzaSlice,
  faBuilding,
  faComments,
  faEnvelope,
  faChild
} from "@fortawesome/free-solid-svg-icons";
import { client } from "./ApolloClient";
import "./app.css";

const LandingPage = lazy(() => import("./LandingPage"));
const TalkPage = lazy(() => import("./Talk"));
const EventPage = lazy(() => import("./Events"));

library.add(
  faClock,
  faCalendar,
  faMapMarkerAlt,
  faUser,
  faPizzaSlice,
  faBuilding,
  faComments,
  faEnvelope,
  faChild
);

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/talk/:id" component={TalkPage} />
          <Route path="/events" component={EventPage} />
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </Suspense>
    </Router>
  </ApolloProvider>
);

export default hot(App);
