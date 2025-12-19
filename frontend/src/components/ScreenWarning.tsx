import { useEffect, useState } from "react";
import { FiMonitor, FiTablet } from "react-icons/fi";
import "./screenWarning.css";

const ScreenWarning = () => {
  const [show, setShow] = useState(false);
  const [isInsta, setIsInsta] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const inInstagram = /Instagram|FBAN/.test(ua);
    setIsInsta(inInstagram);

    const isSmallScreen = window.innerWidth < 1000 || inInstagram;
    if (!isSmallScreen) return;

    //  BLOCK INTRO ANIMATIONS
    (window as any).__INTRO_BLOCKED__ = true;

    setShow(true);

    const timer = setTimeout(() => {
      setShow(false);

      //  UNBLOCK + NOTIFY
      (window as any).__INTRO_BLOCKED__ = false;
      window.dispatchEvent(new Event("intro-unblocked"));
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const openInBrowser = () => {
    window.open(window.location.href, "_blank");
  };

  if (!show) return null;

  return (
    <div className="screen-warning">
      <div className="screen-warning-content">
        <div className="icons">
          <FiMonitor size={48} />
          <FiTablet size={42} />
        </div>

        <h2>Best Viewed on Larger Screens</h2>

        {isInsta && (
          <p>
            You are opening this site inside Instagram. Animations may not work correctly. 
            Please open this link in your default browser for the best experience.
          </p>
        )}

        {!isInsta && (
          <p>
            This experience uses motion-driven interactions designed for larger
            screens. For the most immersive and visually accurate experience,
            I recommend viewing it on a desktop or tablet.
          </p>
        )}

        {isInsta && (
          <button className="btn-open-browser" onClick={openInBrowser}>
            Open in Browser
          </button>
        )}

        <span className="hint">
          Continuing automatically…
        </span>
      </div>
    </div>
  );
};

export default ScreenWarning;
