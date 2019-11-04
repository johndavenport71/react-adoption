import React, { Component } from 'react';
import Animals from './animal';
import './App.css';

class App extends Component {
  state = {
    tokenSet: false,
    token: '',
    animals: []
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
        fetch('https://api.petfinder.com/v2/animals', {
          method: 'get',
          headers: {
            'Authorization': 'Bearer ' + this.state.token
          }
        })
        .then(res => res.json())
        .then((data) => {
          this.setState({ animals: data.animals });
          console.log(this.state.animals);
        })
        .catch(console.log)
      })
      .catch(console.log)
    
    

    
  }

  render () {
    return (
      <Animals animals={this.state.animals} />
    );
  }
}

export default App;




/*


REQUEST ACCESS TOKEN:
curl -d "grant_type=client_credentials&client_id=006NnSFxxKEXpjLmZgpDs49I7hfXBCKseDYKoNcfQeqEJqr2AE&client_secret=SzkuKhvucwMQpcwwPgfIyfAesfOGKsIasbWx8xVT" https://api.petfinder.com/v2/oauth2/token


QUERY DATABASE:
curl -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" GET https://api.petfinder.com/v2/{CATEGORY}/{ACTION}?{parameter_1}={value_1}&{parameter_2}={value_2}




*/