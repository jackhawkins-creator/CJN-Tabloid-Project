import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../managers/postManager";

export default function CreatePost({ loggedInUser }) {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    subTitle: "",
    categoryId: "",
    headerImageUrl: "",
    body: "",
  });

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, headerImageUrl: url }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      ...form,
      categoryId: parseInt(form.categoryId),
      authorId: loggedInUser.id,
    };

    createPost(newPost).then(() => {
      navigate("/myposts");
    });
  };

  return (
    <div className="container">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Sub-Title:</label>
          <input name="subTitle" value={form.subTitle} onChange={handleChange} />
        </div>
        <div>
          <label>Category:</label>
          <select name="categoryId" value={form.categoryId} onChange={handleChange} required>
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Header Image:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {form.headerImageUrl && (
            <div>
              <img src={form.headerImageUrl} alt="Preview" style={{ width: "300px", marginTop: "10px" }} />
            </div>
          )}
        </div>
        <div>
          <label>Body:</label>
          <textarea name="body" value={form.body} onChange={handleChange} required rows={8} />
        </div>
        <button type="submit">Save Post</button>
      </form>
    </div>
  );
}
