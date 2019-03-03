import React from "react";
import { hot } from "react-hot-loader/root";
import { Query, Mutation } from "react-apollo";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";
import { format } from "date-fns";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import "!style-loader!css-loader!react-vertical-timeline-component/style.min.css";
import styles from "./app.css";

library.add(faClock, faMapMarkedAlt);

const client = new ApolloClient({
  uri: "http://192.168.0.164:4000/graphql"
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
        googPlaceId
        coords {
          x
          y
        }
      }
      talks {
        id
        title
        speaker {
          name
          email
          description
        }
        length
        remarks
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
      <div className={styles.topBar}>
        <div>KLJS</div>
        <div className={styles.flexCenter}>
          <button type="button" className={styles.topButton}>
            Support us!
          </button>
        </div>
      </div>
      <div
        className={styles.picture}
        style={{ height: `calc(100vh - 280px)` }}
      />
      <div className={styles.hero}>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.tabActive}>Next Event</div>
          </div>
          <div className={styles.col}>
            <div className={styles.tab}>Past Events</div>
          </div>
          <div className={styles.col}>
            <div className={styles.tab}>Talks</div>
          </div>
        </div>
        <Query query={GET_LATEST_EVENT}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;

            const event = data.events[0];
            const dateStart = new Date(event.timeStart * 1000);
            const dateEnd = new Date(event.timeEnd * 1000);
            return (
              <div className={styles.container}>
                <h1 className={styles.heroTitle}>{event.name}</h1>
                <div
                  className={styles.flex}
                  style={{ marginBottom: "0.75rem" }}
                >
                  <div className={styles.iconBullet}>
                    <FontAwesomeIcon icon={["far", "clock"]} />
                  </div>
                  <div>{`${format(dateStart, "H:mm")} - ${format(
                    dateEnd,
                    "H:mm"
                  )}`}</div>
                </div>
                <div className={styles.flex}>
                  <div className={styles.iconBullet}>
                    <FontAwesomeIcon icon={["fas", "map-marked-alt"]} />
                  </div>
                  <div>
                    <div>{event.venue.name}</div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: event.venue.address.replace(/\n/g, "<br/>")
                      }}
                    />
                  </div>
                </div>
                <VerticalTimeline>
                  <VerticalTimelineElement
                    date="7.30 PM"
                    iconStyle={{
                      background: "rgb(33, 150, 243)",
                      color: "#fff"
                    }}
                  >
                    <h3 className="vertical-timeline-element-title">
                      Networking + Light Food/Snacks
                    </h3>
                    <p>Food sponsored by Vase.ai</p>
                  </VerticalTimelineElement>
                  {event.talks.map((talk, index) => (
                    <VerticalTimelineElement
                      date="8.00 PM"
                      iconStyle={{
                        background: "rgb(33, 150, 243)",
                        color: "#fff"
                      }}
                    >
                      <h3 className="vertical-timeline-element-title">
                        {talk.title}
                      </h3>
                      <h4>{talk.speaker.name}</h4>
                      <p>{talk.description}</p>
                    </VerticalTimelineElement>
                  ))}
                  <VerticalTimelineElement
                    date="9.30 PM"
                    iconStyle={{
                      background: "rgb(33, 150, 243)",
                      color: "#fff"
                    }}
                  >
                    <h3 className="vertical-timeline-element-title">
                      Mingle and go home
                    </h3>
                  </VerticalTimelineElement>
                </VerticalTimeline>
              </div>
            );
          }}
        </Query>
      </div>
    </div>
  </ApolloProvider>
);

export default hot(App);
