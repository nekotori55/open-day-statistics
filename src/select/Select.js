import "./Select.css"
import {useState} from "react";

function Select(props) {

    const [value , setValue] = useState('');

    const onChange = (event) => {
        setValue(event.target.value);
        props.stateHandler(event.target.value);
    }

    const compare = (item) => {
        const searchText = value.toLowerCase();
        const searchData = item.name.toLowerCase();

        return searchText && searchData.includes(searchText) && searchText !== searchData;
    }

    const onSelect = (selected) => {
        setValue(selected.name);
        props.stateHandler(selected.id);
    }

    return(
        <div className="select">
            <input type="text" value={value} onChange={onChange} placeholder={props.placeholder}/>
            <div className="dropdown">
                {props.data.filter(compare).slice(0, 5).map((item) => (
                    <div key={item.id} className="dropdown-row" onClick={() => onSelect(item)}>
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Select;

