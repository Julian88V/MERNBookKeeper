import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import "bootstrap/dist/css/bootstrap.min.css";


import { Provider } from "react-redux";
import store from "./store";

import CreateProperty from "./components/create-property.component";
import EditProperty from "./components/edit-property.component";
import BookList from "./components/book-list.component";
import Landing from "./components/layout/landing";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard.component";


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
    <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            
            <h6 className="navbar-brand">MERN-Stack Book Keeper App</h6>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/properties" className="nav-link">Properties</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Property</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/properties" exact component={BookList} />
          <PrivateRoute path="/edit/:id" component={EditProperty} />
          <PrivateRoute path="/create" component={CreateProperty} />
            </Switch>
        </div>
      </Router>
      </Provider>
  );
}

export default App;
