import React, { useState, useEffect } from "react";
import axios from "axios";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function Test() {

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        getTeams();
    }, []);

    const getTeams = async () => {
        await axios.get("http://localhost:5000/users/allteams")
            .then((res) => {
                setTeams(res.data)
            })
            .catch( error => console.log(error));
    }

    return (
        <>
            <h1>Test</h1>
            <Autocomplete
            id="combo-box-demo"
            options={teams}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Select a team" variant="outlined" />}
            /> 
        </>
    );
}
