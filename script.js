/* fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.full})`;
        document.getElementById('author').textContent = `By: ${data.user.name}`;
    }) */

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.full})`;
        document.getElementById('author').textContent = `By: ${data.user.name}`;
    })
    .catch(err => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`;
		document.getElementById("author").textContent = `By: Dodi Achmad`;
    })

fetch('https://api.coingecko.com/api/v3/coins/dogecoin')
    .then(res => {
        if(!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json();
    })
    .then(data => {
        document.getElementById('crypto').innerHTML = `
            <div class="crypto-title">
                <img src="${data.image.small}" alt="${data.name} thumbnail">
                <p>${data.name}</p>
            </div>
            <p>🎯 $${data.market_data.current_price.usd}</p>
            <p>👆🏻 $${data.market_data.high_24h.usd}</p>
            <p>👇🏻 $${data.market_data.low_24h.usd}</p>
        `;
    })
    .catch(err => console.error(err));


updateTime();

function updateTime() {
    document.getElementById('time').textContent = new Date().toLocaleTimeString("en-es", {timeStyle: "short"});
    setTimeout(updateTime, 1000);
}

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if(!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json();
        })
        .then(data => {
            const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.getElementById('weather-top').innerHTML += `
                <img src="${iconUrl}" alt="weatherIcon"/>
                <p>${Math.round(data.main.temp)}°</p>
            `;
            document.getElementById('city').textContent = data.name;
        })
        .catch(err => console.error(err));
});