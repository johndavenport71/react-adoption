import React, { Component } from 'react';
import Animals from './animal';
import Form from './form';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tokenSet: false,
      token: '',
      animals: []
    }

  }

  getData = (list) => {
    this.setState({animals: list});
  }
  
  componentDidMount() {
      fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'client_id': process.env.REACT_APP_API_KEY,
          'client_secret': process.env.REACT_APP_API_SECRET,
          'grant_type': 'client_credentials'
        })
      })
      .then(res => res.json())
      .then((data) => {
        this.setState({token: data.access_token}); 
        this.setState({tokenSet: true});
      })
      .catch(console.log)
  }//end componentMount

  render () {
    return (
      <div>
        <h1>Animals list</h1>
        <Form token={this.state.token} updateList={this.getData} />
        {this.state.animals ? <Animals animals={this.state.animals} /> : ''}
      </div>
    );
  }
}

export default App;
