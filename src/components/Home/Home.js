import axios from 'axios'
import React, { useState, useEffect, } from 'react';
import { Base, ApiKey } from '../../Config'
import GifList from '../Layouts/GifList/GifList'
import useScrollPosition from "../UseScroll";
import Spinner from '../Layouts/Spinner/Spinner';
import './_Home.scss';
import SearchBar from '../Layouts/Search/SearchList'
import TrendingSlider from '../Layouts/Trending/Trending'

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [trendingData, setTrendingData] = useState([])
    const [pageNum, setPageNum] = useState(0);
    const [showSpinner, setShowSpinner] = useState(false);
    const scrollPosition = useScrollPosition();
    useEffect(() => {
        setLoading(true);
        getGifs();
        getTrendingGifs();
        setShowSpinner(false);
    }, [])
    useEffect(() => {
        // Detect if we are in bottom of the page 
        // if we are in the bottom show spinner and generate data 
        //once we get data, hide the spinner 
        if (scrollPosition >= document.body.scrollHeight - window.innerHeight) {

            loading ? setShowSpinner(false) : setShowSpinner(true);
            setTimeout(() => {
                getGifs();
            }, 2000);
        }
    }, [scrollPosition])

    // get Gifs list from Api Endpoint 
    const getGifs = () => {
        axios.get(`${Base}/trending?api_key=${ApiKey}&limit=20&offset=${pageNum}`).then((res) => {
            setLoading(false);
            // Update and bind the Data from the response 
            setData([...data, res.data.data]);
            // Set the offset of page number 
            setPageNum(pageNum + 20);
            // Stop the spinner 
            setShowSpinner(false);

        }).catch((err) => {
            console.log(err);
            setShowSpinner(false);
        })
    }
    //get Trending Gifs and parse it to the Slick
    const getTrendingGifs = () => {
        axios.get(`${Base}/trending?api_key=${ApiKey}&limit=20&offset=40`).then((res) => {
            setLoading(false);
            setTrendingData(res.data.data);

        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <SearchBar />
            {trendingData.length > 0 ? (<TrendingSlider list={trendingData} loading={loading} />) : (<Spinner />)}
            <h2 className='Title'>Beautiful Gifs</h2>
            {/* 2D to 1D */}
            <GifList list={data?.flat()} loading={loading} customClassName={showSpinner ? true : false} />
            <div className="bottomSpinner">
                {
                    showSpinner ? <Spinner /> : null
                }
            </div>
        </div>

    )
}

export default Home
