import { Link, useLocation } from 'react-router-dom';

const DeleteContact = (props) => {
    const { name } = props.contacts;
    const { state } = useLocation();
    // console.log(props);
    // console.log(state);
    return (
        <div>
            <h5>Are you sure to delete {name} Contact?</h5>
            <div className="ui container">
                <Link to='/'>
                    <button className="ui button blue" onClick={() => props.getContactId(state.contact.id)}>Yes</button>
                </Link>
                <Link to='/'>
                    <button className="ui button blue">No</button>
                </Link>
            </div>
        </div>
    )
};

export default DeleteContact;