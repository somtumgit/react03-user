import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = function({element:Element ,children}) {
    // const token = window.localStorage.getItem('token');
    // console.log(Element);
    // console.log(props.slug);
    return <Element />

    // if(token) {
    //     return props.children;
    //     return <Element />
    // }else {
    //     return <Navigate to={'/signin'}/>
    // }
    
}

// const PrivateRoute = function(props) {
//     console.log(props);
//     return props.children;
// }

export default PrivateRoute;