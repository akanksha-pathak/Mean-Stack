
function showReport() {
    

    const par = document.getElementById("postCont");
    let city = document.getElementById("search-box-city").value;
    

    let xh = new XMLHttpRequest();
    let url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=24060611d6b664b49a70569445952941&units=metric";

    xh.open("GET", url);

    xh.onreadystatechange = function () {

        console.log(xh.readyState);
        if (xh.readyState == 4) {

            let resText = xh.responseText;
            let mj = JSON.parse(resText);
            callingfunc(mj);
        }

    }

    xh.send();

    document.getElementById("search-box-city").value = "";
    //document.getElementById("search-box-country").value = "";
    url = "";
}

function callingfunc(mj) {
    let par = document.getElementById("postCont");
    let newELe = par.children[0].cloneNode(true);
    newELe.style.display = "flex";
    newELe.style.flexDirection = "column";
    newELe.style.justifyContent = "center";
    newELe.style.alignItems = "center";
    newELe.style.border = "1px solid white";
    newELe.style.borderRadius = "25px";
    newELe.children[0].children[0].innerHTML = mj.name + " | ";
    newELe.children[0].children[1].innerHTML = mj.coord.lon + "&#176 | ";
    newELe.children[0].children[2].innerHTML = mj.coord.lat + "&#176";

    newELe.children[2].children[0].innerHTML = mj.weather[0].main;
    newELe.children[2].children[1].innerHTML = '"' + mj.weather[0].description + '"';

    newELe.children[4].children[0].innerHTML = mj.main.temp + "&#176C";


    par.insertBefore(newELe, par.firstChild);


    par.innerHTML = '';
    par.appendChild(newELe);

    //document.getElementById("cname").innerHTML = mj.name;
    //document.getElementById("lon").innerHTML = mj.coord.lon;
    // document.getElementById("lat").innerHTML = mj.coord.lat;
    //document.getElementById("main").innerHTML = mj.weather[0].main;
    //document.getElementById("desc").innerHTML = mj.weather[0].description;
    //document.getElementById("tempavg").innerHTML = mj.main.temp;
    //document.getElementById("press").innerHTML = mj.main.pressure;
    //document.getElementById("hum").innerHTML = mj.main.humidity;
    //document.getElementById("tempmin").innerHTML = mj.main.temp_min;
    //document.getElementById("tempmax").innerHTML = mj.main.temp_max;

    //document.getElementById("winspeed").innerHTML = mj.wind.speed;
    //document.getElementById("deg").innerHTML = mj.wind.deg;

}