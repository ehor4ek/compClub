
export default function Footer() {
    return(
        <footer>
            {/* <div className="footer_inner">
                <div className="footer_item">
                    <div className="footer_h">ссылки</div>
                    <div className="footer_icons">
                        <a href="" className="footer_icon"></a>
                        <a href="" className="footer_icon"></a>
                    </div>
                </div>
                <div className="footer_item">
                    <div className="footer_h">наши контакты</div>
                    <a href="tel:+7800888888" className="footer_link">
                        <div className="footer_imga tel"></div>
                        <div className="footer_texta">+7(999)999-99-99</div>
                    </a>
                    <a href="mailto:parkovki@gmail.com" className="footer_link">
                        <div className="footer_imga mail"></div>
                        <div className="footer_texta">parkovki@gmail.com</div>
                    </a>
                </div>
                <div className="footer_item">
                    <div className="footer_h">Информация</div>
                    <a href="/#contacts">Контакты</a>
                </div>
            </div>
            <div className="copyright">
            Все права защищены ©️ <br />
            2023
            </div> */}
            <div className="footer_inner">
                <div className="links">
                    <div className="links_block">
                        <div className="links_h">Соцсети</div>
                        <div className="links_main">
                            <a href="">Instagram: @compClub</a>
                            <a href="">Telegram: @compClub</a>
                        </div>
                    </div>
                    <div className="links_block">
                        <div className="links_h">Ссылки</div>
                        <div className="links_main">
                            <a href="/">Главная</a>
                            <a href="/contacts">Контакты</a>
                            <a href="/actions">Акции</a>
                            <a href="/autorize">Вход</a>
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    Все права защищены ©️ <br />
                    2023
                </div>
            </div>
        </footer>
    );
} 