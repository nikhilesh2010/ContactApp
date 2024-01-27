import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AddContact = (props) => {

    const [state, setState] = useState({
        name: "",
        email: "",
    });

    const navigate = useNavigate();

    const add = (event) => {
        event.preventDefault();
        if (state.name === "" || state.email === "") {
            alert("All fields are mandatory.");
            return;
        }
        props.addContactHandler(state);
        setState({ name: "", email: "" });
        navigate('/');
    };

    return (
        <div className="ui main">
        <h2>Add Contact
            <Link to='/'>
                <button className="ui button blue right floated">Contact List</button>
            </Link>
        </h2>

        <form className="ui form" onSubmit={add}>
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
            <button className="ui button blue">Add</button>
        </form>
        </div>
    );
};

export default AddContact;