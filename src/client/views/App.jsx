import React, { lazy, Suspense, useState } from "react";
import { hot } from "react-hot-loader/root";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./Layout";
import { client } from "../ApolloClient";
import "../faLibrary";
import "../css/app.css";

const LandingPage = lazy(() => import("./LandingPage"));
const TalkPage = lazy(() => import("./Talk"));
const TalksPage = lazy(() => import("./Talks"));
const EventsPage = lazy(() => import("./Events"));
const EventPage = lazy(() => import("./Event"));
const CreateEvent = lazy(() => import("./CreateEvent"));
const CreateTalk = lazy(() => import("./CreateTalk"));
const Login = lazy(() => import("./Login"));
const UserPage = lazy(() => import("./User"));

const GlobalState = React.createContext({});

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
                  <Route path="/talk/new" component={CreateTalk} />
                  <Route path="/talk/:id" component={TalkPage} />
                  <Route path="/talks" component={TalksPage} />
                  <Route path="/event/new" component={CreateEvent} />
                  <Route path="/event/:id" component={EventPage} />
                  <Route path="/events" component={EventsPage} />
                  <Route path="/user/:id" component={UserPage} />
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
