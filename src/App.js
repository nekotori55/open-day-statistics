import './App.css';
import React from "react";
import {useState} from 'react';
import PrettyMap from "./map/PrettyMap";

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import KalugaOblastSVG from "./map/KlgMap";
import LeadersTable from "./table/LeadersTable"; // Optional theme CSS


const rowDataA = [
    {id: 'kl_26', region: 'Обнинск', count: 1},
    {id: 'kl_25', region: 'Калуга', count: 2},
    {id: 'kl_4', region: 'Киров', count: 0},
];

const rowDataB = [
    {id: 'kl_26', region: 'Обнинск', count: 1},
    {id: 'kl_25', region: 'Калуга', count: 5},
    {id: 'kl_4', region: 'Киров', count: 3},
];


function App() {
    const [crowData, setCrowData] = useState(rowDataA);

    const map_id = 'kal_map'
    return (
        <div className="App">
            <div className="Map-container">
                <PrettyMap data={crowData} childId={map_id} key={crowData}>
                    <KalugaOblastSVG id={map_id}/>
                </PrettyMap>
            </div>

            <div className="Leaders-table-container">
                <LeadersTable rowData={crowData}/>
            </div>
        </div>
    );
}

export default App;