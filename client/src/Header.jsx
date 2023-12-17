import { HashLink as Link } from "react-router-hash-link";
import getUrl from "./getUrl";

export default function Header() {
    return (
        <header>
            <div className="header_text">
            <a href="/" className="headerlogo"><img src="iconlogo.jpg" alt="logo" /></a>
                <h1><a href="/">Автостоянки Москвы</a></h1>
                <div className="header_links">
                    {/* <div className="dropdown">
                        <span>Парковки</span>
                        {/* <div className="dropdown-content">
                            <p>метро Смоленская</p>
                            <p>метро Нижегородская</p>
                            <p>метро ЦСКА</p>
                        </div> */}

                    {/* <div className="dropdown">
                        <a href="/rent">Аренда</a>
                        <div className="dropdown-content">
                            <p>Содержимое выпадающего текста 2</p>
                        </div>
                    </div> */}

                    <div className="dropdown">
                        <a href="/autorize">Вход для клиента</a>
                        {/* <div className="dropdown-content">
                            <p>Содержимое выпадающего текста 2</p>
                        </div> */}
                    </div>

                    <div className="dropdown">
                        <a href={getUrl('/admin')}>Вход для сотрудника</a>
                        {/* <div className="dropdown-content">
                            <p>Содержимое выпадающего текста 2</p>
                        </div> */}
                    </div>

                    <div className="dropdown">
                        <Link to="/#contacts">Контакты</Link>
                        {/* <div className="dropdown-content">
                            <p>Содержимое выпадающего текста 2</p>
                        </div> */}
                    </div>
                </div>
            </div>
        </header>
    );
}