import React, { Component } from 'react'
import { connect } from 'react-redux';

class Search extends Component {
    state = {
        searchQuery: "",
    };
    handleChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.search(this.state.searchQuery)
        
    };
    render() {
        return (
            <div >
                <form>
                    <input type="text" placeholder="Search..." name="searchQuery" onChange={this.handleChange}/>
                    <button type="submit" onClick={this.handleSubmit}>Search</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        blog: state.blogState.blog
    }
}

export default connect(mapStateToProps, null)(Search);
