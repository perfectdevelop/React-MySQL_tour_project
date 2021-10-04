import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const places = [
    {
        image: require('../img/fav-holbox.jpg'),
        title: 'Japan Tokyo',
        description:
            'We invite you to experience here with your family, definitely you are filled with lasting memories and feel awesome.',
        link: 'booking',
    },
    {
        image: require('../img/fav-isla.jpg'),
        title: 'Spain Madrid',
        description:
            'We invite you to experience here with your family, definitely you are filled with lasting memories and feel awesome.',
        link: 'booking',
    },
    {
        image: require('../img/fav-islablanca.jpg'),
        title: 'Italy',
        description:
            'We invite you to experience here with your family, definitely you are filled with lasting memories and feel awesome.',
        link: 'booking',
    },

];

const PromotionalOnes = () => {
    const { t } = useTranslation();
    return (
        <div className="favorites justify-center">
            <div className="container column">
                <h2 className="text-center color-darkgray">
                    {t('FAVORITES.SECOND_TITLE')}
                </h2>
                <div className="white-space-32"></div>
                <div className="destination-card-container row-responsive">
                    {places.map((item, index) => (
                        <Link to={item.link} className="destination-card wow animated fadeInUp" key={index}>
                            <div className="image responsive-img">
                                <img src={item.image} alt="" />
                            </div>
                            <div className="info full column">
                                <h2 className="color-white">
                                    {item.title}
                                </h2>
                                <div className="white-space-8"></div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default PromotionalOnes;