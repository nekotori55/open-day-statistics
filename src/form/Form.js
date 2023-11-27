import './Form.css'
import '../select/Select'
import Select from "../select/Select";
import {useState} from "react";

function Form(props) {
    const [region , setRegion] = useState('');
    const [district , setDistrict] = useState('');
    const [school , setSchool] = useState('');

    const handleRegion = (newRegion) => {
        setRegion(newRegion);
    }

    const handleDistrict = (newDistrict) => {
        setDistrict(newDistrict);
    }

    const handleSchool = (newSchool) => {
        setSchool(newSchool)
    }

    return (
        <div className="form-background">
            <div className="form-title">Анкета</div>

            <Select stateHandler={handleRegion} data={props.regions} placeholder="Область"/>
            <Select stateHandler={handleDistrict} data={props.districts} placeholder="Район"/>
            <Select stateHandler={handleSchool} data={props.schools} placeholder="Школа"/>

            <label className="parents-check">
                <input type="checkbox" name="parents"/>
                <span className="fake-checkbox"></span>
                <span className="checkbox-label">Приехал с родителями?</span>
            </label>

            <button className="form-button">Отправить</button>
        </div>
    )
}

export default Form;
