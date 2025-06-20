import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./components/auth/AuthorizedRoute";
import { Home } from "./views/Home";
import { Login } from "./components/auth/Login";
import { ViewAllTags } from "./Components/Tags/TagManager";
import { NewTagForm } from "./Components/Tags/AddNewTagForm";
import { EditTagForm } from "./Components/Tags/UpdateTagForm";
import MyPosts from "./Components/Posts/MyPosts";
import CreatePost from "./Components/Posts/CreatePost";
import { PostExplorer } from "./Components/Explorer/PostExplorer";
import { ViewAllCategories } from "./components/Categories/CategoryManager";
import { NewCategoryForm } from "./components/Categories/AddNewCategoryForm";
import { EditCategoryForm } from "./components/Categories/UpdateCategoryForm";
import PostDetails from "./Components/Posts/PostDetails";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home />
            </AuthorizedRoute>
          }
        />
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route path="tags" element={<ViewAllTags />} />
        <Route path="tags/create" element={<NewTagForm />} />
        <Route path="tags/update/:id" element={<EditTagForm />} />
        <Route path="postexplorer" element={<PostExplorer />} />
        <Route path="categorymanager" element={<ViewAllCategories />} />
        <Route path="categorymanager/create" element={<NewCategoryForm />} />
        <Route
          path="categorymanager/update/:id"
          element={<EditCategoryForm />}
        />

        <Route
          path="create-post"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <CreatePost loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
        <Route
          path="myposts"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <MyPosts />
            </AuthorizedRoute>
          }
        />
        <Route
          path="posts/:id"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <PostDetails />
            </AuthorizedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
