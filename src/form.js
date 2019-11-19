import React, { Component } from 'react';

class Form extends Component {
    constructor (props) {
        super(props);

        this.state = {
            zipcode: '',
            animaltype: '',
            breed: '',
            gender: '',
            distance: 100,
            next: '',
            prev: '',
            page: 0,
            loading: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.nextPage = this.nextPage.bind(this);
    }

    handleChange(event) {
        var fieldName = event.target.name;
        this.setState({[fieldName]: event.target.value});
    }

    // nextPage(params) {
    //     this.setState({loading: true});
    //     let url = 'https://api.petfinder.com';
    //     if(params) {
    //         url += params;
    //     } else {
    //         return;
    //     }
    //     conn.fetchAnimals(url, this.props.token);
    // }

    handleSubmit(event) {
        // this.setState({loading: true});
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

    componentDidMount() {
        this.setState({loading: false});
    }

    render () {
        return (
            <>
            <div id="form-wrapper">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="zipcode">Zipcode:</label>
                    <input type="text" id="zipcode" name="zipcode" value={this.state.zipcode} onChange={this.handleChange} />
                    <br></br>
                    {
                        this.state.zipcode ? 
                        <>
                            <label htmlFor="distance">Distance (mi):</label>
                            <input type="number" id="distance" name="distance" value={this.state.distance} onChange={this.handleChange} />
                            <br></br>
                        </>
                        :
                        ''
                    }
                    
                    <select id="animaltype" name="animaltype" value={this.state.animaltype} onChange={this.handleChange} >
                        <option value="">Animal Type</option>
                        <option value="cat">Cats</option>
                        <option value="dog">Dogs</option>
                    </select>
                    <br></br>
                    {
                        this.state.animaltype === 'cat' ? 
                        <>
                            <select id="cat-breed" name="breed" value={this.state.breed} onChange={this.handleChange}>
                                <option value="">Select a Breed (optional)</option>
                                <option value="Calico">Calico</option>
                                <option value="Domestic Short Hair">Domestic Short Hair</option>
                                <option value="Domestic Long Hair">Domestic Long Hair</option>
                                <option value="Maine Coon">Maine Coon</option>
                                <option value="Tabby">Tabby</option>
                                <option value="Tuxedo">Tuxedo</option>
                            </select>
                            <br></br>
                        </>
                        : '' 
                    }
                    {
                        this.state.animaltype === 'dog' ?
                        <>
                            <select id="dog-breed" name="breed" value={this.state.breed} onChange={this.handleChange}>
                                <option value="">Breed (optional)</option>
                                <option value="Beagle">Beagle</option>
                                <option value="Boxer">Boxer</option>
                                <option value="Chihuahua">Chihuahua</option>
                                <option value="Retriever">Retriever</option>
                                <option value="Shepherd">Shepherd</option>
                                <option value="Terrier">Terrier</option>
                            </select>
                            <br></br>
                        </>
                        : ''
                    }
                    
                    <select id="gender" name="gender" value={this.state.gender} onChange={this.handleChange}>
                        <option value="">Gender (optional)</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <br></br>
                    <input type="submit" value="Search" />
                </form>
                </div>
                {this.state.loading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : ''}
            </>
        );
    }
}

export default Form