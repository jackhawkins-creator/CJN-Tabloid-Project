const apiUrl = "/api/tag";

export const GetTags = () => {
    return fetch(apiUrl).then((res) => res.json());
};

export const deleteTag = (id) => {
  return fetch(`${apiUrl}/${id}`,
    {
      method: "DELETE"
    }
  )
}

export const GetTagById = (id) => {
  return fetch(`${apiUrl}/${id}`).then(res => res.json())
}

export const updateTag = (tag) => {
  return fetch(`${apiUrl}/${tag.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tag),
  });
};

export const CreateTag = (tag) => {
return fetch(apiUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(tag),
}).then((res) => res.json());
};