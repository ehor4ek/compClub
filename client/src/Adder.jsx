// import { useEffect } from "react";
// import getUrl from "./getUrl";
// import axios from "axios";
// import { useState } from "react";
// import NativeSelect from '@mui/material/NativeSelect';
// import Cookies from "universal-cookie";

// export default function() {
//     var l = false;
//     var cookies = new Cookies(null, { path: '/' });
//     var data = cookies.get('client', { path: '/' });

//     const [serviceObj, setServiceObj] = useState([]);
//     const [clubObj, setClubObj] = useState([]);
//     const [deviceObj, setDeviceObj] = useState([]); 

//     const [services, setServices] = useState([]);
//     const [clubs, setClubs] = useState([]);
//     const [devices, setDevices] = useState([]);

//     var d;

//     function setEverything(serviceIndex, clubIndex) {
//         var ser;
//         axios.get(getUrl(`/api/service/`))
//             .then(function (response) {
//                 if (response.status == 200) {
//                     ser = response.data[serviceIndex].id;
//                     setServiceObj(response.data);
//                     var s = response.data.map((item, index) => (<option   key={item.id} id={item.id} value={item.id} index={index}>{item.name} {item.description}</option>));
//                     setServices(s);
//                     var cl;
//                     axios.get(getUrl(`/api/club/byData/${ser}/`))
//                         .then(function (response) {
//                             if (response.status == 200) {
//                                 cl = response.data[clubIndex].id;
//                                 setClubObj(response.data);
//                                 setClubs(response.data.map((item, index) => (<option   key={item.id} id={item.id} value={item.id} index={index}>{item.name} {item.address} {item.phone}</option>)));

//                                 axios.get(getUrl(`/api/device/byData/${cl}/${ser}/`))
//                                 .then(function (response) {
//                                     if (response.status == 200) {
//                                         for (let i = 0; i < response.data.length; i++) {
//                                             axios.get(getUrl(`/api/price/byData/${response.data[i].id}/${ser}/`))
//                                             .then(function (responser) {
//                                                 console.log("responser", responser.data);
//                                                 if (response.status == 200) {
//                                                     response.data[i].price = response.data;
//                                                     if (i == response.data.length - 1 && responser.data != undefined && response.data[0].id != undefined) {
//                                                         setDeviceObj(response.data);
//                                                         setDevices(response.data.map((item, index) => (<option   key={item.id} id={item.price.id} index={index} value={item.price.id}>{item.name},  {item.description}, {item.price.price} руб/час</option>)));
//                                                     }
//                                                 }
//                                             })
//                                             .catch(function (error) {
//                                                 console.log(error);
//                                             });
//                                         }
//                                     }
//                                 })
//                                 .catch(function (error) {
//                                     console.log(error);
//                                 });

                                
//                             }
//                         })
//                         .catch(function (error) {
//                             console.log(error);
//                     });

//                 }
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     }

//     useEffect(() => {
//         setEverything(0, 0, );
        
//     }
//     , [] );

//     function changeService(event) {
//         var sel = document.getElementsByClassName('order_select')[1].getElementsByTagName('select')[0];
//         console.log(sel);
//         setEverything(event.target.selectedIndex, 0);
//     }

//     function changeClub(event) {
//         var sel = document.getElementsByClassName('order_select')[0].getElementsByTagName('select')[0];
//         setEverything(0, event.target.selectedIndex);
//     }

//     function search(event, obj, fields, f) {
//         var v = event.target.previousSibling.value.toString().toLowerCase();
//         if (v != undefined)
//             obj = obj.filter((item) => {
//                 for (let i = 0; i < fields.length; i++) {
//                     if (item[fields[i]].toString().toLowerCase().indexOf(v) >= 0)
//                         return true;
//                 }
//             });
//         obj = obj.map((item, index) => (<option key={item.id} id={item.id} value={item.id} index={index}> {fields.length > 1 ? item[fields[1]] : ''} {item[fields[0]]}</option>));
//         f(obj);
//     }

//     function add(event) {
//         event.preventDefault();
//         var f = event.target;
//         var i = f.getElementsByClassName('order_data')[0].getElementsByTagName('select');
//         var d = {
//             'id_price': parseInt(i[0].value.toString()),
//             'id_client': data.id,
//         }
//         console.log(i[0].id);
//         axios.post(getUrl(`/api/order/`), d)
//         .then(function (response) {
//             if (response.status == 201) {
//                 // window.location.reload();
//             }
//         })
//         .catch(function (error) {
            
//         });
//     }

//     return(
//         <div className="order">
//             <form className="order_changer" id="order_changer" onSubmit={(event) => add(event)}>
//                 <div className="form_data">
//                     <div className="order_search_line">
//                     <NativeSelect type="text" placeholder="Новая услуга" className="order_select" onChange={(event) => changeService(event)} name="service">
//                         {services}
//                     </NativeSelect>
//                         <input type="text" placeholder="Поиск" name="service"/>
//                         <input type="button" value="Поиск" src="search.png" onClick={(event) => search(event, serviceObj, ['description', 'name'], setServices)}/>
//                     </div>
                        
//                     <div className="order_search_line">
//                         <NativeSelect type="text" placeholder="Новый комп. клуб" className="order_select" onChange={changeClub} id="club" name="club">
//                             {clubs}
//                         </NativeSelect>
//                         <input type="text" placeholder="Поиск"/>
//                         <input type="button" value="Поиск" onClick={(event) => search(event, clubObj, ['name', 'address'], setClubs)}/>
//                     </div>
//                     <div className="order_search_line">
//                         <NativeSelect type="text" placeholder="Место" className="order_data order_select" name="place">
//                             {devices}
//                         </NativeSelect>
//                         <input type="text" placeholder="Поиск"/>
//                         <input type="button" value="Поиск" onClick={(event) => search(event, deviceObj, ['description', 'name'], setDevices)}/>
//                     </div>
//                 </div>
//                 <div className="order_btns">
//                     <input type="submit" value="Добавить"/>
//                 </div>
//             </form>
//         </div>
//     );
// }

