import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styles from "./style.css";

const GET_TALK = gql`
  query($id: ID!) {
    talk(id: $id) {
      id
      activity {
        title
        description
        length
        links {
          url
          type
          description
        }
      }
      speaker {
        id
        name
        email
        socials {
          type
          value
        }
      }
    }
  }
`;

const Page = ({ match }) => (
  <Query query={GET_TALK} variables={{ id: match.params.id }}>
    {({ loading, error, data }) => {
      if (loading) return <p>"Loading..."</p>;
      if (error) return <p>"Error"</p>;
      console.log(data);
      const { talk } = data;
      return (
        <div
          className={styles.container}
          style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
        >
          <h1>{talk.activity.title}</h1>
          <div>{talk.speaker.name}</div>
          <div>{talk.activity.length} mins</div>
          <h2>Overview</h2>
          <p>{talk.activity.description}</p>
          {talk.activity.links ? (
            <>
              <h2>Link to slides</h2>
              <ol>
                {talk.activity.links.map(link => {
                  return link.type === "SLIDES" ? (
                    <li>
                      <a href={link.url}>{link.url}</a> &mdash;{" "}
                      {link.description}
                    </li>
                  ) : (
                    undefined
                  );
                })}
              </ol>
            </>
          ) : (
            undefined
          )}
        </div>
      );
    }}
  </Query>
);

export default Page;
