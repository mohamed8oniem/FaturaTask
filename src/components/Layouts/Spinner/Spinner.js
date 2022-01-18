import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { css } from '@emotion/react';

const Spinner = () => {
    const override = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `;
    return (
        <div className="sweet-loading">
            <BeatLoader loading={true} css={override} size={25} color="#cb2b98" />
        </div>
    );
};
export default Spinner;
