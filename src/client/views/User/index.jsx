import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import UserPicture from "../../components/UserPicture";
import wb from "../../css/whiteBox.css";
import layout from "../../css/layout.css";
import styles from "./styles.css";

const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      name
      description
      email
      socials {
        id
        type
        value
      }
      talks {
        id
        activity {
          title
        }
      }
    }
  }
`;

const iconMap = {
  TWITTER: {
    icon: ["fab", "twitter"],
    template: uid => `https://twitter.com/${uid}`
  },
  GITHUB: {
    icon: ["fab", "github"],
    template: uid => `https://github.com/${uid}`
  },
  PERSONAL: {
    icon: ["fas", "globe-asia"],
    template: uid => uid
  }
};

const User = ({ match, ...props }) => {
  const { data, loading } = useQuery(GET_USER, {
    variables: { id: match.params.id }
  });
  const { user } = data;

  if (loading) {
    return (
      <div className={layout.container}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={layout.container}>
      <div className={wb.whiteBox}>
        <div style={{ display: "flex" }}>
          <UserPicture picture={user.image} />
          <h1>{user.name}</h1>
        </div>
        <p>{user.description || "No description set"}</p>
        <p>
          <FontAwesomeIcon icon={["fas", "envelope"]} />
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </p>
        {user.socials.map(item => (
          <div key={item.id}>
            <FontAwesomeIcon icon={iconMap[item.type].icon} />
            <span>
              <a target="blank" href={iconMap[item.type].template(item.value)}>
                {item.value}
              </a>
            </span>
          </div>
        ))}
      </div>
      <div className={wb.whiteBox}>
        <h2>Talks</h2>
        {user.talks.map(talk => {
          return (
            <div key={talk.id}>
              <Link to={`/talk/${talk.id}`}>{talk.activity.title}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default User;
