import React from 'react';
import './User.css';
import LoggedIn from './LoggedIn';
import NotLoggedIn from './NotLoggedIn';

const width = {
    width: 100,
    padding: 10
}

const User = (props) => {

    if (props.isLogin) {
        return (
            <div style={width}>
                <LoggedIn user={props.user} setUser={props.setUser} login={props.isLogin} setState={props.setLogin}/>
            </div>
        )
    } else {
        return (
            <div>
                <NotLoggedIn setState={props.setLogin}/>
            </div>
        )
    }
}

export default User