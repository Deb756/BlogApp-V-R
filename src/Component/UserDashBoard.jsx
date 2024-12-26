import React, { useEffect, useState } from "react";
import Navbar2 from "./Navbar2";
import { useSearchParams } from "react-router-dom";
import Signup from "./Signup";

export default function UserDashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const email = searchParams.get("email");
      const apiUrl = import.meta.env.VITE_LOGIN_API_KEY;

      if (!email) {
        throw new Error("No email parameter found in the URL.");
      }

      const response = await fetch(`${apiUrl}${email}`);
      const result = await response.json();

      if (response.ok) {
        setUserData(result.data); // Update user data
      } else {
        console.error("Failed to fetch user data:", result);
        setUserData(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle delete
  const handleDelete = async (id) => {
    const postDltApiKey = import.meta.env.VITE_POST_DLT_API_KEY;
    console.log(postDltApiKey);

    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (confirmed) {
      try {
        const response = await fetch(`${postDltApiKey}${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Post deleted successfully!");
          // Refetch posts to update the UI
          fetchUserData();
        } else {
          alert("Failed to delete the post.");
        }
      } catch (error) {
        console.error("Error deleting the post:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, [searchParams]);

  if (loading) {
    return <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <img src="src\assets\Loading.gif" alt="Loading" /><br />
      <h2>Loading....</h2>
    </div>
      ;
  }

  if (!userData) {
    return <Signup />;
  }

  return (
    <>
      <Navbar2 user={userData} />
      <h2 className="container my-3">User Posts</h2>
      <div className="container my-4">
        <div className="row">
          {userData.posts.map((post) => (
            <div className="col-md-4 mb-4" key={post.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{post.caption}</h5>
                  <p className="card-text mark">{post.message}</p>
                  <p className="text-muted small mb-3">
                    Posted on: {new Date(post.time).toLocaleString()}
                  </p>
                  <div className="mt-auto d-flex justify-content-end">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
