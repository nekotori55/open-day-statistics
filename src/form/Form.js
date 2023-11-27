import './Form.css'
import '../select/Select'
import Select from "../select/Select";

function Form(props) {
    return (
        <div className="form-background">
            <div className="form-title">Анкета</div>

            <Select data={props.regions} placeholder="Область"/>
            <Select data={props.districts} placeholder="Район"/>
            <Select data={props.schools} placeholder="Школа"/>

            <label className="parents-check">
                <input type="checkbox" name="parents"/>
                <span className="fake-checkbox"></span>
                <span className="checkbox-label">Приехал с родителями?</span>
            </label>

            <button type="submit" className="form-button">Отправить</button>
        </div>
    )
}

export default Form;
