import React, { useRef, forwardRef } from "react";
import { Query, Mutation } from "react-apollo";
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

const GET_LATEST_EVENT = gql`
  {
    latestEvent {
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

const Content = () => {
  const supportSecRef = useRef(null);
  return (
    <Layout reff={supportSecRef}>
      <EventFetcher>
        {event => (
          <>
            <div className={styles.cardContainer}>
              <div className={styles.bigEventCard}>
                <div className={styles.picture} />
                <div className={styles.hero} />
                <NavMenu />
                <EventInfo event={event} />
              </div>
            </div>
            <Timeline event={event} />
          </>
        )}
      </EventFetcher>
      <SupportUs ref={supportSecRef} />
    </Layout>
  );
};

const EventFetcher = ({ children }) => (
  <Query query={GET_LATEST_EVENT}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error}</p>;

      const event = data.latestEvent;
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
    }}
  </Query>
);

const NavMenu = () => (
  <div className={styles.row}>
    <div className={styles.tabActive}>Next Event</div>
    <Link to="events" className={styles.tab}>
      Past Events
    </Link>
    <Link to="/talks" className={styles.tab}>
      Talks
    </Link>
  </div>
);

const EventInfo = ({ event }) => {
  const dateStart = new Date(event.timeStart * 1000);
  const dateEnd = new Date(event.timeEnd * 1000);
  const mapsUrl = googleMapsUrlify(event.venue.address.replace(/\n/g, ""));
  return (
    <div className={styles.container}>
      <h1 className={styles.heroTitle}>{event.name}</h1>
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
  <div
    style={{
      boxSizing: "content-box",
      padding: "2rem 0"
    }}
  >
    <div className={styles.container}>
      <h2>Agenda</h2>
    </div>
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
            <Link to={`talk/${activity.id}`}>
              <h3 className={styles.timelineTitle}>{activity.title}</h3>
            </Link>
          ) : (
            <h3 className={styles.timelineTitle}>{activity.title}</h3>
          )}
          {activity.type === "TALK" ? (
            <Link to={`user/${activity.speaker ? activity.speaker.id : ""}`}>
              <h4 className={styles.timelineSubtitle}>
                {activity.speaker ? activity.speaker.name : "Unkown speaker"}
              </h4>
            </Link>
          ) : (
            undefined
          )}
          {activity.description ? <p>{activity.description}</p> : undefined}
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  </div>
);

const SupportUs = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{
      padding: "2rem 0",
      backgroundColor: "#da1b60",
      color: "rgba(255, 255, 255, 0.9)"
    }}
  >
    <div className={styles.container}>
      <h2>Support Us!</h2>
      <p>
        As of now, we are organizing these monthly-meetups solely on our own
        efforts, and we have neither any sources of funding nor our own venue.
        If you enjoy our meetups and you wish to make it better in any way, here
        are a few ways you can help us:
      </p>
      <div className={styles.flex}>
        <div className={styles.iconBullet}>
          <FontAwesomeIcon icon={["fas", "pizza-slice"]} />
        </div>
        <div>The meal is on you!</div>
      </div>
      <div className={styles.flex}>
        <div className={styles.iconBullet}>
          <FontAwesomeIcon icon={["fas", "building"]} />
        </div>
        <div>Host us!</div>
      </div>
      <div className={styles.flex}>
        <div className={styles.iconBullet}>
          <FontAwesomeIcon icon={["fas", "comments"]} />
        </div>
        <div>Tell your friends!</div>
      </div>
      <div className={styles.flex}>
        <div className={styles.iconBullet}>
          <FontAwesomeIcon icon={["fas", "child"]} />
        </div>
        <div>You tell us!</div>
      </div>
    </div>
  </div>
));

const Footer = () => (
  <div className={styles.footer}>
    <div className={styles.container}>
      <p>
        KLJS was founded by @ernsheong. It is currently being organized by
        @weijiangan and @tevanraj.
      </p>
      <p>
        KLJS expects all speakers and attendees to follow the JSConf code of
        conduct.
      </p>
    </div>
  </div>
);

const Layout = ({ reff, children }) => (
  <div>
    <div className={styles.topBar}>
      <div className={styles.logo}>KLJS</div>
      <div className={styles.flexCenter}>
        <button
          type="button"
          className={styles.topButton}
          onClick={() => reff.current.scrollIntoView({ behavior: "smooth" })}
        >
          Support us!
        </button>
      </div>
    </div>
    {children}
    <Footer />
  </div>
);

export default Content;
