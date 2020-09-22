import React, { Component } from 'react';
import axios from 'axios';

export default class EditProperty extends Component {

    constructor(props) {
        super(props);

        this.onChangePropertyDescription = this.onChangePropertyDescription.bind(this);
        this.onChangePropertyTenant = this.onChangePropertyTenant.bind(this);
        this.onChangePropertyResponsible = this.onChangePropertyResponsible.bind(this);
        this.onChangePropertyPriority = this.onChangePropertyPriority.bind(this);
        this.onChangePropertyCompleted = this.onChangePropertyCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            property_description: '',
            property_tenant: '',
            property_responsible: '',
            property_priority: '',
            property_completed: false
        }

        this.handleAlternate = this.handleAlternate.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:4000/book/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    property_description: response.data.property_description,
                    property_tenant: response.data.property_tenant,
                    property_responsible: response.data.property_responsible,
                    property_priority: response.data.property_priority,
                    property_completed: response.data.property_completed
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangePropertyDescription(e) {
        this.setState({
            property_description: e.target.value
        });
    }

    onChangePropertyTenant(e) {
        this.setState({
            property_tenant: e.target.value
        });
    }

    onChangePropertyResponsible(e) {
        this.setState({
            property_responsible: e.target.value
        });
    }

    onChangePropertyPriority(e) {
        this.setState({
            property_priority: e.target.value
        });
    }

    onChangePropertyCompleted(e) {
        this.setState({
            property_completed: !this.state.property_completed
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            property_description: this.state.property_description,
            property_responsible: this.state.property_responsible,
            property_priority: this.state.property_priority,
            property_completed: this.state.property_completed
        };
        console.log(obj);
        axios.post('http://localhost:4000/book/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/properties');
        window.location.reload(false);
    }

    // deleteProperty(){
    //     axios.delete('http://localhost:4000/book/delete/'+this.props.match.params.id)
    //     .then((res) => {
    //         console.log('Property successfully deleted!')
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // }

    handleAlternate(e) {
        e.preventDefault();
        
        axios.delete('http://localhost:4000/book/delete/'+this.props.match.params.id)
            .then(res => console.log(res.data));
        
        this.props.history.push('/properties');
        window.location.reload(false);
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Property</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="input-field"> 
                        <label class="active">Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.property_description}
                                onChange={this.onChangePropertyDescription}
                                />
                    </div>
                    <div className="input-field">
                        <label class="active">Tenant: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.property_tenant}
                                onChange={this.onChangePropertyTenant}
                                />
                    </div>
                    <div className="input-field">
                        <label class="active">Responsible: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.property_responsible}
                                onChange={this.onChangePropertyResponsible}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                        <label>
                            <input  class="with-gap" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={this.state.property_priority==='Low'} 
                                    onChange={this.onChangePropertyPriority}
                                    />
                                <span>Low</span>
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                        <label>
                            <input  className="with-gap" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={this.state.property_priority==='Medium'} 
                                    onChange={this.onChangePropertyPriority}
                                    />
                                <span>Medium</span>
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                        <label>
                            <input  className="with-gap" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={this.state.property_priority==='High'} 
                                    onChange={this.onChangePropertyPriority}
                                    />
                                <span>High</span>
                            </label>
                        </div>
                    </div>
                    <div className="form-check">
                    <label className="form-check-label" htmlFor="completedCheckbox">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangePropertyCompleted}
                                checked={this.state.property_completed}
                                value={this.state.property_completed}
                                />
                        
                           <span>Completed</span>
                        </label>                        
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Property" className="btn btn-primary" />
                        <button onClick={this.handleAlternate.bind(this)} className="btn btn-danger">Delete Property</button>
                    </div>
                </form>
            </div>
        )
    }
}