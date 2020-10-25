import React from 'react';

// import Button from '@components/Button';

import styles from './styles.module.scss';

const Error = ({ title = 'Whoops', text = '', error = {} }) => (
    <div className={styles.error}>
        <h1>{title}</h1>
        <p>{text || (error?.errorMessage ?? 'Something went wrong 😭')}</p>
        {/*<div className={styles.errorButton}>*/}
        {/*    <Button text="Go back" onClick={() => navigate(-1)} />*/}
        {/*    <Button*/}
        {/*        secondary*/}
        {/*        text="Contact Support"*/}
        {/*        link={`mailto:team@elementsoftworks.co.uk?subject=Merlin Panel - Error - ${text ||*/}
        {/*        error.errorMessage}`}*/}
        {/*    />*/}
        {/*</div>*/}
    </div>
);

export default Error;
