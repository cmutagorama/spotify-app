import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
const NotFoundPage = () => (
    <React.Fragment>
        <Header/>
        Page not found. Go to <Link to="/dashboard">Home</Link>
    </React.Fragment>
);

export default NotFoundPage;