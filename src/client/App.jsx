import React, { lazy, Suspense, useState } from "react";
import { hot } from "react-hot-loader/root";
import { ApolloProvider } from "@apollo/react-hooks";
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
import Layout from "./Layout";
import "./app.css";

const LandingPage = lazy(() => import("./LandingPage"));
const TalkPage = lazy(() => import("./Talk"));
const EventsPage = lazy(() => import("./Events"));
const EventPage = lazy(() => import("./Event"));
const Login = lazy(() => import("./Login"));

const GlobalState = React.createContext({});

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

const App = () => {
  const [state, setState] = useState({ token: localStorage.getItem("token") });
  return (
    <ApolloProvider client={client}>
      <GlobalState.Provider value={state}>
        <Router>
          <Suspense fallback={null}>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Layout>
                <Switch>
                  <Route path="/talk/:id" component={TalkPage} />
                  <Route path="/event/:id" component={EventPage} />
                  <Route path="/events" component={EventsPage} />
                  <Route path="/login" component={Login} />
                </Switch>
              </Layout>
            </Switch>
          </Suspense>
        </Router>
      </GlobalState.Provider>
    </ApolloProvider>
  );
};

export default hot(App);
export { GlobalState };
