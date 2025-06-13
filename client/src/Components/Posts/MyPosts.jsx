import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserPosts } from "../managers/postManager";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUserPosts().then(setPosts);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  return (
    <div className="my-posts">
      <h1>My Posts</h1>
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <Link to={`/posts/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>{post.body}</p>
          <p><strong>Published:</strong> {formatDate(post.publishingDate)}</p>
        </div>
      ))}
    </div>
  );
}
