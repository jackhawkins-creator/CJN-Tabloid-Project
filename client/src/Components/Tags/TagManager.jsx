import { useState, useEffect } from "react";
import { GetTags, deleteTag } from "../managers/tagManager";
import { Link } from "react-router-dom";

export const ViewAllTags = () => {

  const [tags, setTags] = useState([])

  useEffect(() => {
    GetTags().then(setTags)
  }, []);

  const handleTagDelete = (tag) => {
    deleteTag(tag).then(() => {
      GetTags().then(setTags)
    });
  }

  return (
    <>
    <h2>All Tags</h2>
      {tags.map((tag) => (
        <div key={tag?.id}>
          <h3>Tag Id: {tag.id}</h3>
          <div>Tag Name: {tag.name}</div>

          <Link to={`update/${tag.id}`}>
          <button>Update Tag</button>
          </Link>
        
          <button
          onClick={() => handleTagDelete(tag.id)}
          >Delete Tag</button>
        </div>
        
      ))}
      <Link to={`create`}>
          <button>New Tag</button>
          </Link>

    </>
  );
};
