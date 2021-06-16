import React from "react";
import '../css/BiggestInfluencer.css';

function BiggestInfluencer(props) {
    return (
        <div className="body-biggestinfluencer">
            <h1>Biggest Influencer</h1>
            <br/>
            <div className = "centerText">
                <b>{props.biggestInfluencer.email}</b>
            </div>
        </div>
    );
}
export default BiggestInfluencer;