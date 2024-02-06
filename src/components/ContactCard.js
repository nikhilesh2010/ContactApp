import React from "react";
import user from "../images/user.png";
import { Link } from "react-router-dom";

const ContactCard = (props) => {
    const {id, name, email, phone} = props.contact
    let detail = props.contact
    // console.log(detail)

    return (
        <div className="item">
            <img className="ui avatar image" src={user} alt="user"></img>
            <div className="content" >
                <Link to={`/contact/${id}`} state={{ contact: detail }} >
                    <div className="header"><h3>{name}</h3></div>
                    <div><b>Mail:</b>&nbsp;{email}</div>
                    <div><b>Phone:</b>&nbsp;{phone}</div>
                </Link>
            </div>
            <Link to={`/delete/${id}`} state={{contact: detail}}>
                <i 
                    className="trash alternate outline icon"
                    style={{color: "red", float: "right", marginTop:"2rem", cursor:"pointer"}}
                      
                >
                </i>
            </Link>
            <Link to={`/edit/${id}`} state={{contact: detail}}>
                <i 
                    className="edit alternate outline icon"
                    style={{color: "blue", float: "right", marginRight:"2rem", marginTop:"2rem", cursor:"pointer", paddingLeft: "2rem"}}
                >
                </i>
            </Link>
        </div>
    );
};

export default ContactCard;