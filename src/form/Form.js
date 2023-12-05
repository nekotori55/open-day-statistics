import "./Form.css";
import "../select/Select";
import Select from "../select/Select";
import {useState} from "react";

function Form(props) {
    const [region, setRegion] = useState("");
    const [district, setDistrict] = useState("");
    const [school, setSchool] = useState("");
    const [withParents, setParents] = useState();

    const handleRegion = (newRegion) => {
        setRegion(newRegion);
    };

    const handleDistrict = (newDistrict) => {
        setDistrict(newDistrict);
    };

    const handleSchool = (newSchool) => {
        setSchool(newSchool);
    };

    const handleParents = () => {
        setParents(!withParents);
    };

    const submit = () => {
        fetch("/api/add_data/", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({region: region, district: district, school: school})
        }).then((response) => {
            console.log(response);
        });

        props.submit_callback()
    };

    return (
        <div className="form-background">
            <div className="form-title">Анкета</div>

            <Select stateHandler={handleRegion} data={props.regions} placeholder="Область"/>
            {region === "Калужская область" ? (
                <Select stateHandler={handleDistrict} data={props.districts} placeholder="Район"/>
            ) : (
                <input className={"inactive-form-select"} placeholder={"Район"} readOnly={true}/>
            )}

            {district === "Калуга" ? (
                <Select stateHandler={handleSchool} data={props.schools} placeholder="Школа"/>
            ) : (
                <input className={"inactive-form-select"} placeholder={"Школа"} readOnly={true}/>
            )}

            <label className="parents-check">
                <input type="checkbox" checked={withParents} onChange={handleParents}/>
                <span className="fake-checkbox"></span>
                <span className="checkbox-label">Приехал с родителями?</span>
            </label>

            <button onClick={submit} className="form-button">Отправить</button>
        </div>
    );
}

export default Form;
