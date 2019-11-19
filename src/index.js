import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Animals from './animal';
import Form from './form';
import * as serviceWorker from './serviceWorker';

/*
TODO:
Break down components into smaller pieces
  Pagination needs to be separate from form
Styling
*/

class App extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        tokenSet: false,
        token: '',
        animals: [],
        searched: false,
        showForm: true
      }
  
    }
  
    getData = (list) => {
      this.setState({animals: list, searched: true, showForm: false});
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
          <header>
            <img src="logo_transparent.png" alt="Pawsome logo" width="75" height="75"/>
            <h1>Search</h1>
          </header>    
          {this.state.showForm ? <Form token={this.state.token} updateList={this.getData}/> : <button onClick={() => {this.setState({showForm: true})}}>Edit Search</button> }
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
