import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
    // console.log(props);
    const inputEl = useRef("");
    // const deleteContactHandler = (id) => {
    //     props.getContactId(id);
    // };
    /*const contacts = [{
            id : '1',
            "name" : "Dipesh",
            "email" : "dipesh@mail.com"
        },
    ];*/
    const renderContactList = props.contacts.map((contact) => {
            return (
                <ContactCard contact={contact} key={contact.id} />
                // <ContactCard contact={contact} clickHandler={deleteContactHandler} key={contact.id} />
            );
        }
    );

    const getSearchTerm = () => {
        // console.log(inputEl.current.value);
        props.searchKeyword(inputEl.current.value);
    };

    return (
        <div className="ui celled list">
            <h2>Contact List
                <Link to='/add'>
                    <button className="ui button blue right floated">Add Contact</button>
                </Link>
            </h2>
            <div className="ui search" >
                <div className="ui icon input" style={{ width: '100%', marginTop: '1rem', marginBottom: '1.5rem' }}>
                    <input ref={ inputEl } type="text" placeholder="Search Contacts" className="prompt" value={ props.term } onChange={ getSearchTerm } />
                    <i className="search icon"></i>
                </div>
            </div>
            {renderContactList.length > 0 ? renderContactList : "No contacts available"}
        </div>
    );
};

export default ContactList;