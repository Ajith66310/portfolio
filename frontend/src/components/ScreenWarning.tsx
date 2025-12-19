import { useEffect, useState } from "react";
import { FiMonitor, FiTablet } from "react-icons/fi";
import "./screenWarning.css";

const ScreenWarning = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [isInsta, setIsInsta] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || "";
    const inInstagram = /Instagram|FBAN/.test(ua);
    setIsInsta(inInstagram);

    // Show small-screen warning only if NOT Instagram
    const isSmallScreen = window.innerWidth < 1000;
    if (!inInstagram && isSmallScreen) {
      // BLOCK INTRO ANIMATIONS
      (window as any).__INTRO_BLOCKED__ = true;
      setShowWarning(true);

      const timer = setTimeout(() => {
        setShowWarning(false);
        (window as any).__INTRO_BLOCKED__ = false;
        window.dispatchEvent(new Event("intro-unblocked"));
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (isInsta) {
    // Show only redirect button for Instagram in-app browser
    return (
      <div className="screen-warning">
        <div className="screen-warning-content">
          <div className="icons">
            <FiMonitor size={48} />
            <FiTablet size={42} />
          </div>

          <h2>Open in Your Browser</h2>
          <p>
            You are currently using Instagram's in-app browser. For the best experience with animations and interactions, please open this link in your default browser.
          </p>

          <a
            href={window.location.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-open-browser"
          >
            Open in Browser
          </a>
        </div>
      </div>
    );
  }

  if (!showWarning) return null;

  // Show normal small-screen warning for mobile browsers
  return (
    <div className="screen-warning">
      <div className="screen-warning-content">
        <div className="icons">
          <FiMonitor size={48} />
          <FiTablet size={42} />
        </div>

        <h2>Best Viewed on Larger Screens</h2>
        <p>
          This experience uses motion-driven interactions designed for larger
          screens. For the most immersive and visually accurate experience,
          I recommend viewing it on a desktop or tablet.
        </p>

        <span className="hint">
          Continuing automatically…
        </span>
      </div>
    </div>
  );
};

export default ScreenWarning;
