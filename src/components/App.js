import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { v4 } from 'uuid';
import './App.css';
// import api from '../api/contacts';
import Header from "./Header";
import AddContact from './AddContact'
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
import DeleteContact from './DeleteContact';
import EditContact from './EditContact';
import NotFound from './NotFound';

function App() {
  // const contacts = [
  //   {
  //     id : '1',
  //     name : "Dipesh",
  //     email : "dipesh@mail.com"
  //   },
  //   {
  //     id : '2',
  //     name : "Nikhilesh",
  //     email : "nikhilesh@mail.com"
  //   },
  // ];
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState("");
  
  const addContactHandler = async (contact) => {
    console.log(contact);
    setContacts([...contacts, {id: v4(), ...contact}]);
    /* ------ Using api -------
    const request = { id: v4(), ...contact }
    const response = await api.post('/contacts', request);
    setContacts([...contacts, response.data]);
    */
  };
  const updateContactHandler = async (contact) => {
    const updatedContacts = contacts.map((c) => (c.id === contact.id ? { ...c, ...contact } : c));
    setContacts(updatedContacts);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedContacts));
    /* ------ Using api -------
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data
    setContacts(contacts.map((contact) => {
      return contact.id === id ? {...response.data} : contact
    }))
    */
  };
  
  const removeContactHandler = async (id) => {
    /* ------ Using api -------
     await api.delete(`/contacts/${id}`);
    */
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  }
  
  const searchHandler = (searchTerm) => {
    // console.log(searchTerm);
    setSearchTerm(searchTerm);
    if (searchTerm !== ""){
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    }
    else{
      setSearchResults(contacts);
    }
  };

  /* ------ Using api -------
  // Retrive Contacts
  const retriveContacts = async() => {
    const response = await api.get("/contacts")
    return response.data;
  }
  */
  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // console.log(retriveContacts);
    if (retriveContacts) setContacts(retriveContacts);
    /* ------ Using api -------
    const getAllContacts = async () => {
      const allContacts =await retriveContacts();
      if (allContacts) setContacts(allContacts);
    }
    getAllContacts();
    */
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);
  
  return (
    <div>
      <BrowserRouter>
          <Header />
          <div className='ui container'>
            <Routes>
              <Route path='/' exact element={ <ContactList contacts={searchTerm.length < 1 ? contacts : searchResults} term={searchTerm} searchKeyword={ searchHandler } /> } />
              <Route path='/add' element={ <AddContact addContactHandler={addContactHandler} /> } />
              <Route path='/edit/:id' element={ <EditContact updateContactHandler={updateContactHandler} /> } />
              <Route path='/delete/:id' element={ <DeleteContact contacts={contacts} getContactId={removeContactHandler} /> } />
              <Route path='/contact/:id' Component={ ContactDetail }/>
              <Route path='/*' element={ <NotFound /> }/>
            </Routes>
            
            {/* <ContactList contacts={contacts} getContactId = {removeContactHandler}/> */}
            {/* <AddContact addContactHandler={addContactHandler} /> */}
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
