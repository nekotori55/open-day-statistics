import './Form.css'

function Form() {
    return (
        <div className="form-background">
            <div className="form-title">Анкета</div>

            <input type="text" className="form-select" name="region" placeholder="Область"/>
            <input type="text" className="form-select" name="district" placeholder="Район"/>
            <input type="text" className="form-select" name="school" placeholder="Школа"/>

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
