
export default function Contacts() {
    return (
    <div className="contacts">
        <div className="contacts_inner">
            <div className="contacts_h">
                Контакты
            </div>
            <div className="contacts_block">
                <div className="contacts_block_h">Адрес главного клуба (call-центра)</div>
                <div className="contacts_block_info">г. Москва, ул. Братьев Горожанкиных, 4</div>
            </div>
            <div className="contacts_block">
                <div className="contacts_block_h">Телефон</div>
                <div className="contacts_block_info"><a href="tel:+7923546732">+79235467321</a></div>
            </div>
            <div className="contacts_block">
                <div className="contacts_block_h">Пишите нам</div>
                <div className="contacts_block_info"><a href="mailto:compClub@gmail.com">compClub@gmail.com</a></div>
            </div>
            <div className="contacts_block">
                <div className="contacts_block_h">Телеграмм</div>
                <div className="contacts_block_info"><a href="">@compClub</a></div>
            </div>
            <div className="contacts_block">
                <div className="contacts_block_h"> Инстаграм</div>
                <div className="contacts_block_info"><a href="">@compClub</a></div>
            </div>
        </div>
        <div className="map">
            <div className="map_h">Карта главного клуба</div>
        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A1a92e5ed0802969d295bc64818cb1f2343b6c93196ada751fa51a58b42604a88&amp;source=constructor" width="100%" height="400" frameborder="0"></iframe>
        </div>
    </div>
    );
}