import { useState } from "react";
import { NavLink, NavLink as RRNavLink } from "react-router-dom";
import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import { logout } from "./components/managers/authmanager";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
  const [open, setOpen] = useState(false);

  const toggleNavbar = () => setOpen(!open);

  return (
    <div>
      <Navbar light fixed="true" expand="lg">
        <NavbarBrand className="navbar-brand" tag={RRNavLink} to="/">
          Tabloid
        </NavbarBrand>
        {loggedInUser ? (
          <>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={open} navbar>
              <Nav navbar>
                <NavItem onClick={() => setOpen(false)} />
                <NavLink tag={RRNavLink} to="/tags">
                  <button>Tag Manager</button>
                </NavLink>
                <NavLink tag={RRNavLink} to="/postexplorer">
                  <button>Post Explorer</button>
                </NavLink>
                <NavLink tag={RRNavLink} to="/create-post">
                  <button>Create Post</button>
                </NavLink>
                <NavLink tag={RRNavLink} to="/myposts">
                  <button>My Posts</button>
                </NavLink>
                <NavLink tag={RRNavLink} to="/create-post">
                  <button>Create Post</button>
                </NavLink>
                 <NavLink tag={RRNavLink} to="/categorymanager">
                  <button>Category Manager</button>
                </NavLink>
              </Nav>
            </Collapse>
            <Button
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                logout().then(() => {
                  setLoggedInUser(null);
                  setOpen(false);
                });
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Nav navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/login">
                <Button color="primary">Login</Button>
              </NavLink>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    </div>
  );
}
