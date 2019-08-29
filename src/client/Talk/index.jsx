import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const ytLinkToEmbed = link => {
  const re = /(?:youtube.com\/watch\?v=|youtu.be\/)([\w\d]*)(?:&t=(\d+))?/;
  const [, videoId, start] = link.match(re);
  return (
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${videoId}${
        start ? `?start=${start}` : ""
      }`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

const Page = ({ match }) => {
  const { loading, error, data } = useQuery(GET_TALK, {
    variables: { id: match.params.id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const { talk } = data;

  const ytLinks = talk.activity.links.filter(link => link.type === "YOUTUBE");

  const slidesLinks = talk.activity.links.filter(
    link => link.type === "SLIDES"
  );

  return (
    <>
      <h1>{talk.activity.title}</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className={styles.userPicture}>
          {talk.speaker.image ? (
            <img src={talk.speaker.image} style={{ width: "100%" }} />
          ) : (
            <div className={styles.placeHolderBg}>
              <FontAwesomeIcon
                className={styles.placeHolder}
                icon={["fas", "user"]}
              />
            </div>
          )}
        </div>
        <div>
          <Link to={`/user/${talk.speaker.id}`}>
            <div>{talk.speaker.name}</div>
          </Link>
          <div>{talk.activity.length} mins</div>
        </div>
      </div>
      <h2>Overview</h2>
      <p>{talk.activity.description}</p>
      {ytLinks.length > 0 && (
        <>
          <h2>Video</h2>
          {ytLinks.map(link => (
            <>
              <div className={styles.ytEmbed}>{ytLinkToEmbed(link.url)}</div>
              <p>{link.description}</p>
            </>
          ))}
        </>
      )}
      {slidesLinks.length > 0 && (
        <>
          <h2>Link to slides</h2>
          <ol>
            {slidesLinks.map(link => (
              <li>
                <a href={link.url}>{link.url}</a> &mdash; {link.description}
              </li>
            ))}
          </ol>
        </>
      )}
    </>
  );
};

export default props => (
  <div className={styles.container}>
    <Page {...props} />
  </div>
);
