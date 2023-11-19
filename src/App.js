import './App.css';
import React, {useEffect} from "react";
import {useState} from 'react';
import PrettyMap from "./map/PrettyMap";

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import KalugaOblastSVG from "./map/KlgMap";
import LeadersTable from "./table/LeadersTable";
import Header from "./header/Header"; // Optional theme CSS
import Form from "./form/Form";
// import {FilterComponent} from "ag-grid-community/dist/lib/components/framework/componentTypes";


function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // fetch('/api/data/').then(resp => resp.json()).then(data1 => {
        //     setData(data1)
        // });

        function update() {
            fetch("/api/data/")
                .then(function (response) {
                    if (response.status !== 200) {
                        console.log("Looks like there was a problem. Status Code: " + response.status);
                        return;
                    }
                    response.json().then(data1 => {
                        setData(data1)
                    });
                })
                .catch(function (err) {
                    console.log("Fetch Error :-S", err);
                })
        }

        update()

        const id = setInterval(() => update()
            , 5000)
    }, [])


    const map_id = 'kal_map'
    return (
        <div className="App">
            <Header/>
            <div className="main-content">
                <div className="Leaders-table-container">
                    <LeadersTable rowData={data}/>
                </div>

                <div className="Map-container">
                    <PrettyMap data={data} childId={map_id} key={data}>
                        <KalugaOblastSVG id={map_id}/>
                    </PrettyMap>
                </div>

                <div className="form-container">
                    <Form/>
                </div>
            </div>
        </div>
    );
}

export default App;