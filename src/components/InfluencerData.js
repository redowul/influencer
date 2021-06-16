import React, { useState } from "react";
import '../css/InfluencerData.css';
import { InputBase, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    emailInput: {
        background: "#a5a972",
        borderRadius: theme.shape.borderRadius,
        width: "450px",
        height: "56px",
        padding: theme.spacing(2),
        textOverflow: 'ellipsis',
        fontSize: 28
    }
}));

function InfluencerData(props) {
    const classes = useStyles();
    const [emailString, setEmailString] = useState("");

    const [referralCount, setReferralCount] = useState("");
    const [referrer, setReferrer] = useState("");
    const [referrals, setEmailsReferred] = useState("");

    function setData(value) {
        setEmailString(value);
        var map = props.influencersByEmail;

        if(map.get(value) != null) {
            if(map.get(value) != null) {
                setReferralCount(map.get(value).referralCount);
                if(map.get(value).referrer != null) {
                    var referrerMap = props.influencersByReferral;
                    var referrer = map.get(value).referrer
                    setReferrer(referrerMap.get(referrer).email);
                }
                else {
                    setReferrer("N/A");
                }
                var arrayStringified = "";
                for(var i = 0; i < map.get(value).referrals.length; i++) {
                    arrayStringified = arrayStringified + map.get(value).referrals[i] + ", " 
                }
                arrayStringified = arrayStringified.replace(/,\s*$/, "");
                setEmailsReferred(arrayStringified);
            }
        }
        else {
            setReferralCount("");
            setReferrer("");
            setEmailsReferred("");
        }
    }

    return (
        <div className="body-influencerdata">
            <h1>Get Influencer Data</h1>
            <InputBase id="outlined-basic" label="Outlined" variant="outlined" className = {classes.emailInput} placeholder='Email' 
                value={emailString} onChange={event => setData(event.target.value)} />
            <br/>
            <br/>
            <div className="descriptors">
                <b>Referral count:</b> {referralCount}
                <br/>
                <b>Referrer:</b> {referrer}
                <br/>
                <b>Emails referred by this influencer:</b> {referrals}
            </div>
        </div>
    );
}
export default InfluencerData;