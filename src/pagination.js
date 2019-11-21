import React, { Component } from 'react';

class Pagination extends Component {
    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(param) {
        let url = 'https://api.petfinder.com';
        url += param;
        this.props.update(url);
    }

    render () {
        return (
            <div className="pagination">
                {this.props.current > 1 ? <button onClick={() => {this.handleClick(this.props.prev)}}>Previous</button> : ''}
                {this.props.current > 0 ? <p>{this.props.current}</p> : ''}
                {this.props.current >= 1 ? <button onClick={() => {this.handleClick(this.props.next)}}>Next</button> : ''}
            </div>
        );
    }
}

export default Pagination