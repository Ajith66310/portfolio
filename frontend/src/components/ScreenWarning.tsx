import { useEffect, useState } from "react";
import { FiMonitor, FiTablet, FiExternalLink, FiCopy, FiCheck } from "react-icons/fi";
import "./screenWarning.css";

const ScreenWarning = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [isInsta, setIsInsta] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    const inInstagram = /Instagram|FBAN|FBAV/.test(ua);
    setIsInsta(inInstagram);

    const isSmallScreen = window.innerWidth < 1000;
    
    if (!inInstagram && isSmallScreen) {
      (window as any).__INTRO_BLOCKED__ = true;
      setShowWarning(true);

      const timer = setTimeout(() => {
        setShowWarning(false);
        (window as any).__INTRO_BLOCKED__ = false;
        window.dispatchEvent(new Event("intro-unblocked"));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Attempt to force open in system browser (works on some Android/iOS versions)
  const handleOpenBrowser = () => {
    const url = window.location.href.replace(/^https?:\/\//, "");
    // Intent for Android or "googlechrome://" for iOS
    window.location.href = `intent://${url}#Intent;scheme=https;package=com.android.chrome;end`;
  };

  if (isInsta) {
    return (
      <div className="screen-warning">
        <div className="screen-warning-content instagram-overlay">
          <div className="icons">
            <FiMonitor size={48} />
            <FiTablet size={42} />
          </div>

          <h2>Experience it Better</h2>
          <p>
            You're viewing this through Instagram. For the full interactive experience, we recommend opening this in your device browser.
          </p>

          <div className="action-buttons">
            <button className="primary-btn" onClick={handleOpenBrowser}>
              <FiExternalLink /> Open in Browser
            </button>
            
            <button className="secondary-btn" onClick={handleCopyLink}>
              {copied ? <FiCheck color="#4BB543" /> : <FiCopy />} 
              {copied ? "Link Copied!" : "Copy Link"}
            </button>
          </div>

          <p className="instruction-text">
            Or tap the <strong>"..."</strong> menu at the top right and select <strong>"Open in Browser"</strong>.
          </p>
        </div>
      </div>
    );
  }

  if (!showWarning) return null;

  return (
    <div className="screen-warning">
      <div className="screen-warning-content">
        <div className="icons">
          <FiMonitor size={48} />
          <FiTablet size={42} />
        </div>
        <h2>Best Viewed on Larger Screens</h2>
        <p>
          This experience uses motion-driven interactions designed for larger screens. 
          I recommend viewing it on a desktop or tablet.
        </p>
        <span className="hint">Continuing automatically…</span>
      </div>
    </div>
  );
};

export default ScreenWarning;