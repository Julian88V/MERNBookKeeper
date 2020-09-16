import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CreateProperty from "./components/create-property.component";
import EditProperty from "./components/edit-property.component";
import BookList from "./components/book-list.component";

function App() {
  return (
    <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            
            <Link to="/" className="navbar-brand">MERN-Stack Book App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Properties</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Property</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={BookList} />
          <Route path="/edit/:id" component={EditProperty} />
          <Route path="/create" component={CreateProperty} />
        </div>
      </Router>
  );
}

export default App;
