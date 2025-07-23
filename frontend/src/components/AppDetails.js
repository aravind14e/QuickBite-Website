import React from 'react';
import './AppDetails.css';

export default function AppDetails() {
  return (
    <div className="app-details">
      <h2>Get the QuickBite App</h2>
      <p>
        Order food on the go, track your orders, and enjoy exclusive app-only offers!<br />
        Download the QuickBite app for Android and iOS.
      </p>
      <div className="app-badges">
        <a href="#" className="app-badge">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Get it on Google Play"
          />
        </a>
        <a href="#" className="app-badge">
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="Download on the App Store"
          />
        </a>
      </div>
      <img
        src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
        alt="Mobile app preview"
        className="app-preview"
      />
    </div>
  );
}
