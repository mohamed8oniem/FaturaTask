import React, { useEffect, useState } from 'react';
import MyImage from '../../LazyLoading/Image';
import Spinner from '../Spinner/Spinner';
import { HeartFill, Link } from 'react-bootstrap-icons';

import './_GifList.scss';
// import Favourites from '../../Favourits/Favourites';
const GifList = ({ list, loading, customClassName }) => {

    const [Favourite, setFavourite] = useState(JSON.parse(localStorage.getItem('FavouritesGifs')) || []);
    const SetFav = (item) => {
        if (Favourite.includes(item.id)) {

            setFavourite(Favourite.filter((deleted) => {
                return deleted !== item.id;
            }))
        } else {

            setFavourite([...Favourite, item.id]);
        }

    }
    useEffect(() => {
        localStorage.setItem('FavouritesGifs', JSON.stringify([...new Set(Favourite)]));
    }, [Favourite])

    if (loading) {
        return <Spinner />
    } else {
        return (
            <div className={customClassName ? 'listGif Spinner' : 'listGif'}>
                <div className="listGif__wrapper">
                    <ul>
                        {

                            list?.map((item) => {
                                return (
                                    <li key={item.id}>
                                        {/* <img src={item.images.original.url} /> */}
                                        <div className="itemControl">
                                            <button className='' onClick={(e) => {
                                                SetFav(item);
                                            }}>
                                                <HeartFill className={Favourite.includes(item.id) ? 'added' : ''} />
                                                {/* <HeartFill className={item.id === selectedID ? "added" : ""} /> */}
                                            </button>
                                            <button>
                                                <Link />
                                            </button>
                                        </div>
                                        <a href={item.bitly_gif_url} target='_blan'>
                                            <MyImage image={item.images.downsized_large.url} />
                                        </a>
                                    </li>
                                )
                            })
                        }

                    </ul>
                </div>
            </div>
        )
    }


}


export default GifList;;