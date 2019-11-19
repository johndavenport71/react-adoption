import React, { Component } from 'react';

class Pagination extends Component {

    nextPage () {

    }

    render () {
        return (
            <div className="pagination">
                {this.props.page > 1 ? <button onClick={() => this.nextPage(this.props.prev)}>Previous</button> : ''}
                {this.props.page > 0 ? <p>{this.props.page}</p> : ''}
                {this.props.page >= 1 ? <button onClick={() => this.nextPage(this.props.next)}>Next</button> : ''}
            </div>
        );
    }
}

export default Pagination