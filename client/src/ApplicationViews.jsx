import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./components/auth/AuthorizedRoute";
import { Home } from "./views/Home";
import { Login } from "./components/auth/Login";
import { ViewAllTags } from "./Components/Tags/TagManager";
import { NewTagForm } from "./Components/Tags/AddNewTagForm";
import { EditTagForm } from "./Components/Tags/UpdateTagForm";
import MyPosts from "./Components/Posts/MyPosts";

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
        <Route
          path="myposts"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <MyPosts />
            </AuthorizedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
