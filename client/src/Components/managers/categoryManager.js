const apiUrl = "/api/category";

export const GetCategorys = () => {
    return fetch(apiUrl).then((res) => res.json());
};

export const deleteCategory = (id) => {
  return fetch(`${apiUrl}/${id}`,
    {
      method: "DELETE"
    }
  )
}

export const GetCategoryById = (id) => {
  return fetch(`${apiUrl}/${id}`).then(res => res.json())
}

export const updateCategory = (category) => {
  return fetch(`${apiUrl}/${category.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
};

export const CreateCategory = (category) => {
return fetch(apiUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(category),
}).then((res) => res.json());
};