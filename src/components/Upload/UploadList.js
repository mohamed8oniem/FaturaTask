import axios from 'axios';
import React, { Component } from 'react';
import { ApiKey } from '../../Config';
import GifList from '../Layouts/GifList/GifList';
import '../Favourits/_Favourites.scss'
class UploadList extends Component {
    state = {
        gifs: [],
        UploadList: JSON.parse(localStorage.getItem('UploadList')) || [],
    };
    componentDidMount() {
        this.getUploads()
    }
    getUploads() {
        const ids = this.state.UploadList.reverse().join(',');
        axios
            .get(`https://api.giphy.com/v1/gifs?&api_key=${ApiKey}&ids=${ids}`)
            .then((response) => {
                this.setState({
                    gifs: response.data.data,
                });
            });
    }
    render() {
        return <>
            <h1 className='PageHeader'>Your Awesome Uploaded Gifs</h1>
            <GifList list={this.state.gifs} />
        </>;
    }
}
export default UploadList;
