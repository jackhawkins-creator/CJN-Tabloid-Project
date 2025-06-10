const apiUrl = "/api/post";

export const getAllPosts = () => {
  return fetch(apiUrl).then((res) => res.json());
};

export const getPostById = (id) => {
  return fetch(`${apiUrl}/${id}`).then((res) => res.json());
};

export const deletePost = (id) => {
  return fetch(`${apiUrl}/${id}`, {
    method: "DELETE"
  });
};

export const createPost = (post) => {
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  }).then((res) => res.json);
};

export const getUserPosts = () => {
  return fetch(apiUrl + "/mine").then((res) => res.json());
};

export const updatePost = (post) => {
  return fetch(`${apiUrl}/${post.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
};
