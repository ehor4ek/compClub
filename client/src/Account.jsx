import { useEffect, useState } from "react";
import axios from 'axios';
import getUrl from './getUrl';
import Cookies from 'universal-cookie';
import Car from "./Car";
import search from "./Search";

export default function Account() {
    const cookies = new Cookies(null, { path: '/' });
    var client = cookies.get('client');
    const [logText, setLog] = useState('');
    const [btnsText, setBtns] = useState('');
    const [carsObj, setCars] = useState([]);
    const [cars, setData] = useState([]);
    var re = /^[\+][\d\ ]{10,15}\d$/;
    function clientSave(event) {
        event.preventDefault();
        var f = document.getElementById('client');
        console.log(f);
        var i = f.getElementsByTagName('input');
        if (re.test(i[1].value) || i[i].value == '') {
            var data = {
                "name": i[0].value,
                "phone": i[1].value
            };
            if (data['name'] == '') data['name'] = client.name;
            if (data['phone'] == '') data['phone'] = client.phone;
            axios.put(getUrl(`/api/client/${client.id}/`), data)
            .then(function (response) {
                console.log(response.data);
                if (response.status == 200) {
                    setLog("Данные сохранены");
                }
                var cl = response.data;
                cl['login'] = i[0].value;
                cl['password'] = i[1].value;
                cookies.set("client", response.data, { path: '/' });
            })
            .catch(function (error) {
                console.log(error);
                setLog("Что-то пошло не так");
                });
        } else {
            setLog("Указан неверный формат номера телефона");
        }
    }

    function logOut() {
        cookies.remove('client', { path: '/' });
        document.location.href = '/autorize';
    }

    function delAccount() {
        axios.delete(getUrl(`/api/client/${client.id}/`))
            .then(function (response) {
                console.log(response.data);
                if (response.status == 204) {
                    setBtns("Аккаунт удалён");
                    cookies.remove('client', { path: '/' });
                    document.location.href = '/autorize';
                } else setBtns("Что-то пошло не так");
            })
            .catch(function (error) {
                console.log(error);
                setLog("Что-то пошло не так");
            });
    }

    useEffect(() => {
        axios.get(getUrl(`/api/auto/byclient/${client.id}/`))
        .then(function (response) {
            if (response.status == 200) {
                setData(response.data);
                setCars(response.data.map((item, index) => (<Car data={item} key={index}/>)));
            }
            // var cl = response.data;
            // cl['login'] = i[0].value;
            // cl['password'] = i[1].value;
            // cookies.set("client", response.data, { path: '/' });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    , []);

    function addCar(event) {
        event.preventDefault();
        var input = event.target.getElementsByTagName('input')[0];
        var newCar = {
            'model': input.value,
            'tarif': null,
            'place': null,
            'owner': client.id,
        };

        axios.post(getUrl(`/api/auto/`), newCar)
        .then(function (response) {
            if (response.status == 201) {
                window.scroll(0, 500);
                window.location.reload();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    // function search(event, obj, fields, f) {
    //     var v = event.target.previousSibling.value.toString().toLowerCase();
    //     var newObj = '';
    //     if (v != undefined)
    //         newObj = obj.filter((item) => {
    //             for (let i = 0; i < fields.length; i++) {
    //                 if (item[fields[i]].toString().toLowerCase().indexOf(v) >= 0)
    //                     return true;
    //             }
    //         });
    //     newObj = newObj.map((item, index) => (<option   key={item.id} id={item.id}> {fields.length > 1 ? item[fields[1]] : ''} {item[fields[0]]}</option>));
    //     f(newObj);
    // }
    
    return(
        <div className="account">
            <div className="account_inner">
                <div className="account_data">
                    <div className="client">
                        <form name="client" id="client" onSubmit={(event) => clientSave(event)}>
                            <div className="form_line">
                                <span>Имя: {client.name}</span> <input type="text" required placeholder="Новое имя"/>
                            </div>
                            <div className="form_line">
                                <span>Телефон: {client.phone}</span> <input type="tel" required placeholder="Новый телефон"/>
                            </div>
                            <div className="form_line">
                                <input type="submit" value="Сохранить"/> <span> {logText} </span>
                            </div>
                        </form>
                    </div>
                    <div className="car_adder car_block client">
                        <div className="car_changer">
                            <div className="form_data">
                                <div className="car_adder_h">Выберите машину для поиска</div>
                                <div className="places_search form_search_line">
                                    <input type="text" placeholder="Поиск" name="car_search"/>
                                    <img src="search.png" alt="search" onClick={(event) => search(event, cars, ['model'], setCars)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="places">
                        {carsObj}
                    </div>
                    <div className="car_adder car_block client">
                        <div className="car_adder_h">
                            Добавьте новое авто
                        </div>
                        <form className="car_adder" onSubmit={(event) => addCar(event)}>
                            <input type="text" placeholder="Машина"/>
                            <input type="submit" value="Добавить"/>
                        </form>
                    </div> 
                </div>
                <div className="account_btns">
                    <span onClick={logOut}>Выйти</span> 
                    <span onClick={delAccount}>Удалить аккаунт</span>
                    <div>{btnsText}</div>
                </div>
            </div>
        </div>
    );
}