//pehle ham sare atributed and class ko define kr lete h
const userTab=document.querySelector("[data-userWheather]");
const searchTab=document.querySelector("[data-searchWheather]");
const userContainer=document.querySelector(".wheather-container");

const grantAccessContainer=document.querySelector(".grant-container");
const searchForm=document.querySelector("[data-searchForm]");
const loadingScreen=document.querySelector(".loading-container");
const userInfoContainer=document.querySelector(".user-info-container");

//pehle hm kis tab me h wo decide karenge
let currentTab=userTab;
//ye hmara api key hai
const API_KEY="d1845658f92b31c64bd94f06f7188c9c";
//ek class bnaya jha hm baground ko gray krte h tab ka
currentTab.classList.add("current-tab");
//ek function create karte h jisme ek parameter pass karte hai

function switchTab(clickedTab)
{   ///ham check karenge ki clickedtab current tab ke qual ni h tab 
    if(clickedTab != currentTab)
    {
        currentTab.classList.remove("current-tab");
        currentTab=clickedTab;
        currentTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active"))
        {  //kya search form wala container invisible hai to use visible karayenge
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else
            ///pehle main searchtab wale pr tha ab mujhe your wheather wala visible karna hai
            {
                searchForm.classList.remove("active");
                userInfoContainer.classList.remove("active");

              ///ab mai your wheather wale tab me aa gaya to mera wheather display karna hoga
                getformSessionStorage();
            }
    }
}


userTab.addEventListener("click",()=>
{
    switchTab(userTab);
});

searchTab.addEventListener("click",()=>
{
    switchTab(searchTab);
});

function getformSessionStorage(){
    const localCordinates=sessionStorage.getItem("user-cordinates");
    if(!localCordinates)
    {
        grantAccessContainer.classList.add("active");
    }
    else
    {
        const cordinates=JSON.parse(localCordinates);
        fetchUserWheatherInfo(cordinates);
    }
}

async function fetchUserWheatherInfo(cordinates)
{
    const {lat,lon}=cordinates;
    grantAccessContainer.classList.remove("active");

    loadingScreen.classList.add("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const  data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } 
    catch (error) {
        loadingScreen.classList.remove("active");

    }
}

function renderWeatherInfo(weatherInfo)
{
    const cityName=document.querySelector("[data-cityName]");
    const countryIcon=document.querySelector("[data-countryIcon]");
    const wheatherDesc=document.querySelector("[data-wheatherDesc]");
    const wheatherIcon=document.querySelector("[data-wheatherIcon]");
    const temperature=document.querySelector("[ata-temp]");
    const windSpeed=document.querySelector("[ data-windspeed]");
    const humidity=document.querySelector("[data-humidity]");
    const cloudiness=document.querySelector("[data-cloudiness]");

    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
}