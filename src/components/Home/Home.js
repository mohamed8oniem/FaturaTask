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
        if (scrollPosition >= document.body.scrollHeight - window.innerHeight) {
            loading ? setShowSpinner(false) : setShowSpinner(true);
            setTimeout(() => {
                getGifs();
            }, 2000);
        }
    }, [scrollPosition])


    const getGifs = () => {
        axios.get(`${Base}/trending?api_key=${ApiKey}&limit=20&offset=${pageNum}`).then((res) => {
            setLoading(false);
            setData([...data, res.data.data]);
            setPageNum(pageNum + 20);
            setShowSpinner(false);

        }).catch((err) => {
            console.log(err);
            setShowSpinner(false);
        })
    }
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
            {/* <Search /> */}
            <SearchBar />
            {trendingData.length > 0 ? (<TrendingSlider list={trendingData} loading={loading} />) : (<Spinner />)}
            {/* {trendingData.length > 0 ? console.log(trendingData[0]) : (<Spinner />)} */}
            <h2 className='Title'>Beautiful Gifs</h2>
            <GifList list={data?.flat()} loading={loading} customClassName={showSpinner ? true : false} />
            <div className="bottomSpinner">
                {
                    showSpinner ? <Spinner /> : null
                }
            </div>
            {/* <button onClick={loadmore}> Load More ..</button> */}
        </div>

    )
}

export default Home
