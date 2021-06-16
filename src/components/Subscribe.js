import React, { useState } from "react";
import '../css/Subscribe.css';
import { InputBase, makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    emailInput: {
        background: "#d0c1d4",
        borderRadius: theme.shape.borderRadius,
        width: "450px",
        height: "56px",
        padding: theme.spacing(2),
        textOverflow: 'ellipsis',
        fontSize: 28
    },
    referralInput: {
        background: "#d0c1d4",
        borderRadius: theme.shape.borderRadius,
        width: "250px",
        height: "56px",
        padding: theme.spacing(2),
        textOverflow: 'ellipsis',
        fontSize: 28
    }
}));

function Subscribe(props) {
    const classes = useStyles();
    const [emailString, setEmailString] = useState("");
    const [referralString, setReferralString] = useState("");
    const [generatedReferralCode, setGeneratedReferralCode] = useState("");

    var referralCodeOutputString = "";

    function generateReferralCode() {
        // Makes certain a unique email is used for each submission, and that all email strings are of a length > 0
        if(props.influencersByEmail.get(emailString) == null && emailString.length > 0 && emailString.length < 25) { 

            // Arbitrary hard-coded referral code string length; while not a perfect implementation by far, it provides 9.22393263E+14 permutations
            // The likelihood of getting trapped in a loop while attempting to generate referral codes is statistically impossible & serves our ends for this challenge
            var referralCode = generateString(10); 
            // Check if that referral code has been used yet
            if(props.influencersByReferral.get(referralCode) == null) {
                var influencer;
                // Check if the referral code refers to a real user. If it does, add the subscribing user to their list of referrals
                // Since we already check for unique emails at subscription time, we'll always have unique referral lists for each influencer
                if(props.influencersByReferral.get(referralString) != null) {
                    influencer = props.influencersByReferral.get(referralString); // Get referrer for the new subscriber
                    influencer.referrals.push(emailString); // Add an email to array of referred emails
                    influencer.referralCount++;             // we iterate the initial referrer here as it won't be counted in the while loop
                    updateInfluencerByReferral(influencer); // update influencer hash set data
            
                    // Climb up the chain of referrers, iterating each one's referral count as we go.
                    while(influencer.referrer != null) {
                        influencer = props.influencersByReferral.get(influencer.referrer);
                        influencer.referralCount++; 
                    }
                    
                    updateInfluencerByReferral(influencer); // Update proto-influencer

                    // Now that we have the proto-influencer, we can check their total referrals against the biggest influencer
                    if(props.biggestInfluencer.referralCount < influencer.referralCount) {
                        // update biggest influencer if this influencer has a higher referral count than the other
                        props.setBiggestInfluencer("");
                        props.setBiggestInfluencer({email: influencer.email, referral: referralCode, 
                            referrer: null, referralCount: influencer.referralCount, referrals: []}); 
                    }
                    // Finally, create influencer object based on the user input (with a referrer)
                    influencer = {email: emailString, referral: referralCode, referrer: referralString, referralCount: 0, referrals: []};   
                       // create influencer object without a referrer 
                } else influencer = {email: emailString, referral: referralCode, referrer: null, referralCount: 0, referrals: []};  
                     
                updateInfluencerByReferral(influencer);

                var map = props.influencersByEmail;
                map.set(emailString, influencer)
                props.setInfluencersByEmail(map); // Add influencer to hashmap

                setGeneratedReferralCode("The unique referral code for " + emailString + " is " + referralCode);  // Show the end user their generated referral code

            } else generateReferralCode(); // Recursive loop until a unique referral code is generated
        }
    }

    function updateInfluencerByReferral(influencer) {
        var map = props.influencersByReferral; 
        map.set(influencer.referral, influencer)
        props.setInfluencersByReferral(map); // Update influencer object in hashmap
        return;
    }

    function generateString(length) {
        var string = "";
        var chars = "abcdefghijklmnopqrstuvwxyz0123456789"; // 36 possible characters
        
        for (var i = 0; i < length; i++) 
            string += chars.charAt(Math.floor(Math.random() * chars.length));

        return string;
    }

    return (
        <div className="body-subscribe">
            <h1>Subscribe</h1>
            <div className="description-wrapper">
                <b>Required: </b> enter email
            </div>
            <form noValidate autoComplete="off">
                <InputBase id="outlined-basic" label="Outlined" variant="outlined" className = {classes.emailInput} placeholder='Email' 
                value={emailString} onChange={event => setEmailString(event.target.value)}/>
                <br/>
                <br/>
                <div className="description-wrapper">
                    <b>Optional: </b> enter referral code
                </div>
                <InputBase id="outlined-basic" label="Outlined" variant="outlined" className = {classes.referralInput} placeholder='Referral code'
                value={referralString} onChange={event => setReferralString(event.target.value)}/>

                <div className="submit-button">
                <Button variant="contained" color="#d0c1d4" onClick={generateReferralCode}>
                    <b>Subscribe</b>
                </Button>
                </div>
                <br/>
                <br/>
                <h3>{referralCodeOutputString} {generatedReferralCode}</h3>
            </form>
        </div>
    );
}
export default Subscribe;