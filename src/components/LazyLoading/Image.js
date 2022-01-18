import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import lazyloadPlaceHolder from '../../assets/images/Logo.gif';

// import heart from '../../assets/images/BeatingHearts.gif'

const MyImage = ({ image }) => {
    return (
        <div className="ImageContainer">
            <LazyLoadImage
                placeholderSrc={lazyloadPlaceHolder}
                effect="blur"
                src={image}
            />
        </div>
    );
};

export default MyImage;
