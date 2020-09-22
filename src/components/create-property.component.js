import React, { Component } from 'react';
import axios from 'axios';

export default class CreateProperty extends Component {
    constructor(props) {
        super(props);

        this.onChangePropertyAddress = this.onChangePropertyAddress.bind(this);
        this.onChangePropertyDescription = this.onChangePropertyDescription.bind(this);
        this.onChangePropertyTenant = this.onChangePropertyTenant.bind(this);
        this.onChangePropertyResponsible = this.onChangePropertyResponsible.bind(this);
        this.onChangePropertyPriority = this.onChangePropertyPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            property_address: '',
            property_description: '',
            property_tenant: '',
            property_responsible: '',
            property_priority: '',
            property_completed: false
        }
    }

    onChangePropertyAddress(e) {
        this.setState({
            property_address: e.target.value
        });
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

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Property Address: ${this.state.property_address}`);
        console.log(`Property Description: ${this.state.property_description}`);
        console.log(`Property Tenant: ${this.state.property_tenant}`);
        console.log(`Property Responsible: ${this.state.property_responsible}`);
        console.log(`Property Priority: ${this.state.property_priority}`);
        
        const newProperty = {
            property_address: this.state.property_address,
            property_description: this.state.property_description,
            property_tenant: this.state.property_tenant,
            property_responsible: this.state.property_responsible,
            property_priority: this.state.property_priority,
            property_completed: this.state.property_completed
        };

        axios.post('http://localhost:4000/book/add', newProperty)
            .then(res => console.log(res.data));

        this.setState({
            property_address: '',
            property_description: '',
            property_tenant: '',
            property_responsible: '',
            property_priority: '',
            property_completed: false
        })

        this.props.history.push('/properties');
        window.location.reload(false);
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Property</h3>
                <form onSubmit={this.onSubmit}>
                <div className="input-field"> 
                        <label class="active">Address: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.property_address}
                                onChange={this.onChangePropertyAddress}
                                />
                    </div>
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
                        <input  type="text"
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
                            <input  className="with-gap" 
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
                            <span >Medium</span>
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

                    <div className="form-group">
                        <input type="submit" value="Create Property" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }

}