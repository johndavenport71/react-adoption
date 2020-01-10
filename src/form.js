import React, { Component } from 'react';
import Options from './options';
import * as breeds from './breeds.json';

class Form extends Component {
    constructor (props) {
        super(props);

        this.state = {
            zipcode: '',
            animaltype: '',
            breed: '',
            gender: '',
            distance: 100
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        var fieldName = event.target.name;
        this.setState({[fieldName]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let url = 'https://api.petfinder.com/v2/animals?';
        if(this.state.animaltype) {
            url += 'type=';
            url += this.state.animaltype;
            url += '&';
        } 
        if(this.state.zipcode) {
            url += 'location=' + this.state.zipcode + '&';
            url += 'distance=' + this.state.distance + '&';
        }
        if(this.state.breed) {
            url += 'breed=' + this.state.breed + '&';
        }
        if(this.state.gender) {
            url += 'gender=' + this.state.gender + '&';
        }
        this.props.updateList(url);
    }

    render () {
        const dogBreeds = breeds.default.dogs.map((dog) => dog.name);
        const catBreeds = breeds.default.cats.map((cat) => cat.name);

        return (
            <div id="form-wrapper">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="zipcode">Zipcode:</label>
                    <input type="number" id="zipcode" name="zipcode" value={this.state.zipcode} onChange={this.handleChange} />
                    {
                        this.state.zipcode && 
                        <>
                            <label htmlFor="distance">Distance (mi):</label>
                            <input type="number" id="distance" name="distance" value={this.state.distance} onChange={this.handleChange} />
                        </>
                    }
                    <select id="animaltype" name="animaltype" value={this.state.animaltype} onChange={this.handleChange} >
                        <option value="">Animal Type</option>
                        <option value="cat">Cats</option>
                        <option value="dog">Dogs</option>
                    </select>
                    {
                        this.state.animaltype === 'cat' &&
                        <>
                            <select id="cat-breed" name="breed" value={this.state.breed} onChange={this.handleChange}>
                                <option value="">Select a Breed (optional)</option>
                                <Options args={catBreeds} />
                            </select>
                        </>
                    }
                    {
                        this.state.animaltype === 'dog' &&
                        <>
                            <select id="dog-breed" name="breed" value={this.state.breed} onChange={this.handleChange}>
                                <option value="">Breed (optional)</option>
                                <Options args={dogBreeds} />
                            </select>
                        </>
                    }
                    <select id="gender" name="gender" value={this.state.gender} onChange={this.handleChange}>
                        <option value="">Gender (optional)</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <input type="submit" value="Search" />
                </form>
            </div>
        );
    }
}

export default Form