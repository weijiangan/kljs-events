import React from "react";
import { hot } from "react-hot-loader/root";
import { Query, Mutation } from "react-apollo";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";
import { format } from "date-fns";
import styles from "./app.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const GET_LATEST_EVENT = gql`
  {
    events {
      name
      timeStart
      timeEnd
      venue {
        name
        address
      }
    }
  }
`;

const FUCK = gql`
  mutation Test($eventId: String!, $venue: VenueInput!) {
    updateEvent(eventId: $eventId, venue: $venue) {
      id
      name
      venue {
        id
        name
        address
      }
    }
  }
`;

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <div className={styles.topBar}>KualaLumpurJS</div>
      <div className={styles.hero}>
        <Query query={GET_LATEST_EVENT}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;

            const event = data.events[0];
            const dateStart = new Date(event.timeStart * 1000);
            const dateEnd = new Date(event.timeEnd * 1000);
            return (
              <React.Fragment>
                <h1 className={styles.heroTitle}>{event.name}</h1>
                <div>{`${format(dateStart, "H:mm")} - ${format(
                  dateEnd,
                  "H:mm"
                )}`}</div>
                <div>{event.venue.name}</div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: event.venue.address.replace(/\n/g, "<br/>")
                  }}
                />
              </React.Fragment>
            );
          }}
        </Query>
      </div>
    </div>
  </ApolloProvider>
);

export default hot(App);
