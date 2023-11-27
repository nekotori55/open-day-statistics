import './Form.css'
import '../select/Select'
import Select from "../select/Select";
import {useState} from "react";

function Form(props) {
    const [region, setRegion] = useState('');
    const [district, setDistrict] = useState('');
    const [school, setSchool] = useState('');
    const [withParents, setParents] = useState();

    const handleRegion = (newRegion) => {
        setRegion(newRegion);
    }

    const handleDistrict = (newDistrict) => {
        setDistrict(newDistrict);
    }

    const handleSchool = (newSchool) => {
        setSchool(newSchool)
    }

    const handleParents = () => {
        setParents(!withParents)
    }

    const submit = () => {
        let regionID = props.regions.find(item => item.region === region);
        let districtID = props.districts.find(item => item.region === region);
        let schoolID = props.schools.find(item => item.region === region);
        fetch('/api/add_data/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ region: regionID, district: districtID, school: schoolID }),
        });
    }

    return (
        <div className="form-background">
            <div className="form-title">Анкета</div>

            <Select stateHandler={handleRegion} data={props.regions} placeholder="Область"/>
            {region === "Калужская" ? (
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
    )
}

export default Form;
