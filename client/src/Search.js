import Order from "./Order";
function search(event, obj, fields, f) {
    var v = event.target.previousSibling.value.toString().toLowerCase();
    // var newObj = '';
    if (v != undefined)
        obj = obj.filter((item) => {
            for (let i = 0; i < fields.length; i++) {
                if (item[fields[i]].toString().toLowerCase().indexOf(v) >= 0)
                    return true;
            }
        });
    obj = obj.map((item, index) => (<Order key={item.id} data={item} id={item.id}/>));
    f(obj);
}

export default search;