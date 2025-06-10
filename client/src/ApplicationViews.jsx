import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./components/auth/AuthorizedRoute";
import { Home } from "./views/Home";
import { Login } from "./components/auth/Login";

export default function ApplicationViews({ loggedInUser, setLoggedInUser}){
    return (
        <Routes>
            <Route path="/">
                <Route
                index
                element={
                    <AuthorizedRoute loggedInUser={loggedInUser}>
                        <Home />
                    </AuthorizedRoute>
                } />
                <Route
                    path="login"
                    element={<Login setLoggedInUser={setLoggedInUser} />}
                />
            </Route>
        </Routes>
    )
}