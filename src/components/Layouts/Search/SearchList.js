import React, { Component } from 'react';
import './_SearchBar.scss';
import { Search as SearchIcon } from 'react-bootstrap-icons';
import { ApiKey, Base } from '../../../Config';
import axios from 'axios';

class SearchBar extends Component {

    state = {
        SearchValue: '',
        SearchData: [],
        Searching: false,
    }


    onChange = (e) => {
        this.setState({ SearchValue: e.target.value });
    };
    componentDidMount() {
        this.searchFun();
    }

    searchFun() {
        if (this.state.SearchValue === '') {
            axios.get(`${Base}/search?api_key=${ApiKey}&limit=20&q=${localStorage.getItem('firrstQuery')}`).then((res) => {
                this.setState({ SearchData: res.data.data })
            }).catch((err) => {
                console.log(err)
            })

        } else {
            axios.get(`${Base}/search?api_key=${ApiKey}&limit=20&q=${this.state.SearchValue}`).then((res) => {
                this.setState({ SearchData: res.data.data })
            }).catch((err) => {
                console.log(err)
            })
        }

    }
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.SearchValue === '') {
            console.log('empty')
        } else {
            window.location.href = `/Search/${this.state.SearchValue}`;
            this.searchFun();
            localStorage.setItem('firrstQuery', this.state.SearchValue)
        }
    };

    render() {
        return (
            <>


                <div className="SearchForm">
                    <div className="SearchForm__wrapper">
                        <form className="form" onSubmit={this.onSubmit}>
                            <input
                                className="SearchForm__field"
                                type="text"
                                name="text"
                                placeholder="Search Gifs...."
                                value={this.state.SearchValue}
                                onChange={this.onChange}
                            />
                            <div className="Search_btn">
                                <button type="submit">
                                    <SearchIcon />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </>
        );
    }

}

export default SearchBar;

