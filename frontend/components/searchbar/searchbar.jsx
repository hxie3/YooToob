import React from 'react';
import { library, icon, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchFocus = this.handleSearchFocus.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentDidMount() {
        library.add(fas)
        const search = findIconDefinition({ prefix: 'fas', iconName: 'search' });
        const searchIcon = icon(search);
        Array.from(searchIcon.node).map(n => document.getElementsByClassName('search-button')[0].appendChild(n))
    }

    handleSearch(e) {
        e.preventDefault();
        let query = document.getElementsByClassName("searchbar")[0].value;
        this.props.history.push(`/search/${query}`);
    }

    handleSearchFocus(e) {
        e.preventDefault();
        document.getElementsByClassName('searchbar-container')[0].classList.toggle('searchbar-container-focus')
    }

    handleSearchChange(e) {
        e.preventDefault();
        this.setState({ query: e.currentTarget.value });
    }

    render() {
        return (
            <div className='searchbar-container-button-container'>
                <div className='searchbar-container'>
                    <input onChange={this.handleSearchChange} className='searchbar' type="text" placeholder='Search' onFocus={this.handleSearchFocus} onBlur={this.handleSearchFocus} />
                </div>
                <button onClick={this.handleSearch} className='search-button'></button>
            </div>
        )
    }
}

export default withRouter(SearchBar);