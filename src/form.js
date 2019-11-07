import React, { Component } from 'react';

class Form extends Component {
    constructor (props) {
        super(props);

        this.state = {
            zipcode: '',
            animaltype: '',
            breed: ''
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
        var url = 'https://api.petfinder.com/v2/animals?';
        if(this.state.animaltype) {
            url += 'type=';
            url += this.state.animaltype;
            url += '&';
        } 
        if(this.state.zipcode) {
            url += 'location=' + this.state.zipcode + '&';
        }
        if(this.state.breed) {
            url += 'breed=' + this.state.breed + '&';
        }
        
       fetch(url, {
          method: 'get',
          headers: {
            'Authorization': 'Bearer ' + this.props.token
          }
        })
        .then(res => res.json())
        .then((data) => {
            //pass data to parent component
            this.props.updateList(data.animals);
        })
        .catch(console.log)
    }

    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="zipcode">Zipcode:</label>
                    <input type="text" id="zipcode" name="zipcode" value={this.state.zipcode} onChange={this.handleChange} />
                    <label htmlFor="animaltype">Animal Type</label>
                    <select id="animaltype" name="animaltype" value={this.state.animaltype} onChange={this.handleChange} >
                        <option value="">All</option>
                        <option value="cat">Cats</option>
                        <option value="dog">Dogs</option>
                    </select>
                    {
                        this.state.animaltype === 'cat' ? 
                        <select id="cat-breed" name="breed" value={this.state.breed} onChange={this.handleChange}>
                            <option value="">Select a Breed (optional)</option>
                            <option value="Calico">Calico</option>
                            <option value="Domestic Short Hair">Domestic Short Hair</option>
                            <option value="Domestic Long Hair">Domestic Long Hair</option>
                            <option value="Maine Coon">Maine Coon</option>
                            <option value="Tabby">Tabby</option>
                            <option value="Tuxedo">Tuxedo</option>
                        </select>
                        :
                        <select id="dog-breed" name="breed" value={this.state.breed} onChange={this.handleChange}>
                            <option value="">Select a Breed (optional)</option>
                            <option value="Beagle">Beagle</option>
                            <option value="Boxer">Boxer</option>
                            <option value="Chihuahua">Chihuahua</option>
                            <option value="Retriever">Retriever</option>
                            <option value="Shepherd">Shepherd</option>
                            <option value="Terrier">Terrier</option>
                        </select>
                    }
                    <input type="submit" value="Search" />
                </form>
            </div>
        );
    }
}

export default Form