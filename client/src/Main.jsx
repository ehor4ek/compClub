import Benefits from './Benefits';
import Cookies from 'universal-cookie';

export default function Main() {
    var cookies = new Cookies(null, { path: '/' });
    function rent() {
        document.location.href = '/autorize';
    }
    return (
    // <div className="main">
    //     {/* <button className="button" onClick = "document.location.href= 'clientp.html'">Арендовать парковочное место</button> */}
    //     {/* <a className="button" href="autorize">Арендовать парковочное место</a> */}
    //     <div className="three_right">
    //         <div className="right_inner0">
    //             <div className="right_inner">
    //                 <div className="right_inner2"></div>
    //                 <div className="right_inner20"></div>
    //                 <div className="right_inner21"></div>
    //                 <div className="right_inner22"></div>
    //                     <span onClick={rent} className="right_inner3">
    //                         Арендовать <br />
    //                         парковочное <br />
    //                         место
    //                     </span>
    //             </div>
    //         </div>
    //     </div>
    //     <h1 className='slider_h'>Наша парковка около метро - это удобно, быстро и безопасно!</h1>
    //     <Benefits />
    //     <div className="container">
    //         {/* <div className="content">
    //             <h1>Наша парковка около метро - это удобно, быстро и безопасно!</h1>
    //             <p>Она расположена всего в нескольких шагах от станций метро Смоленская, Нижегородская и ЦСКА, что позволяет вам сэкономить время и избежать лишних затрат на поиск места для парковки. Мы предлагаем широкий выбор парковочных мест, чтобы удовлетворить потребности каждого клиента.
    //                 Кроме того, мы обеспечиваем высокий уровень безопасности нашей парковки. Наши сотрудники круглосуточно следят за безопасностью и порядком на территории парковки. Вы можете быть уверены, что ваш автомобиль будет защищен от кражи и повреждений.
    //                 Мы также предоставляем дополнительные услуги. Мы предлагаем Вам зарядные устройства для электромобилей и возможность оплаты парковки через мобильное приложение.
    //                 Выбирая нашу парковку, вы получаете надежность, безопасность и комфорт. Приходите к нам и убедитесь сами!</p>
    //         </div> */}
    //     </div>
    //     <div className="contacts" id="contacts">
    //         <div className="contacts_info">
    //             <h1>Контакты</h1>
    //             <div className="contacts_places">
    //                 <ol>
    //                     <span>Парковки:</span>
    //                     <li className="contacts_place">Парковка на Смоленской</li>
    //                     <li className="contacts_place">Парковка Авиапарк</li>
    //                     <li className="contacts_place">Парковка Нижегородская</li>
    //                 </ol>
    //             </div>
    //             <div className="contacts_main">
    //                 <div className="contacts_item"><span className="contacts_h">Часы работы Call-центра: </span><span className="contacts_text">10:00-21:00, Пн-Пт</span></div>
    //                 <div className="contacts_item"><span className="contacts_h">Телефон: </span><span className="contacts_text"><a href="tel:+79999999999">+79999999999</a></span></div>
    //                 <div className="contacts_item"><span className="contacts_h">E-mail: </span><span className="contacts_text"><a href="mailto:parkovki@gmail.com">parkovki@gmail.com</a> </span></div>
    //             </div>
    //         </div>
    //         <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab8f79ed37fe79b1aa9cc90e3b920d0c0d7a1bd2ba43c187e7254a4f2c23d0ef7&amp;source=constructor" width="100%" height="400" frameborder="0"></iframe>        </div>
    //     {/* <button className="button" onClick = "document.location.href= 'sellMenu.html'">Вход для сотрудника</button> */}
    //     {/* <a className="button" href="/login">Вход для сотрудника</a> */}
    // </div>
    <div className="main">
        <div className="first">
            <div className="first_inner">
                <div className="first_h">Бронируй устройство, пока есть места!</div>
                <a href="" className="first_a">Забронировать</a>
            </div>
        </div>
    </div>
    );
}