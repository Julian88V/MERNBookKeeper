import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Property = props => (
    <tr>
        <td>{props.property.property_description}</td>
        <td>{props.property.property_responsible}</td>
        <td>{props.property.property_priority}</td>
        <td>
            <Link to={"/edit/"+props.property._id}>Edit</Link>
        </td>
    </tr>
)

export default class BookList extends Component {
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
            </div>
        )
    }
}