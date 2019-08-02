import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./style.css";

const Layout = ({ children }) => (
  <>
    <TopBar />
    <div className={styles.appContent}>{children}</div>
    <Footer />
  </>
);

const navItems = [
  { title: "Events", url: "/events" },
  { title: "Talks", url: "/talks" }
];

const TopBar = ({ children }) => {
  const [size, setSize] = useState(16);

  const aaa = () => {
    if (window.scrollY < 101) {
      const a = 16 - window.scrollY * 0.04;
      setSize(a);
    }
  };

  useEffect(() => {
    window.addEventListener("optimizedScroll", aaa, false);

    return () => {
      window.removeEventListener("optimizedScroll", aaa, false);
    };
  }, [children]);

  return (
    <div className={styles.topBar} style={{ fontSize: size }}>
      <div className={styles.flexCenter}>
        <Link to="/">
          <div className={styles.logo}>KLJS</div>
        </Link>
        <ul className={styles.nav}>
          {navItems.map(item => (
            <li>
              <Link to={item.url}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.flexCenter}>
        <button type="button" className={styles.topButton}>
          Support us!
        </button>
      </div>
    </div>
  );
};

const TwitterLink = ({ children }) => {
  return <a href={`https://twitter.com/${children}`}>@{children}</a>;
};

const Footer = () => (
  <div className={styles.footer}>
    <div className={styles.container}>
      <p>
        KualaLumpurJS was founded by <TwitterLink>ernsheong</TwitterLink>. It is
        currently being organized by <TwitterLink>weijiangan</TwitterLink> and{" "}
        <TwitterLink>tevanraj</TwitterLink>.
      </p>
      <p>
        KualaLumpurJS expects all speakers and attendees to follow the JSConf
        code of conduct.
      </p>
    </div>
  </div>
);

export default Layout;
