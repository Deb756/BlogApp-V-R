import React from "react";
import Navbar from "./Navbar";

export default function BlogLandingPage() {
  return (
    <>
      <Navbar />
      <div className="bg-light min-vh-100">
        {/* Hero Section */}
        <header className="bg-dark text-light py-5">
          <div className="container text-center">
            <h1 className="display-4">Welcome to BlogSpace</h1>
            <p className="lead">
              Discover amazing stories, insights, and ideas from creators all
              around the world.
            </p>
            <a href="/explore" className="btn btn-primary btn-lg mt-3">
              Explore Blogs
            </a>
            <a href="/signup" className="btn btn-outline-light btn-lg mt-3 ms-3">
              Join Now
            </a>
          </div>
        </header>

        {/* Featured Blogs Section */}
        <main className="container my-5" id="featured">
          <h2 className="text-center mb-4">Featured Blogs</h2>
          <div className="row">
            {/* Blog 1 */}
            <div className="col-md-4">
              <div className="card shadow-sm">
                {/* <img
                src="https://via.placeholder.com/350x200"
                className="card-img-top"
                alt="Blog 1"
              /> */}
                <div className="card-body">
                  <h5 className="card-title">The Art of Storytelling</h5>
                  <p className="card-text">
                    Learn how to craft compelling stories that captivate readers.
                  </p>
                  <a href="/explore" className="btn btn-sm btn-primary">
                    Read More
                  </a>
                </div>
              </div>
            </div>

            {/* Blog 2 */}
            <div className="col-md-4">
              <div className="card shadow-sm">
                {/* <img
                src="https://via.placeholder.com/350x200"
                className="card-img-top"
                alt="Blog 2"
              /> */}
                <div className="card-body">
                  <h5 className="card-title">10 Tips for Productivity</h5>
                  <p className="card-text">
                    Maximize your daily output with these tried-and-true tips.
                  </p>
                  <a href="/explore" className="btn btn-sm btn-primary">
                    Read More
                  </a>
                </div>
              </div>
            </div>

            {/* Blog 3 */}
            <div className="col-md-4">
              <div className="card shadow-sm">
                {/* <img
                src="https://via.placeholder.com/350x200"
                className="card-img-top"
                alt="Blog 3"
              /> */}
                <div className="card-body">
                  <h5 className="card-title">Exploring Minimalism</h5>
                  <p className="card-text">
                    Discover how minimalism can lead to a more fulfilling life.
                  </p>
                  <a href="/explore" className="btn btn-sm btn-primary">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Call-to-Action Section */}
        <section className="bg-primary text-light py-5" id="cta">
          <div className="container text-center">
            <h2 className="mb-4">Start Your Blogging Journey Today</h2>
            <p className="lead">
              Join our vibrant community of writers and readers. Share your
              stories and connect with like-minded individuals.
            </p>
            <a href="/signup" className="btn btn-light btn-lg">
              Get Started
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
