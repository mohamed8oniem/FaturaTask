import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import lazyloadPlaceHolder from '../../assets/images/Logo.gif';
const MyImage = ({ image }) => {
    return (
        <div className="ImageContainer">
            <LazyLoadImage
                // PlaceHolder to set lazyloading, it shows before the image loaded
                placeholderSrc={lazyloadPlaceHolder}
                effect="blur"
                src={image}
            />
        </div>
    );
};

export default MyImage;
