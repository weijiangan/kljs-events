import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { NewButton } from "../components/NewButton";
import styles from "./styles.css";
import wb from "../whiteBox.css";

const QUERY = gql`
  {
    talks {
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
`;

const Page = () => {
  const { loading, error, data } = useQuery(QUERY);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h1>All Talks</h1>
        <NewButton href={`/talk/new`}>New Talk/Request</NewButton>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <div className={wb.whiteBox}>
            <h2>Past Talks</h2>
            <ol className={styles.talkList}>
              {data.talks.map(talk => {
                return (
                  <li>
                    <h3 className={styles.talkName}>
                      <Link to={`/talk/${talk.id}`}>{talk.activity.title}</Link>
                    </h3>
                    <div>
                      {talk.activity.description.slice(0, 140)}
                      {talk.activity.description.length > 140
                        ? "..."
                        : undefined}
                    </div>
                    <div className={styles.talkDesc}>
                      <div>
                        <Link to={`/user/${talk.speaker.id}`}>
                          {talk.speaker.name}
                        </Link>
                      </div>
                      <div>{talk.activity.length} mins</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
        <div className={styles.col}>
          <div className={wb.whiteBox}>
            <h2>Talk Requests</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
