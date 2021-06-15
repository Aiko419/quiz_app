import * as React from 'react';

import Image404 from '../../image/404-error-page-found.png'; 

import './styles.scss';

const Page404:any = () => {
    return (
        <div className='wrapper-login-page'>
            <img src={Image404} alt="error-page-found" />
        </div>
    )
}

export default Page404;