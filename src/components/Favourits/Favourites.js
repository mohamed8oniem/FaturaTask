import axios from 'axios';
import React, { Component } from 'react';
import { ApiKey } from '../../Config';
import GifList from '../Layouts/GifList/GifList';
import './_Favourites.scss'
class Favourites extends Component {
    state = {
        gifs: [],
        favorites: JSON.parse(localStorage.getItem('FavouritesGifs')) || [],
    };
    componentDidMount() {
        this.favorites()
    }
    favorites() {
        const ids = this.state.favorites.reverse().join(',');
        axios
            .get(`http://api.giphy.com/v1/gifs?&api_key=${ApiKey}&ids=${ids}`)
            .then((response) => {
                console.log(response.data.data)
                this.setState({
                    gifs: response.data.data,

                });
            });
    }
    render() {
        return <>
            <h1 className='PageHeader'>Your Awesome Favourite Gifs</h1>
            <GifList list={this.state.gifs} />
        </>;
    }
}
export default Favourites;
