import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../managers/postManager";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPostById(id).then(setPost);
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  if (!post) return <div>Loading post...</div>;

  return (
    <div className="post-details">
      {post.headerImageUrl && (
        <img
          src={post.headerImageUrl}
          alt={post.title}
          className="post-details-image"
        />
      )}
      <h1 className="post-title">{post.title}</h1>
      <p className="post-meta">
        <strong>Category:</strong> {post.category?.name} |{" "}
        <strong>Author:</strong> {post.author?.fullName} |{" "}
        <strong>Date:</strong> {formatDate(post.publishingDate)}
      </p>
      <div className="post-body">
        <p>{post.body}</p>
      </div>
    </div>
  );
}
