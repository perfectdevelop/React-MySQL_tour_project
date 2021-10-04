/**
 *  reviews.js
 *  @version: 1.0.0
 *  @author: trejocode - Sergio
 *  @description: Sección de reseñas
*/

import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutReviews = () => {
    const { t } = useTranslation();
    return(
        <div className="reviews justify-center">
            <div className="container column">
                <div className="white-space-48"></div>
                <p className="text-center">
                    { t('REVIEWS.SUBTITLE') }
                </p>                    
                <h2 className="text-center color-darkgray">
                    { t('REVIEWS.TITLE') }
                </h2>
                <div className="white-space-24"></div>
                <div className="reviews-container full" data-flickity='{ "cellAlign": "left", "contain": true, "autoPlay": 4000, "pageDots": false }'>
                    <div className="review column">
                        <div className="justify-center">
                            <p className="text-center">
                                Excellent service at a good price compared to the hotel's shuttle... Always in email communication even when I changed my pickup times. This is the shuttle company to use in Cancun! Thank you so much!
                            </p>
                        </div>
                        <div className="white-space-4"></div>
                        <div className="justify-center">
                            <p className="text-center">
                                <i><b> - Dave Marais</b></i>
                            </p>
                        </div>
                        <div className="white-space-8"></div>
                    </div>
                    <div className="review column">
                        <div className="justify-center">
                            <p className="text-center">
                                I used this company for my recent trip to cancun and they were great. No problems at all they give u all the information you need and showed up on time for my pickup back to the airport. Very friendly and professional people. Highly recommend.
                            </p>
                        </div>
                        <div className="white-space-4"></div>
                        <div className="justify-center">
                            <p className="text-center">
                                <i><b> - Melissa Schaefer</b></i>
                            </p>
                        </div>
                        <div className="white-space-8"></div>
                    </div>
                    <div className="review column">
                        <div className="justify-center">
                            <p className="text-center">
                                Best Line was an amazing company to work with! We traveled with our two small children and happy shuttle provided car seats for FREE!! They were very friendly at the airport and it was very easy to find them.  Their instructions were very clear and they were very professional.  The drivers were very courteous and fun to travel with.  I appreciated that on the day we departed they were more than on time, they were early. I recommend them to anyone traveling to Cancun.
                            </p>
                        </div>
                        <div className="white-space-4"></div>
                        <div className="justify-center">
                            <p className="text-center">
                                <i><b> - Myriah Fankhauser</b></i>
                            </p>
                        </div>
                        <div className="white-space-8"></div>
                    </div>
                </div>
                <div className="white-space-48"></div>
            </div>
        </div>
    );
}

export default AboutReviews;