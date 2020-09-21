import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

const Property = props => (
    <tr>
        <td>{props.property.property_description}</td>
        <td>{props.property.property_responsible}</td>
        <td>{props.property.property_priority}</td>
        <td>
            <Link 
            to={"/edit/"+props.property._id} 
            className="btn btn-small waves-effect waves-teal hoverable orange accent-3"
            >Edit</Link>
        </td>
    </tr>
)

class BookList extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };
    constructor(props) {
        super(props);
        this.state = {properties: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/book')
            .then(response => {
                this.setState({ properties: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    propertyList() {
        return this.state.properties.map(function(currentProperty, i){
            return <Property property={currentProperty} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Properties List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.propertyList() }
                    </tbody>
                </table>
                <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-orange hoverable purple accent-3"
            >
              Logout
            </button>
            </div>
            
        )
    }
}
BookList.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(BookList);