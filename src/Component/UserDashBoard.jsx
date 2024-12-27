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
      <div className="container d-flex justify-content-center align-items-center">
        <h2 className="container my-3">User Posts</h2>
        <button style={{ width: "140px" }}
          type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal"
        >
          Add Post
        </button>
      </div>

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
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog ">
          <div class="modal-content bg-dark text-light">
            {/* <!-- Modal Header --> */}
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Create a New Post</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            {/* <!-- Modal Body --> */}
            <div class="modal-body bg-dark">
              <form id="createPostForm">
                {/* <!-- Post Title --> */}
                <div class="mb-3">
                  <label for="postTitle" class="form-label">Post Title</label>
                  <input
                    type="text"
                    class="form-control"
                    id="postTitle"
                    placeholder="Enter post title"
                    required
                  />
                </div>

                {/* <!-- Post Content --> */}
                <div class="mb-3">
                  <label for="postContent" class="form-label">Post Content</label>
                  <textarea
                    class="form-control"
                    id="postContent"
                    rows="5"
                    placeholder="Write your post content here"
                    required
                  ></textarea>
                </div>
              </form>
            </div>

            {/* <!-- Modal Footer --> */}
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary" form="createPostForm">
                Submit Post
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
