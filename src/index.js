import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Animals from './animal';
import Form from './form';
import * as serviceWorker from './serviceWorker';

/*
TODO:
Finalize info to be displayed for each animal
Styling
*/

class App extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        tokenSet: false,
        token: '',
        animals: [],
        searched: false
      }
  
    }
  
    getData = (list) => {
      this.setState({animals: list});
      this.setState({searched: true});
    }

    getToken = () => {
      let status = 0;
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
        .then(res => {
          status = res.status;
          return res.json();
        })
        .then((data) => {
          switch (status) {
            case 200:
                this.setState({token: data.access_token}); 
                this.setState({tokenSet: true});
                break;
            case 401:
              console.log('bad auth');
              break;
            default:
              console.log('Something went wrong?');
              break;
          }
          
        })
        .catch(console.log)
    }
    
    componentDidMount() {
        this.getToken();
    }//end componentMount
  
    render () {
      return (
        <div>
          <h1>Animals list</h1>
          <Form token={this.state.token} updateList={this.getData} />
          {this.state.animals ? <Animals animals={this.state.animals} /> : ''}
          {this.state.animals.length === 0 && this.state.searched ? <h2>No results found, try changing your search criteria.</h2> : ''}
        </div>
      );
    }
  }
  
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
