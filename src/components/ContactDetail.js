import React from "react";
import { useLocation, Link } from "react-router-dom";
import user from "../images/user.png";

const ContactDetail = _ => {
    const { state } = useLocation();
    console.log(state);
    // const { name, email} = props.contact
    return (
        <div className="main">
            <div className="ui card centered">
                <h1 className="ui centered header">Contact Detail</h1>
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header">{state.contact.name}</div>
                    <div className="description">{state.contact.email}</div>
                </div>
            </div>
            <div className="ui center aligned container">
                <Link to='/'>
                    <button className="ui button blue">Contact List</button>
                </Link>
            </div>

        </div>
    );
};

export default ContactDetail;