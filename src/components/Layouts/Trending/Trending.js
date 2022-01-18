import React from 'react';
import MyImage from '../../LazyLoading/Image';
import Slider from 'react-slick';
import './Trending.scss';
import GifList from '../GifList/GifList';
const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 922,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            }
            },
            {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                arrows:false
            }
            },
            {
                breakpoint: 580,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    arrows:false
                }
            }
        ]
};
const TrendingSlider = ({ list }) => {
    return (
        <div className="trending-gifs">
            <h2 className="widget-title">Trending gifs</h2>
            <Slider className="trending-list-slider-parent" {...settings}>
                {list?.map((item) => {
                    return (
                        <div className="slide-parent" key={item.id}>
                            <MyImage image={item.images.original.url} />
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};

export default TrendingSlider;
