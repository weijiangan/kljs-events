import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { format } from "date-fns";
import styles from "./styles.css";
import wb from "../whiteBox.css";

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

const Page = () => {
  const { loading, error, data } = useQuery(QUERY);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <div className={wb.whiteBox}>
        <h1>All Events</h1>
        <ol className={styles.eventList}>
          {data.events
            .sort((a, b) => b.timeStart - a.timeStart)
            .map(event => {
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
      </div>
    </div>
  );
};

export default Page;
