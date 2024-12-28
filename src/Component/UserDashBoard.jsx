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
  // ------------------------

  // Function to handle delete post
  const handleDelete = async (id) => {
    const postDltApiKey = import.meta.env.VITE_POST_DLT_API_KEY;
    // console.log(postDltApiKey);

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
  // -------------------------------

  // Post Add To the User profile Feature 
  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect form data
    const postData = {
      caption: document.getElementById("postTitle").value,
      message: document.getElementById("postContent").value,
    };

    // Call the handleAddPost function
    handleAddPost(postData);
    document.getElementById("createPostForm").reset();
  };

  // Function to handle Add Post
  const handleAddPost = async (postData) => {
    const postAddApiKey = import.meta.env.VITE_POST_ADD_API_KEY;
    // console.log("API Endpoint:", postAddApiKey);
    // console.log(userData.id);


    try {
      // Ensure `userData.id` is valid before constructing the API endpoint
      if (!userData || !userData.id) {
        throw new Error("User ID is missing.");
      }

      const response = await fetch(`${postAddApiKey}${userData.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        alert("Post added successfully!");
        // Optionally refetch posts to update the UI
        fetchUserData();
        document.getElementById("createPostForm2").reset();

        // Close the modal programmatically
        const modalElement = bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
        modalElement.hide();
      } else {
        const errorData = await response.json();
        alert(`Failed to add the post: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error adding the post:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // -------------------------------------

  // Post editing feature
  const openEditModal = async (id) => {
    const postFindApiKey = import.meta.env.VITE_FIND_POST_API_KEY; // Correct your API key here
    try {
      // Fetch the post data
      const response = await fetch(`${postFindApiKey}${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response is OK (status 200-299)
      if (!response.ok) {
        throw new Error(`Failed to fetch post data: ${response.status} ${response.statusText}`);
      }

      // Parse the response as JSON
      const postData = await response.json();

      // Log the actual data (for debugging purposes)
      // console.log("Post data fetched successfully:", postData);

      // Populate the form fields with the fetched data
      document.getElementById("postId").value = postData.data.id || "";
      document.getElementById("postTitleEdit").value = postData.data.caption || "";
      document.getElementById("postContentEdit").value = postData.data.message || "";
      // console.log(rr);
      // console.log(userData.id);

    } catch (error) {
      console.error("Error fetching post data:", error);
      alert("Unable to fetch post data. Please try again.");
    }
  };

  // Handle form submission for editing the post
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    // getting post id hidden form feild
    const postIds = document.getElementById("postId").value;
    // console.log(postIds);

    // Collect form data
    const updatedPostData = {
      caption: document.getElementById("postTitleEdit").value,
      message: document.getElementById("postContentEdit").value,
    };

    const postUpdateApiKey = import.meta.env.VITE_POST_UPDATE_API_KEY;

    try {
      // Send updated data to the server
      const response = await fetch(`${postUpdateApiKey}${postIds}?userId=${userData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPostData),
      });

      if (!response.ok) throw new Error("Failed to update the post");

      alert("Post updated successfully!");
      fetchUserData();
      document.getElementById("createPostForm2").reset();

      // Close the modal programmatically
      const modalElement = bootstrap.Modal.getInstance(document.getElementById("exampleModal2"));
      modalElement.hide();

      // Optionally, refresh the post list or perform other UI updates
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Unable to update post. Please try again.");
    }
  };

  // -------------------------------------


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
  
  // -------------------------

  return (
    <>
      <Navbar2 user={userData} />
      <div className="container d-flex justify-content-center align-items-center">
        <h2 className="container my-3">User Posts</h2>
        <button style={{ width: "140px" }}
          type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal"
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
                  <div className="mt-auto d-flex gap-2 justify-content-end">
                    <button
                      className="btn btn-sm btn-primary"
                      data-bs-toggle="modal" data-bs-target="#exampleModal2"
                      onClick={() => openEditModal(post.id)}
                    >
                      Edit
                    </button>
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
      {/* Modal for Add new post */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog ">
          <div className="modal-content bg-dark text-light">
            {/* Modal Header */}
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Create New Posts</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body bg-dark">
              <form id="createPostForm">
                {/* Post Title */}
                <div className="mb-3">
                  <label htmlFor="postTitle" className="form-label">Post Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="postTitle"
                    placeholder="Enter post title"
                    required
                  />
                </div>

                {/* Post Content */}
                <div className="mb-3">
                  <label htmlFor="postContent" className="form-label">Post Content</label>
                  <textarea
                    className="form-control"
                    id="postContent"
                    rows="5"
                    placeholder="Write your post content here"
                    required
                  ></textarea>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => document.getElementById("createPostForm").reset()}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                Submit Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Update Existing Post */}
      <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog ">
          <div className="modal-content bg-dark text-light">
            {/* Modal Header */}
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Posts</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body bg-dark">
              <form id="createPostForm2">
                {/* Post Title */}
                <input type="hidden" id="postId" required />
                <div className="mb-3">
                  <label htmlFor="postTitleEdit" className="form-label">Post Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="postTitleEdit"
                    placeholder="Enter post title"
                    required
                  />
                </div>

                {/* Post Content */}
                <div className="mb-3">
                  <label htmlFor="postContentEdit" className="form-label">Post Content</label>
                  <textarea
                    className="form-control"
                    id="postContentEdit"
                    rows="5"
                    placeholder="Write your post content here"
                    required
                  ></textarea>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => document.getElementById("createPostForm2").reset()}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={(e) => handleSubmitEdit(e)}>
                Submit Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
