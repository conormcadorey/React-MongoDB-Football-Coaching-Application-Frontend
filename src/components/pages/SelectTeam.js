import React, { useState, useEffect } from "react";
import axios from "axios";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SelectTeam() {

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
            <Autocomplete
            id="combo-box-demo"
            options={teams}
            onChange={(e) => props.onChange(e.target.value)}
            style={{/* width: 300*/}}
            renderInput={(params) => <TextField {...params} label="Your team*" variant="outlined" />}
            /> 
        </>
    );
}
