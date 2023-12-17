import { useEffect } from "react";
import getUrl from "./getUrl";
import axios from "axios";
import { useState } from "react";
import NativeSelect from '@mui/material/NativeSelect';

export default function(props) {
    const [tariff, setTariff] = useState('');
    const [place, setPlace] = useState('');
    const [parking, setParking] = useState('');
    const [infoApp, setInfo] = useState({display: 'flex', });
    const [carApp, setCar] = useState({display: 'block', });
    var l = false;
    var data = props.data;
    const [tarifObj, setTarifObj] = useState([]);
    const [parkObj, setParkObj] = useState([]);
    const [plObj, setPlObj] = useState([]); 
    const [tarifs, setTarifs] = useState([]);
    const [park, setPark] = useState([]);
    const [pl, setPl] = useState([]);
    // const [selectedTarifs, setSelTarifs] = useState(''); 
    // const [selectedPark, setSelPark] = useState(''); 
    // const [selectedPl, setSelPl] = useState(''); 
    useEffect(() => {
        if (data.tarif && data.place) {
            axios.get(getUrl(`/api/tariff/${data.tarif}/`))
            .then(function (response) {
                if (response.status == 200) {
                    setTariff(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

            var n = 1;

            axios.get(getUrl(`/api/palce/${data.place}/`))
            .then(function (response) {
                if (response.status == 200) {
                    setPlace(response.data);
                    n = response.data.parking;
                }
            })
            .catch(function (error) {
                console.log(error);
                setInfo({display: 'none',});
            });

            axios.get(getUrl(`/api/parking/${n}/`))
            .then(function (response) {
                if (response.status == 200) {
                    setParking(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        } else {
            setInfo({display: 'none',});
        }

        axios.get(getUrl(`/api/tariff/`))
            .then(function (response) {
                var tarifs;
                if (response.status == 200) {
                    setTarifObj(response.data);
                    tarifs = response.data.map((item, index) => (<option   key={item.id} id={item.id} index={index}>{item.price} {item.description}</option>));
                    setTarifs(tarifs);
                }
            })
            .catch(function (error) {
                console.log(error);
                setInfo({display: 'none',});
        });

        axios.get(getUrl(`/api/parking/`))
            .then(function (response) {
                var park;
                if (response.status == 200) {
                    setParkObj(response.data);
                    park = response.data.map((item, index) => (<option key={item.id} id={item.id} index={index}> {item.address}</option>));
                    setPark(park);
                    setPlObj(response.data[0].free_places);
                    setPl(response.data[0].free_places.map((item, index) => (<option   key={item.id} id={item.id} index={index}>{item.number}</option>)));
                }
            })
            .catch(function (error) {
                console.log(error);
                setInfo({display: 'none',});
        });

        // axios.get(getUrl(`/api/palce/`))
        // .then(function (response) {
        //     if (response.status == 200) {
        //         setPlObj(response.data);
        //         setPl(response.data.map((item, index) => (<option   key={item.id}>{item.number}</option>)));
        //     }
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
        
    }
    , [] );

    function carDel() {
        axios.delete(getUrl(`/api/auto/${data.id}/`))
        .then(function (response) {
            if (response.status == 204) {
                setCar({display: 'none',});
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    function infoDel() {
        axios.put(getUrl(`/api/auto/${data.id}/`), {'model': data.model, 'tarif': null, 'place': null, 'owner': data.owner})
        .then(function (response) {
            if (response.status == 200) {
                setInfo({display: 'none', });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    if (l) return('');

    function changeParking(event) {
        // setSelPark(event.target.value);
        setPlObj(parkObj[event.target.selectedIndex].free_places);
        var obj = parkObj[event.target.selectedIndex].free_places.map((item, index) => (<option   key={item.id} id={item.id} index={index}>{item.number}</option>))
        setPl(obj);
        // setSelPl(obj[0]);
    }

    function search(event, obj, fields, f) {
        var v = event.target.previousSibling.value.toString().toLowerCase();
        if (v != undefined)
            obj = obj.filter((item) => {
                for (let i = 0; i < fields.length; i++) {
                    if (item[fields[i]].toString().toLowerCase().indexOf(v) >= 0)
                        return true;
                }
            });
        setPlObj(obj[0].free_places != undefined ? obj[0].free_places : []);
        if (obj[0].free_places != undefined) setPl(obj[0].free_places.map((item, index) => (<option   key={item.id} id={item.id} index={index}>{item.number}</option>)));
        else setPl('');
        obj = obj.map((item, index) => (<option key={item.id} id={item.id} index={index}> {fields.length > 1 ? item[fields[1]] : ''} {item[fields[0]]}</option>));
        f(obj);
    }

    function change(event) {
        event.preventDefault();
        var f = event.target;
        var i = f.getElementsByClassName('car_data');
        console.log(i);
        for (let k = 0; k < i.length; k++) {
            if (i[k].tagName != "INPUT") {
                var select = i[k].firstChild;
                var option = select.selectedOptions[0];
                console.log(option);
                console.log('name', select.name)
                data[select.name] = (parseInt(option.id));
            } else {
                if (i[k].value != "") data[i[k].name] = (i[k].value);
            }
        }
        console.log(data);
        axios.put(getUrl(`/api/auto/${data.id}/`), data)
        .then(function (response) {
            console.log(response.data);
            if (response.status == 200) {
                window.location.reload();
            }
        })
        .catch(function (error) {
            
        });
    }

    return(
        <div className="car" style={carApp}>
            <div className="car_block">
                <div className="car_block_text">
                    <div className="car_item">
                        <span> Машина: </span>
                        <span> {data.model} </span>
                    </div>
                </div>
                <div className="car_del">
                    <img src="/bin.png" alt="" onClick={carDel}/>
                </div>
            </div>
            <div className="car_block" style={infoApp}>
                <div className="car_block_text">
                    <div className="car_item">
                        <span>Тариф: </span>
                        <span> {tariff.description} </span>
                    </div>
                    <div className="car_item">
                        <span>Цена: </span>
                        <span>{tariff.price}</span>
                    </div>
                    <div className="car_item">
                        <span>Парковочное место: </span>
                        <span>{parking.address}: #{place.number}</span> 
                    </div>
                </div>
                <div className="car_del">
                    <img src="/bin.png" alt="" onClick={infoDel}/>
                </div>
            </div>
            {/* <form className="car_changer" id="car_changer" onSubmit={(event) => change(event)}>
                <div className="form_data">
                    <input type="text" placeholder="Новая машина"className="car_data" name="model"/> <br />
                    <div className="form_search_line">
                        <select type="text" placeholder="Новый тариф" className="car_data" value={selectedTarifs} id={selectedTarifs.index} onChange={(event) => selectChange(event, setSelTarifs)} name="tarif">
                            {tarifs}
                        </select>
                        <input type="text" placeholder="Поиск" name="tarif"/>
                        <img src="search.png" alt="search" onClick={(event) => search(event, tarifObj, ['description', 'price'], setTarifs)}/>
                    </div>
                        
                    <div className="form_search_line">
                        <select type="text" placeholder="Парковка" value={selectedPark} id={selectedPark.index} onChange={changeParking} id="park" name="parking">
                            {park}
                        </select>
                        <input type="text" placeholder="Поиск"/>
                        <img src="search.png" alt="search" onClick={(event) => search(event, parkObj, ['address'], setPark)}/>
                    </div>
                    <div className="form_search_line">
                        <select type="text" placeholder="Место" className="car_data" value={selectedPl} id={selectedPl.index} onChange={(event) => selectChange(event, setSelPl)} name="place">
                            {pl}
                        </select>
                        <input type="text" placeholder="Поиск"/>
                        <img src="search.png" alt="search" onClick={(event) => search(event, plObj, ['number'], setPl)}/>
                    </div>
                    <input type="submit" value="Изменить"/>
                </div>
            </form> */}

            <form className="car_changer" id="car_changer" onSubmit={(event) => change(event)}>
                <div className="form_data">
                    <input type="text" placeholder="Новая машина"className="car_data" name="model"/> <br />
                    <div className="form_search_line">
                        <NativeSelect type="text" placeholder="Новый тариф" className="car_data select" name="tarif">
                            {tarifs}
                        </NativeSelect>
                        <input type="text" placeholder="Поиск" name="tarif"/>
                        <img src="search.png" alt="search" onClick={(event) => search(event, tarifObj, ['description', 'price'], setTarifs)}/>
                    </div>
                        
                    <div className="form_search_line">
                        <NativeSelect type="text" placeholder="Парковка" className="select" onChange={changeParking} id="park" name="parking">
                            {park}
                        </NativeSelect>
                        <input type="text" placeholder="Поиск"/>
                        <img src="search.png" alt="search" onClick={(event) => search(event, parkObj, ['address'], setPark)}/>
                    </div>
                    <div className="form_search_line">
                        <NativeSelect type="text" placeholder="Место" className="car_data select" name="place">
                            {pl}
                        </NativeSelect>
                        <input type="text" placeholder="Поиск"/>
                        <img src="search.png" alt="search" onClick={(event) => search(event, plObj, ['number'], setPl)}/>
                    </div>
                    <input type="submit" value="Изменить"/>
                </div>
            </form>
            {/* <NativeSelect id="select" onChange={(event) => native(event)}>
                <option value="10">Ten</option>
                <option value="20">Twenty</option>
                <option value="30">Thirty</option>
            </NativeSelect> */}
        </div>
    );
}