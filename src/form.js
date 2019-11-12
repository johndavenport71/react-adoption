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
            page: 1
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    handleChange(event) {
        var fieldName = event.target.name;
        this.setState({[fieldName]: event.target.value});
    }

    nextPage(params) {
        let status = 0;
        let url = 'https://api.petfinder.com';
        if(params) {
            url += params;
        } else {
            return;
        }
        fetch(url, {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + this.props.token
            }
        })
        .then(res => {
            status = res.status;
            return res.json();
        })
        .then((data) => {
            console.log(data);
            switch (status) {
                case 200:
                    this.setState({next: data.pagination._links.next.href});
                    if(data.pagination._links.previous){
                        this.setState({prev: data.pagination._links.previous.href});
                    }
                    var currentPage = data.pagination.current_page;
                    this.setState({page: currentPage});
                    this.props.updateList(data.animals);
                    break;
                case 400:
                    this.props.updateList('');
                    break;
                case 401:
                    this.props.updateList('');
                    break;
                case 500:
                    this.props.updateList('');
                    break;
                default:
                    this.props.updateList('');
                    break;
            }//end switch
        })
        .catch(console.log)
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
            url += 'distance=' + this.state.distance + '&';
        }
        if(this.state.breed) {
            url += 'breed=' + this.state.breed + '&';
        }
        if(this.state.gender) {
            url += 'gender=' + this.state.gender + '&';
        }
        let status = 0;
        fetch(url, {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + this.props.token
            }
        })
        .then(res => {
            status = res.status;
            return res.json();
        })
        .then((data) => {
            switch (status) {
                case 200:
                    this.setState({next: data.pagination._links.next.href});
                    this.props.updateList(data.animals);
                    break;
                case 400:
                    this.props.updateList('');
                    break;
                case 401:
                    this.props.updateList('');
                    break;
                case 500:
                    this.props.updateList('');
                    break;
                default:
                    this.props.updateList('');
                    break;
            }//end switch
        })
        .catch(console.log)
    }

    render () {
        return (
            <div>
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
                    
                    <label htmlFor="animaltype">Animal Type</label>
                    <select id="animaltype" name="animaltype" value={this.state.animaltype} onChange={this.handleChange} >
                        <option value="">All</option>
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
                {this.state.page > 1 ? <button onClick={() => this.nextPage(this.state.prev)}>Previous</button> : ''}
                <button onClick={() => this.nextPage(this.state.next)}>Next</button>
            </div>
        );
    }
}

export default Form