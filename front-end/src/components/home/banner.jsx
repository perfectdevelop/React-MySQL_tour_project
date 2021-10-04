/**
 *  banner.js
 *  @version: 1.0.0
 *  @author: trejocode - Sergio
 *  @description: Slider
*/

import React from 'react';
import { useTranslation } from 'react-i18next';

//Imágenes
import Slide1 from '../../img/home-slide1.jpg';
import Slide2 from '../../img/home-slide2.jpg';
import Slide3 from '../../img/home-slide3.jpg';

const Banner = () => {
    const { t } = useTranslation();
    return (
        <div className="slider" data-flickity='{ "cellAlign": "left", "contain": true, "autoPlay": 4000, "pageDots": false }'>
            <div className="slide justify-center" style={{ backgroundImage: `url(${Slide1})` }}>
                <div className="container column justify-center">
                    <div className="title">
                        <h1 className="color-white">
                            { t('BANNER.SLIDE1TITLE') }
                        </h1>
                        <h2 className="color-white">
                            { t('BANNER.SLIDE1SUBTITLE') }
                        </h2>
                        <h4 className="color-white">
                            { t('BANNER.SLIDE1CONTENT') }
                        </h4>
                    </div>
                </div>
            </div>
            <div className="slide justify-center" style={{ backgroundImage: `url(${Slide2})`}}>
                <div className="container column justify-center">
                    <div className="title">
                        <h1 className="color-white">
                            { t('BANNER.SLIDE2TITLE') }
                        </h1>
                        <h2 className="color-white">
                            { t('BANNER.SLIDE2SUBTITLE') }
                        </h2>
                        <h4 className="color-white">
                            { t('BANNER.SLIDE2CONTENT') }
                        </h4>
                    </div>
                </div>
            </div>
            <div className="slide justify-center" style={{ backgroundImage: `url(${Slide3})`}}>
                <div className="container column justify-center">
                    <div className="title">
                        <h1 className="color-white">
                            { t('BANNER.SLIDE3TITLE') }
                        </h1>
                        <h2 className="color-white">
                            { t('BANNER.SLIDE3SUBTITLE') }
                        </h2>
                        <h4 className="color-white">
                            { t('BANNER.SLIDE3CONTENT') }
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;