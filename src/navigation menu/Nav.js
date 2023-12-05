import "./Nav.css"
import {useState} from "react";

function Nav(props : {handleActive : Function}) {
    const [active_tab, setActiveTab] = useState(0)

    const onClick = (value) => {
        setActiveTab(value);
        props.handleActive(value)
    }

    return(
        <div className="nav-menu">
            <ul>
                <li><button className={active_tab === 0 ? "active" : ""} onClick={() => {onClick(0)}}>Карта Калуги</button></li>
                <li><button className={active_tab === 1 ? "active" : ""} onClick={() => {onClick(1)}}>Карта России</button></li>
                <li><button className={active_tab === 2 ? "active" : ""} onClick={() => {onClick(2)}}>Графики</button></li>
            </ul>
        </div>
    )
}

export default Nav;
