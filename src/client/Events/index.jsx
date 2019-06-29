import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { format } from "date-fns";
import styles from "./styles.css";

const QUERY = gql`
  {
    events {
      id
      name
      timeStart
      venue {
        name
        address
        googPlaceId
        coords {
          x
          y
        }
      }
      agenda {
        order
        activity {
          ... on Activity {
            id
            type
            title
            description
            length
          }
          ... on Talk {
            id
            remarks
            speaker {
              id
              name
            }
            activity {
              type
              title
              description
              length
            }
          }
        }
      }
    }
  }
`;

const Page = () => (
  <div
    className={styles.container}
    style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
  >
    <h1>All Events</h1>
    <Query query={QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;
        return (
          <ol className={styles.eventList}>
            {data.events.reverse().map(event => {
              const date = new Date(event.timeStart * 1000);
              return (
                <li>
                  <Link to={`/event/${event.id}`}>
                    <span className={styles.eventName}>{event.name}</span>
                  </Link>
                  <div className={styles.eventDesc}>
                    <div>{format(date, "D MMM YYYY")}</div>
                    <div>{event.venue.name}</div>
                  </div>
                </li>
              );
            })}
          </ol>
        );
      }}
    </Query>
  </div>
);

export default Page;
