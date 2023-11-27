import "./Select.css"
import {useState} from "react";

function Select(props) {

    const [value , setValue] = useState('');

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const compare = (item) => {
        const searchText = value.toLowerCase();
        const searchData = item.region.toLowerCase();

        return searchText && searchData.startsWith(searchText) && searchText !== searchData;
    }

    const onSelect = (selected) => {
        setValue(selected);
    }

    return(
        <div className="select">
            <input type="text" value={value} onChange={onChange} placeholder={props.placeholder}/>
            <div className="dropdown">
                {props.data.filter(compare).map((item) => (
                    <div key={item.id} className="dropdown-row" onClick={() => onSelect(item.region)}>
                        {item.region}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Select;

