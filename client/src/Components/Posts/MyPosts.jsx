import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserPosts } from "../managers/postManager";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserPosts().then(setPosts);
  }, []);

  return (
    <div className="container mt-4">
      <h1><strong>My Posts</strong></h1>
      <div className="my-posts-list">
        {posts.map(post => (
          <div
            key={post.id}
            className="card my-post-card mb-3 p-2"
            style={{ display: "flex", cursor: "pointer" }}
            onClick={() => navigate(`/posts/${post.id}`)} // Placeholder for PostDetails
          >
            <img
              src={post.headerImageUrl}
              alt="Header"
              style={{ width: "150px", height: "100px", objectFit: "cover", marginRight: "15px" }}
            />
            <div style={{ flex: 1 }}>
              <h5>{post.title}</h5>
              <h6 className="text-muted">{post.subTitle}</h6>
              <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                Published on: {new Date(post.publishingDate).toLocaleDateString()} <br />
                Read Time: {post.readTime} min
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
