import { HashLink as Link } from "react-router-hash-link";
import getUrl from "./getUrl";
import { useState } from "react";

export default function Header() {
    const [menuStyle, setMenuStyle] = useState({left: '100%',});
    const [stripe1, setStripe1] = useState({display: 'block', });
    const [stripe2, setStripe2] = useState({display: 'block', });
    const [stripe3, setStripe3] = useState({display: 'block', });
    function menu(event) {
        console.log(event.target.style, menuStyle);
        if (menuStyle.left != '0') {
            setStripe1({display: 'block', transform: 'rotate(45deg)',});
            setStripe3({display: 'none', });
            setStripe2({display: 'block', transform: 'rotate(-45deg)', marginTop: '-0.6vw',});
            setMenuStyle({left: '0',});
        } else {
            setStripe1({display: 'block', });
            setStripe2({display: 'block', });
            setMenuStyle({left: '100%',});
            setTimeout(() => setStripe3({display: 'block', }), 400);
        }
    }
    return (
        <header>
            <div className="header_inner">
                <div className="header_fix">
                    <div className="header_logo">
                        <a href="/">
                            <img src="comp.png" alt="Лого" />
                        </a>
                    </div>
                    <div className="header_stripes" onClick={(event) => menu(event)}>
                        <div className="header_stripe" style={stripe1}></div>
                        <div className="header_stripe" style={stripe2}></div>
                        <div className="header_stripe" style={stripe3}></div>
                    </div>
                </div>
                <div className="header_pos">
                <div className="header_menu" style={menuStyle}>
                        <div className="header_menu_inner">
                        <div className="menu_block">
                                <a href="/" className="menu_block_inner"><span>Главная</span></a>
                            </div>
                            <div className="menu_block">
                                <a href="/contacts" className="menu_block_inner"><span>Контакты</span></a>
                            </div>
                            <div className="menu_block">
                                <a href="/actions" className="menu_block_inner"><span>Акции</span></a>
                            </div>
                            <div className="menu_block">
                                <a href="/autorize" className="menu_block_inner">Профиль<span></span></a>
                            </div>
                            <div className="menu_block">
                                <a href={getUrl('/admin')} className="menu_block_inner"><span>Админка</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}