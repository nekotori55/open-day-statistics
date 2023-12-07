import "./App.css";
import React, {useEffect} from "react";
import {useState} from "react";
import PrettyMap from "./map/PrettyMap";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";
import KalugaOblastSVG from "./map/KlgMap";
import LeadersTable from "./table/LeadersTable";
import Header from "./header/Header"; // Optional theme CSS
import Form from "./form/Form";
import Nav from "./navigation menu/Nav";
import {Charts} from "./charts/Charts";
import RussiaSVG from "./map/RuMap";

let districts = require("./districts.json")
let regions = require("./regions.json")
let schools = require("./schools.json")

// import {FilterComponent} from "ag-grid-community/dist/lib/components/framework/componentTypes";


function App() {
    const [data, setData] = useState([]);
    const [active_tab, setActiveTab] = useState(0);

    const update = () => {
        fetch("/api/get_data/")
            .then(function (response) {
                if (response.status !== 200) {
                    console.log("Looks like there was a problem. Status Code: " + response.status);
                    return;
                }
                response.json().then(data1 => {
                    setData(data1);
                });
            })
            .catch(function (err) {
                console.log("Fetch Error :-S", err);
            });
    }

    useEffect(() => {
        update();
        const id = setInterval(() => update()
            , 5000);
    }, []);

    const class_data = [
        {class: "<8", count: 12},
        {class: "9", count: 7},
        {class: "10", count: 17},
        {class: "11", count: 25},
    ];
    const renderTab = (active_tab) => {
        switch (active_tab) {
            case 0:
                return <>
                    <div className="Leaders-table-container">
                        <LeadersTable rowData={data}/>
                    </div>

                    <div className="Map-container">
                        <PrettyMap data={data} centerID={"kl_kal_dot"} childId={map_id} key={data}>
                            <KalugaOblastSVG id={map_id}/>
                        </PrettyMap>
                    </div>
                </>
            case 1:
                return <>
                    <div className="Leaders-table-container">
                        <LeadersTable rowData={data}/>
                    </div>

                    <div className="Map-container">
                        <PrettyMap data={data} centerID={"RU-KLU"} childId={map_id} key={data}>
                            <RussiaSVG id={map_id}/>
                        </PrettyMap>
                    </div>
                </>
            case 2:
                return <>
                    <Charts district_data={[]} class_data={class_data} region_data={[]}/>
                </>

        }
    }


    const map_id = "kal_map";
    return (
        <div className="App">
            <Header/>
            <div className="main-content">
                <div className="information">
                    <div className="content-header">
                        <Nav handleActive={(value) => setActiveTab(value)}/>
                        <h1>День открытых дверей</h1>
                        <div></div>
                    </div>
                    <div className="content">
                        {renderTab(active_tab)}

                    </div>
                </div>
                <input type="checkbox" id="hide-checkbox"/>
                <div className="hide-button-container">
                    <label className="hide-button" for="hide-checkbox">
                        <span className="off">❮</span>
                        <span className="on">❯</span>
                    </label>
                </div>
                <div className="form">
                    <div className="form-container">
                        <Form regions={regions} districts={districts} schools={schools} submit_callback={update}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;