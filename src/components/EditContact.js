import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

const EditContact = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [state, setState] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
    });
    useEffect(() => {
        const { contact } = location.state;
        setState({
            id: contact.id,
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
        });
    }, [location.state]);

    const update = (event) => {
        event.preventDefault();
        if (state.name === "" || state.email === "") {
            alert("All fields are mandatory.");
            return;
        }
        props.updateContactHandler(state);
        setState({ name: "", email: "", phone: "" });
        navigate('/');
    };

    return (
        <div className="ui main">
        <h2>Edit Contact
            <Link to='/'>
                <button className="ui button blue right floated">Contact List</button>
            </Link>
        </h2>

        <form className="ui form" onSubmit={update}>
            <div className="field">
                <label>Name</label>
                <input 
                    type="text" name="name" placeholder="Name" 
                    value={state.name} 
                    onChange={(e) => setState({...state,name: e.target.value})} 
                />
            </div>
            <div className="field">
                <label>Email</label>
                <input 
                    type="email" name="email" placeholder="Email" 
                    value={state.email} 
                    onChange={(e) => setState({...state,email: e.target.value})} 
                />
            </div>
            <div className="field">
                <label>Phone</label>
                <input 
                    type="text" name="phone" placeholder="Phone Number" 
                    value={state.phone} 
                    onChange={(e) => setState({...state,phone: e.target.value})} 
                    pattern="[0-9]*"
                />
            </div>
            <button className="ui button blue">Update</button>
        </form>
        </div>
    );
};

export default EditContact;