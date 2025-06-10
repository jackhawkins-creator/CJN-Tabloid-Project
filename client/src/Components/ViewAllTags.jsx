import { useState, useEffect } from "react";
import { GetTags } from "../Managers/tagManager";

export const ViewTags = () => {

  const [tags, setTags] = useState([])

  useEffect(() => {
    GetTags().then(setTags)
  }, []);

  return (
    <>
      {tags.map((tag) => (
        <div key={tag?.id}>
          <h3>Tag Id: {tag.id}</h3>
          <div>Tag Name:{tag.name}</div>
         
        </div>
      ))}

    </>
  );
};
