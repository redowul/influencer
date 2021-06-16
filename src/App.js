import './App.css';
import Subscribe from "./components/Subscribe.js";
import BiggestInfluencer from "./components/BiggestInfluencer.js";
import InfluencerData from "./components/InfluencerData.js";
import hashmap from 'hashmap';
import React, { useState } from "react";

function App() {
  // Since we are limited by the lack of a database for easy data retrieval, here we make up for that by the use of two mirrored hashmaps.
  // influencersByReferral is used to check against existing hashes to avoid duplicates. This ensures unique referral codes for all emails.
  // influencersByEmail is used to easily search for referral data by email.
  const [influencersByReferral, setInfluencersByReferral] = useState(new hashmap()); // key: referralCode, value: influencer object
  const [influencersByEmail, setInfluencersByEmail] = useState(new hashmap());       // key: email,        value: influencer object
  
  const [biggestInfluencer, setBiggestInfluencer] = useState({email: "", referral: null, referrer: null, referralCount: 0, referrals: []});

  return (
    <div className="container">
      <div className="left-element">
        <Subscribe 
        influencersByReferral = {influencersByReferral} setInfluencersByReferral = {setInfluencersByReferral}
        influencersByEmail = {influencersByEmail} setInfluencersByEmail = {setInfluencersByEmail}
        biggestInfluencer = {biggestInfluencer} setBiggestInfluencer = {setBiggestInfluencer}/>
        <BiggestInfluencer 
        biggestInfluencer = {biggestInfluencer}/>
      </div>
      <div className="right-element">
        <InfluencerData 
        influencersByReferral = {influencersByReferral}
        influencersByEmail = {influencersByEmail}/>
      </div>
    </div>
  );
}

export default App;