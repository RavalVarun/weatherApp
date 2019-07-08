window.addEventListener('load',()=> {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');

  if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position =>{
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = `https://api.darksky.net/forecast/9ac6029020f94c5e9448ae5f873fc55a/${lat},${long}`;

        fetch(api)
        .then(response =>{
          return response.json();
        })
          .then(data => {
            const {temperature,summary, icon } = data.currently; 
            //set DOM elements from API
            temperatureDegree.textContent = temperature;      
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;

              //Set Icons
              setIcons(icons, document.querySelector('.icon'));
          });
      });    

  }
  
  function setIcons(icon, iconID){
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID,Skycons[currentIcon]);
  }
});