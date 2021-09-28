url = 'https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json';

fetch(url).then(res => res.json()).then(res => {
    let e = []
    let m = []

    console.log(res);
    crearTabla1(res);



    crearMatriz(res, e, m)
    crearTabla2(e, m)

})

//function crearFila(pNumber, pEvent, pArdilla) {
// let row = document.createElement('tr');
//let number = document.createElement('th');
// let event = document.createElement('td1');
//let ardilla = document.createElement('td2');
//number.innerText = pNumber;
//event.innerText = pEvent;
//ardilla.innerText = pArdilla;
//row.appendChild(number);
//row.appendChild(event);
//row.appendChild(ardilla);
//return row;
//}

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }
    return false;
}


function crearMatriz(data, e, m) {
    data.forEach(element => {

        element.events.forEach(events => {

            if (containsObject(events, e)) {
                let fn = 0
                let tp = 0
                let tn = 0
                let fp = 0

                data.forEach(row => {

                    if (containsObject(events, row.events) && row.ardilla) {
                        tp++
                    } else if (containsObject(events, row.events) && !row.ardilla) {
                        fn++
                    } else if (!containsObject(events, row.events) && row.ardilla) {
                        fp++
                    } else {
                        tn++
                    }
                })
                let p1 = ((tp * tn) - (fp * fn))
                let p2 = Math.sqrt((tp + fp) * (tp + fn) * (tn + fp) * (tn + fn))
                let total = p1 / p2
                e.push(events)
                m.push(total)
            }
        })
    })

}

function mayorValor(list) {

    var mayor = 0;
    var x = list[0];


    for (var i = 1; i < list.length; i++) {
        if (list[i] > x) {
            mayor = i;
            x = list[i];
        }
    }
    return mayor;
}





function crearTabla1(data) {
    let t1 = document.getElementById("data1");
    i = 1;
    data.forEach(element => {

        let row = document.createElement('tr');
        let number = document.createElement('th');
        let events = document.createElement('td');
        let ardilla = document.createElement('td');
        let n = document.createTextNode(i)

        // number.innerText = pNumber;
        // event.innerText = pEvent;
        // ardilla.innerText = pArdilla;

        number.appendChild(n);
        n = document.createTextNode(element.events);
        events.appendChild(n);
        n = document.createTextNode(element.squirrel);
        ardilla.appendChild(n);


        row.appendChild(number);
        row.appendChild(events);
        row.appendChild(ardilla);

        if (element.ardilla) row.classList.add("table-danger")


        t1.appendChild(row);




        i++;
    });

}





function crearTabla2(data, mcc) {


    let ne = []
    let nm = []

    while (data.length != 0) {

        //nm.push(mcc[max])
        //data.splice(max,1)


        let max = mayorValor(mcc)
        ne.push(data[max])

        nm.push(mcc[max])
        data.splice(max, 1)
        mcc.splice(max, 1)
    }
    data = ne
    mcc = nm


    let t2 = document.getElementById("data2");
    ie = 1;
    data.forEach(element => {

        let row = document.createElement('tr');
        let number = document.createElement('th');
        let events = document.createElement('td');
        let ardilla = document.createElement('td');
        let n = document.createTextNode(ie)


        number.appendChild(n);
        n = document.createTextNode(element.events);
        events.appendChild(n);
        n = document.createTextNode(element.squirrel);
        ardilla.appendChild(n);


        row.appendChild(number);
        row.appendChild(events);
        row.appendChild(ardilla);

        if (element.ardilla) {
            row.classList.add("table-danger")
        }


        t2.appendChild(row);

        ie++;
    });

}