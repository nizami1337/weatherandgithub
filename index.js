const OW_API_KEY = '33b86bea39451f89bd69ac5573e9f91c';

// vepet72515@goulink.com

document.getElementById('lookupBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value
    
    let lat;
    let lon;

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let res = JSON.parse(xhttp.responseText)
            lat = res[0]['lat']
            lon = res[0]['lon']
        }
    };
    xhttp.open("GET", `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OW_API_KEY}`, false);
    xhttp.send();

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(xhr.responseText);
            console.log(data)
            document.getElementById('weatherCity').innerHTML = city;
            document.getElementById('weatherMain').innerHTML = data.weather[0].main;
            document.getElementById('weatherCondition').setAttribute('src', `https://openweathermap.org/img/w/${data.weather[0].icon}.png`)
            document.getElementById('currentTemp').innerHTML = data.main.temp;
            document.getElementById('minTemp').innerHTML = data.main.temp_min;
            document.getElementById('maxTemp').innerHTML = data.main.temp_max;
            document.getElementById('windSpeed').innerHTML = data.wind.speed;
            let date = new Date();
            document.getElementById('weatherDate').innerHTML = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
            document.getElementsByClassName('bottombar')[0].style.display = 'block'
        }
    }
    xhr.open('GET', `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OW_API_KEY}`, false)
    xhr.send()
})

document.getElementById('gitLookupBtn').addEventListener('click', () => {
    const user = document.getElementById('usernameInput').value

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(xhttp.responseText)
            document.getElementById('git__profilepic').setAttribute('src', data.avatar_url)
            document.getElementById('git__data__name').innerHTML = data.name
            document.getElementById('git__data__username').innerHTML = user
            document.getElementById('git__data__url').innerHTML = `https://github.com/${user}`
            document.getElementById('git__data__blog').innerHTML = data.blog
            document.getElementById('git__data__city').innerHTML = data.location
            document.getElementById('git__data__email').innerHTML = data.email
            document.getElementById('git__data__followers').innerHTML = data.followers
            document.getElementById('git__data__following').innerHTML = data.following
            document.getElementsByClassName('git__bottombar')[0].style.display = 'grid'
        }
    };
    xhttp.open("GET", `https://api.github.com/users/${user}`, false);
    xhttp.send();
})