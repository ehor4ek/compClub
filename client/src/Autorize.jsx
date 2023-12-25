import { useState } from "react";
import axios from 'axios';
import getUrl from './getUrl';
import Cookies from 'universal-cookie';

export default function Autorize() {
    const cookies = new Cookies(null, { path: '/' });
    console.log(cookies);
    // const disAnim = {opacity: 0, display: 'none', };
    // const apAnim = {opacity: 1, display: 'block', };
    const dis = {display: 'none', opacity: 0};
    const ap = {display: 'block', opacity: 1}
    const [loginStyle, setLoginStyle] = useState(ap);
    const [regStyle, setRegStyle] = useState(dis);
    const [regText, setReg] = useState('');
    const [logText, setLog] = useState('');
    var re = /^[\+][\d\ ]{10,15}\d$/;

    if (cookies.get('client') == undefined) {

        function change() {
            setLoginStyle(dis);
            setRegStyle(ap);
            // setRegStyle(ap);
            // setTimeout(500, () => {
            //     setLoginStyle(dis);
            //     setRegStyle(apAnim);
            // });
        }

        function unchange() {
            setRegStyle(dis);
            setLoginStyle(ap);
            // setLoginStyle(ap);
            // setTimeout(500, () => {
            //     setRegStyle(dis);
            //     setLoginStyle(apAnim);
            // });
        }

        function reg(event) {
            event.preventDefault();
            var f = document.getElementById('reg');
            var i = f.getElementsByTagName('input');
            if (re.test(i[3].value)) {
                var data = {
                    "name": i[2].value,
                    "phone": i[3].value
                };
                axios.post(getUrl(`/api/client/register/${i[0].value}/${i[1].value}/`), data)
                .then(function (response) {
                    console.log(response);
                    if (response.status == 201) {
                        setReg("Регистрация прошла успешно");
                        data['login'] = i[0].value;
                        data['password'] = i[1].value;
                        cookies.set("client", response.data, { path: '/' }); 
                    } else {
                        setReg(response.data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    setReg(error.response.data);
                });
            } else {
                setReg("Указан неверный формат телефона");
            }
        }

        function log(event) {
            event.preventDefault();
            var f = document.getElementById('log');
            var i = f.getElementsByTagName('input');
            axios.get(getUrl(`/api/client/login/${i[0].value}/${i[1].value}/`))
            .then(function (response) {
                console.log(response.data);
                if (response.status == 200) {
                    setLog("Вход выполнен успешно");
                } else {
                    setLog(response.data);
                }
                var cl = response.data;
                cl['login'] = i[0].value;
                cl['password'] = i[1].value;
                cookies.set("client", cl, { path: '/' });
            })
            .catch(function (error) {
                console.log(error);
                setLog(error.response.data);
                });
        }
        return (
        <div className="autorization" onSubmit={(event) => log(event)}>
            <form name="log" id="log" style={loginStyle}>
                <div className="form_inner">
                    <div className="autorization_h">Вход</div> <br />
                    <input type="text" required placeholder="Логин"/> <br />
                    <input type="password" required placeholder="Пароль"/> <br />
                    <input type="submit" value="Войти"/> <br />
                    <div className="autorization_change">
                        <span>Нет аккаунта?</span> <br />
                        <span onClick={change} className="change_btn">Регистрация</span>
                    </div>
                    <span id="">{logText}</span>
                </div>
            </form>

            <form name="reg" id="reg" onSubmit={(event) => reg(event)} style={regStyle}>
                <div className="form_inner">
                    <div className="autorization_h">Регистрация</div>
                    <input type="text" required placeholder="Логин"/>
                    <input type="password" required placeholder="Пароль"/>
                    <input type="text" required placeholder="ФИО"/>
                    <input type="tel" required placeholder="Телефон"/>
                    <input type="submit" value="Зарегестрироваться"/>
                    <div className="autorization_change">
                        <span>Есть аккаунт?</span> <br />
                        <span onClick={unchange} className="change_btn">Вход</span>
                    </div>
                    <span id="">{regText}</span>
                </div>
            </form>
        </div>
        );
    } else {
        document.location.href = '/account';
    } 
}