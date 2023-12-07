import "./Form.css";
import "../select/Select";
import Select from "../select/Select";
import {useState} from "react";

function Form(props) {
    const [region, setRegion] = useState();
    const [district, setDistrict] = useState();
    const [school, setSchool] = useState();
    const [school_class, setClass] = useState(11)
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

    const handleClass = (event) => {
        setClass(event.target.value);
    }

    const submit = () => {
        fetch("/api/add_data/", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({region: region, district: district, school: school, school_class: school_class, withParents: withParents})
        }).then((response) => {
            console.log(response);
        });

        props.submit_callback()
    };

    return (
        <div className="form-background">
            <div className="form-title">Анкета</div>

            <Select stateHandler={handleRegion} data={props.regions} placeholder="Область"/>
            {region === "RU-KLU" ? (
                <Select stateHandler={handleDistrict} data={props.districts} placeholder="Район"/>
            ) : (
                <input className={"inactive-form-select"} placeholder={"Район"} readOnly={true}/>
            )}

            {district === "kl_kal" ? (
                <Select stateHandler={handleSchool} data={props.schools} placeholder="Школа"/>
            ) : (
                <input className={"inactive-form-select"} placeholder={"Школа"} readOnly={true}/>
            )}

            <div className="class">
                <select onInput={handleClass} value={school_class}>
                    <option value={11}>11</option>
                    <option value={10}>10</option>
                    <option value={9}>9</option>
                    <option value={8}>≤8</option>
                </select>
                <label>класс</label>
            </div>

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
