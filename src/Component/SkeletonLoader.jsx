import React from "react";
import "./Skeleton.css"; // Ensure you have CSS styles for skeleton animations

const SkeletonLoader = () => {
  return (
    <>
      <div className="skeleton-navbar"></div>
      <div className="container d-flex flex-column align-items-center">
        <div className="skeleton-heading"></div>
        <div className="skeleton-button"></div>
      </div>

      <div className="container my-4">
        <div className="row">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div className="col-md-4 mb-4" key={item}>
              <div className="skeleton-card">
                <div className="skeleton-title"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text small"></div>
                <div className="skeleton-actions">
                  <div className="skeleton-button small"></div>
                  <div className="skeleton-button small"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SkeletonLoader;
