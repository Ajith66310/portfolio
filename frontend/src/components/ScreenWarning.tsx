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

  // Instagram users: show clear instruction instead of trying to redirect
  if (isInsta) {
    return (
      <div className="screen-warning">
        <div className="screen-warning-content">
          <div className="icons">
            <FiMonitor size={48} />
            <FiTablet size={42} />
          </div>

          <h2>Open in Your Browser</h2>
          <p>
            You are currently using Instagram's in-app browser. Instagram blocks automatic redirects, so to experience this website fully, please:
          </p>
          <ol>
            <li>Tap the "⋯" menu at the top-right corner of Instagram.</li>
            <li>Select <strong>"Open in Browser"</strong>.</li>
          </ol>

          <p className="note">
            This ensures all animations and interactions work as intended.
          </p>
        </div>
      </div>
    );
  }

  if (!showWarning) return null;

  // Normal small-screen warning for mobile browsers
  return (
    <div className="screen-warning">
      <div className="screen-warning-content">
        <div className="icons">
          <FiMonitor size={48} />
          <FiTablet size={42} />
        </div>

        <h2>Best Viewed on Larger Screens</h2>
        <p>
          This experience uses motion-driven interactions designed for larger screens. For the most immersive and visually accurate experience, I recommend viewing it on a desktop or tablet.
        </p>

        <span className="hint">Continuing automatically…</span>
      </div>
    </div>
  );
};

export default ScreenWarning;
