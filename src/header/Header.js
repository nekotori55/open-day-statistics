import './Header.css'
import bmstuLogo from '../icons/logo.png'

function Header() {
    return (
        <header>
            <div className="logo">
                <div className="logo-image">
                    <img src={bmstuLogo} alt="Logo"/>
                </div>
                <span className="logo-text">
                    <div className="logo-suptitle">Калужский филиал</div>
                    <div className="logo-title">МГТУ имени Н.Э. Баумана</div>
                </span>
            </div>

            <div className="faculty">
                <div className="faculty-name">Информатика и управление</div>
                <div className="department-name">Программное обеспечение ЭВМ, информационные технологии</div>
            </div>
        </header>
    )
}

export default Header;