import { useEffect } from "react";
import getUrl from "./getUrl";
import axios from "axios";
import { useState } from "react";
import NativeSelect from '@mui/material/NativeSelect';
import Cookies from "universal-cookie";

export default function() {
    const [price, setPrice] = useState('');
    const [service, setService] = useState('');
    const [device, setDevice] = useState('');
    const [club, setClub] = useState('');

    var cookies = new Cookies(null, { path: '/' });
    var data = cookies.get('client', { path: '/' });
    console.log('data', data);
    const [orderApp, setOrder] = useState({display: 'block', });
    var l = false;

    const [serviceObj, setServiceObj] = useState([]);
    const [clubObj, setClubObj] = useState([]);
    const [deviceObj, setDeviceObj] = useState([]); 

    const [services, setServices] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [devices, setDevices] = useState([]);

    var d;

    function setEverything(serviceIndex, clubIndex) {
        var ser;
        axios.get(getUrl(`/api/service/`))
            .then(function (response) {
                if (response.status == 200) {
                    d = response.data;
                    ser = d[serviceIndex].id;
                    setServiceObj(response.data);
                    setServices(response.data.map((item, index) => (<option   key={item.id} id={item.id} value={item.id} index={index}>{item.name} {item.description}</option>)));

                    var cl;
                    axios.get(getUrl(`/api/club/byData/${ser}/`))
                        .then(function (response) {
                            if (response.status == 200) {
                                d = response.data;
                                cl = d[clubIndex].id;
                                setClubObj(response.data);
                                setClubs(response.data.map((item, index) => (<option   key={item.id} id={item.id} value={item.id} index={index}>{item.name} {item.address} {item.phone}</option>)));

                                axios.get(getUrl(`/api/device/byData/${cl}/${ser}/`))
                                .then(function (response) {
                                    if (response.status == 200) {
                                        d = response.data;                                        
                                        for (let i = 0; i < d.length; i++) {
                                            axios.get(getUrl(`/api/price/byData/${d[i].id}/${ser}/`))
                                            .then(function (response) {
                                                if (response.status == 200) {
                                                    d[i].price = response.data;
                                                    if (i == d.length - 1 && response.data != undefined && d[0].id != undefined) {
                                                        setDeviceObj(d);
                                                        setDevices(d.map((item, index) => (<option   key={item.id} id={item.id} index={index} value={item.price.id}>{item.name},  {item.description}, {item.price.price} руб/час</option>)));
                                                    }
                                                }
                                            })
                                            .catch(function (error) {
                                                console.log(error);
                                            });
                                        }
                                    }
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });

                                
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                    });

                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {

        
        setEverything(0, 0);
        
    }
    , [] );

    function delOrder() {
        axios.delete(getUrl(`/api/order/${data.id}/`))
        .then(function (response) {
            if (response.status == 204) {
                setOrder({display: 'none',});
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    function infoDel() {

    }


    function changeService(event) {
        setEverything(event.target.selectedIndex, 0);
    }

    function changeClub(event) {
        setEverything(0, event.target.selectedIndex);
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
        obj = obj.map((item, index) => (<option key={item.id} id={item.id} value={item.id} index={index}> {fields.length > 1 ? item[fields[1]] : ''} {item[fields[0]]}</option>));
        f(obj);
    }

    function add(event) {
        event.preventDefault();
        var f = event.target;
        var i = f.getElementsByClassName('order_data')[0].getElementsByTagName('select');
        var d = {
            'id_price': parseInt(i[0].value),
            'id_client': data.id,
        }
        axios.post(getUrl(`/api/order/`), d)
        .then(function (response) {
            if (response.status == 201) {
                window.location.reload();
            }
        })
        .catch(function (error) {
            
        });
    }

    return(
        <div className="order" style={orderApp}>

            <form className="order_changer" id="order_changer" onSubmit={(event) => add(event)}>
                <div className="form_data">
                    <div className="order_search_line">
                        <NativeSelect type="text" placeholder="Новая услуга" className="order_select" onChange={(event) => changeService(event)} name="service">
                            {services}
                        </NativeSelect>
                        <input type="text" placeholder="Поиск" name="service"/>
                        <input type="button" value="Поиск" src="search.png" onClick={(event) => search(event, serviceObj, ['description', 'name'], setServices)}/>
                    </div>
                        
                    <div className="order_search_line">
                        <NativeSelect type="text" placeholder="Новый комп. клуб" className="order_select" onChange={changeClub} id="club" name="club">
                            {clubs}
                        </NativeSelect>
                        <input type="text" placeholder="Поиск"/>
                        <input type="button" value="Поиск" onClick={(event) => search(event, clubObj, ['name', 'address'], setClubs)}/>
                    </div>
                    <div className="order_search_line">
                        <NativeSelect type="text" placeholder="Место" className="order_data order_select" name="place">
                            {devices}
                        </NativeSelect>
                        <input type="text" placeholder="Поиск"/>
                        <input type="button" value="Поиск" onClick={(event) => search(event, deviceObj, ['description', 'name'], setDevices)}/>
                    </div>
                </div>
                <div className="order_btns">
                    <input type="submit" value="Добавить"/>
                </div>
            </form>
        </div>
    );
}