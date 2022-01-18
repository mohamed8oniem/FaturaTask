import React, { useEffect, useState } from 'react';
import MyImage from '../../LazyLoading/Image';
import Spinner from '../Spinner/Spinner';
import { HeartFill, Link } from 'react-bootstrap-icons';
import './_GifList.scss';
const GifList = ({ list, loading, customClassName }) => {
    //set the Favlist state & get items from local sotrage if existed .
    const [Favourite, setFavourite] = useState(JSON.parse(localStorage.getItem('FavouritesGifs')) || []);
    const SetFav = (item) => {
        //remove the ids from the list if its existed .
        if (Favourite.includes(item.id)) {
            setFavourite(Favourite.filter((deleted) => {
                return deleted !== item.id;
            }))
        } else {
            // if not update the state with the new id.
            setFavourite([...Favourite, item.id]);
        }
    }
    useEffect(() => {
        // remove duplicated items and set Arr to local sotrage 
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
                                        <div className="itemControl">
                                            <button className='' onClick={(e) => {
                                                SetFav(item);
                                            }}>
                                                {/* handle the Fav styles */}
                                                <HeartFill className={Favourite.includes(item.id) ? 'added' : ''} />
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