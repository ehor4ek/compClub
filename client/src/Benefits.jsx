import { useState } from "react";
import Slide from './Slide.jsx';

const text = `Она расположена всего в нескольких шагах от станций метро Смоленская, Нижегородская и ЦСКА, что позволяет вам сэкономить время и избежать лишних затрат на поиск места для парковки. Мы предлагаем широкий выбор парковочных мест, чтобы удовлетворить потребности каждого клиента.
    Кроме того, мы обеспечиваем высокий уровень безопасности нашей парковки. Наши сотрудники круглосуточно следят за безопасностью и порядком на территории парковки. Вы можете быть уверены, что ваш автомобиль будет защищен от кражи и повреждений.
    Мы также предоставляем дополнительные услуги. Мы предлагаем Вам зарядные устройства для электромобилей и возможность оплаты парковки через мобильное приложение.
    Выбирая нашу парковку, вы получаете надежность, безопасность и комфорт. Приходите к нам и убедитесь сами!`;
const lines = text.split("\n");
const items = lines.map((t, index) => (<Slide key={index} num={index} content={t} />));

export default function Benefits() {
    const [n, setN] = useState(0);
    const [leftItems, setLeft] = useState([]);
    const [rightItems, setRight] = useState([]);
    const [sliderStyle, setStyle] = useState({opacity: 1,});
    const [styleL, setStyleL] = useState({left: '-100%',});
    const [styleR, setStyleR] = useState({left: '0',});

    function clear () {
        setStyle({opacity: 1,});
        setLeft([]);
        setRight([]);
        setStyleL({left: '-100%',});
        setStyleR({left: '0',});
    }

    function next() {
        let arr = ['', items[n]];
        if (n + 1 >= items.length)  {
            arr[0] = items[0];
            setN(0);
        }
        else {
            arr[0] = items[n + 1];
            setN(n + 1);            
        }
        setStyle({opacity: 0,});
        setLeft(arr);
        setStyleL({left: 0,});
        setTimeout(clear, 700);
    }

    function prev () {
        let arr = [items[n], ''];
        if (n - 1 < 0) {
            arr[1] = items[items.length - 1];
            setN(items.length - 1);
        }

        else {
            arr[1] = items[n - 1];
            setN(n - 1);
        }
        setRight(arr);
        setStyle({opacity: 0,});
        setStyleR({left: '-100%',});
        setTimeout(clear, 700);
    }
    // items = document.getElementsByClassName('benefits_item');
    // slider = document.getElementsByClassName('benefits_slider')[0];
    // anim = document.getElementsByClassName('benefits_anim')[0];
    return(
        <div className="benefits">
            <div className="benefits_prev" onClick={prev}>←</div>
            <div className="benefits_inner">
                <div className="benefits_left" style={styleL}>{leftItems}</div>
                <div className="benefits_slider" style={sliderStyle}>
                    {items[n]}
                </div>
                <div className="benefits_right" style={styleR}>{rightItems}</div>    
            </div>
            <div className="benefits_next" onClick={next}>→</div>
        </div>
    );
}