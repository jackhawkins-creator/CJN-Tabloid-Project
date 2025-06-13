import { useState, useEffect } from "react";
import { GetCategorys, deleteCategory } from "../managers/categoryManager";
import { Link } from "react-router-dom";

export const ViewAllCategories = () => {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    GetCategorys().then(setCategories)
  }, []);

  const handleCategoryDelete = (category) => {
    deleteCategory(category).then(() => {
      GetCategorys().then(setCategories)
    });
  }

  return (
    <>
    <h2>All Categories</h2>
      {categories.map((category) => (
        <div key={category?.id}>
          <h3>Category Id: {category.id}</h3>
          <div>Category Name: {category.name}</div>

          <Link to={`update/${category.id}`}>
          <button>Update Category</button>
          </Link>
        
          <button
          onClick={() => handleCategoryDelete(category.id)}
          >Delete Category</button>
        </div>
        
      ))}
      <Link to={`create`}>
          <button>New Category</button>
          </Link>

    </>
  );
};
