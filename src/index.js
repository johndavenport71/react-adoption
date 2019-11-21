import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Animals from './animal';
import Form from './form';
import Pagination from './pagination';
import * as serviceWorker from './serviceWorker';

/*
TODO:
Break down components into smaller pieces

Styling
  Get loading spinner to display when appropriate
*/

class App extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        tokenSet: false,
        token: '',
        animals: [],
        searched: false,
        showForm: true,
        currentPage: 0,
        nextPage: '',
        prevPage: ''
      }
  
    }

    getToken() {
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
    }//end getToken

    fetchAnimals(url = 'https://api.petfinder.com/v2/animals?', token) {
      let status = 0;
      fetch(url, {
          method: 'get',
          headers: {
              'Authorization': 'Bearer ' + token
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
                  this.setState({
                    animals: data.animals,
                    searched: true,
                    currentPage: data.pagination.current_page,
                    nextPage: data.pagination._links.next.href
                  });
                  if(data.pagination._links.previous) {
                    this.setState({prevPage: data.pagination._links.previous.href})
                  }
                  break;
              case 400:
                  return false;
              case 401:
                  return false;
              case 500:
                  return false;
              default:
                  return false;
          }//end switch
      })
      .catch(console.log)
    }//end fetchAnimals
    
    getData = (url) => {
      this.fetchAnimals(url, this.state.token);
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
          <Form updateList={this.getData}/>
          {
            this.state.animals ? 
            <>
              <Animals animals={this.state.animals} />
              <Pagination current={this.state.currentPage} next={this.state.nextPage} prev={this.state.prevPage} update={this.getData} /> 
            </>
            : 
            ''
          }
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
