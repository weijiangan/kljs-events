import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import gql from "graphql-tag";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "!style-loader!css-loader!react-vertical-timeline-component/style.min.css";
import { googleMapsUrlify } from "../shared";
import styles from "./style.css";

const GET_EVENT = gql`
  query Event($eventId: ID!) {
    event(id: $eventId) {
      name
      timeStart
      venue {
        name
        address
        city
        state
        postcode
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

const Content = ({ match }) => {
  return (
    <EventFetcher eventId={match.params.id}>
      {event => (
        <>
          <EventInfo event={event} />
          <Timeline event={event} />
        </>
      )}
    </EventFetcher>
  );
};

const EventFetcher = ({ eventId, children }) => {
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { eventId }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const { event } = data;
  console.log(event);
  let tally = event.timeStart;

  const newAgenda = event.agenda
    .sort((a, b) => a.order - b.order)
    .map((item, index) => {
      let { activity, ...rest } = item;

      if (activity.type !== "BASIC" && activity.activity) {
        const { activity: nested, ...rest } = activity;
        activity = { ...rest, ...nested };
      }

      activity.time = tally;
      tally = activity.time + activity.length * 60;
      return { ...rest, activity };
    });

  event.agenda = newAgenda;
  event.timeEnd = tally;

  return children(event);
};

const NavMenu = () => (
  <div className={styles.row}>
    <div className={styles.col}>
      <div className={styles.tabActive}>Next Event</div>
    </div>
    <div className={styles.col}>
      <Link to="events" className={styles.tab}>
        Past Events
      </Link>
    </div>
    <div className={styles.col}>
      <Link to="/talks" className={styles.tab}>
        Talks
      </Link>
    </div>
  </div>
);

const EventInfo = ({ event }) => {
  const dateStart = new Date(event.timeStart * 1000);
  const dateEnd = new Date(event.timeEnd * 1000);
  const mapsUrl = googleMapsUrlify(event.venue.address.replace(/\n/g, ""));
  return (
    <div className={styles.container}>
      <h1>{event.name}</h1>
      <div className={styles.flex} style={{ marginBottom: "0.75rem" }}>
        <div className={styles.iconBullet}>
          <FontAwesomeIcon icon={["far", "calendar"]} />
        </div>
        <div>{format(dateStart, "D MMMM YYYY (dddd)")}</div>
      </div>
      <div className={styles.flex} style={{ marginBottom: "0.75rem" }}>
        <div className={styles.iconBullet}>
          <FontAwesomeIcon icon={["far", "clock"]} />
        </div>
        <div>{`${format(dateStart, "h:mm")} - ${format(
          dateEnd,
          "h:mm A"
        )}`}</div>
      </div>
      <div className={styles.flex}>
        <div className={styles.iconBullet}>
          <FontAwesomeIcon icon={["fas", "map-marker-alt"]} />
        </div>
        <div>
          <a
            style={{}}
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {event.venue.name}
          </a>
          <div
            dangerouslySetInnerHTML={{
              __html: event.venue.address.replace(/\n/g, "<br/>")
            }}
          />
          <div>
            {event.venue.postcode} {event.venue.city}
          </div>
          <div>{event.venue.state}</div>
        </div>
      </div>
    </div>
  );
};

const Timeline = ({ event }) => (
  <div>
    <div className={styles.container}>
      <h2>Agenda</h2>
    </div>
    <div>
      <VerticalTimeline>
        {event.agenda.map(({ activity }) => (
          <VerticalTimelineElement
            key={activity.id}
            date={format(new Date(activity.time * 1000), "h:mm A")}
            iconStyle={{
              background: "rgb(33, 150, 243)",
              color: "#fff"
            }}
          >
            {activity.type === "TALK" ? (
              <h3 className={styles.timelineTitle}>
                <Link to={`/talk/${activity.id}`}>{activity.title}</Link>
              </h3>
            ) : (
              <h3 className={styles.timelineTitle}>{activity.title}</h3>
            )}
            {activity.type === "TALK" ? (
              <h4 className={styles.timelineSubtitle}>
                <Link
                  to={`/user/${activity.speaker ? activity.speaker.id : ""}`}
                >
                  {activity.speaker ? activity.speaker.name : "Unkown speaker"}
                </Link>
              </h4>
            ) : (
              undefined
            )}
            {activity.description ? <p>{activity.description}</p> : undefined}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  </div>
);

export default Content;
