import React from 'react';
import './App.css';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { VectorMap } from '@south-paw/react-vector-maps';
import world from './world.json';
import descriptions from './description.json';

// no other way to set 90% width
const percent90 = `${document.documentElement.clientWidth / 100 * 80}px`;
const styleForScaleElem = {
  width: percent90
}

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}
const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));


function App() {

  let recentPressedCountryID = [];

  const onClick = ({ target }) => {
    // cleaning all timeouts and intervals
    for (var i = setTimeout(function () { }, 0); i > 0; i--) {
      window.clearInterval(i);
      if (window.cancelAnimationFrame) window.cancelAnimationFrame(i);
    }


    // just name which === name in descript
    const name = target.attributes.name.value;
    console.log(name);

    // filling with blue only active elem
    if (recentPressedCountryID.length > 0) {
      document.getElementById(recentPressedCountryID[recentPressedCountryID.length - 1]).style.fill = ''
    }
    target.style.fill = 'blue';
    recentPressedCountryID.push(target.attributes.id.value)

    // finding this country in JSON
    var foundedArray = descriptions.find(country => country.name === name);

    // checking
    if (!foundedArray) {
      return (console.log('error'));
    }
    // getting date for this country
    var timeDisplay = document.getElementById("time");
    var timeInHtml = function () {
      const currDate = new Date();
      let gmtHours = currDate.getUTCHours();
      let gmtMinutes = currDate.getUTCMinutes();
      let gmtSeconds = currDate.getUTCSeconds();
      let localHourGMT = foundedArray.GMT
      if(localHourGMT.split('').includes(':')){
        let hourAndMinutes = localHourGMT.split(':');
        localHourGMT = Number(hourAndMinutes[0]);
        gmtMinutes = gmtMinutes + Number(hourAndMinutes[1]);
      }
      if (gmtMinutes >= 60) {
        gmtHours++;
        gmtMinutes = gmtMinutes - 60;
      }
      if (gmtMinutes < 10) {
        gmtMinutes = "0" + gmtMinutes;
      } else if(gmtMinutes === 0){
        gmtMinutes = "0" + gmtMinutes;
      }
      if (gmtSeconds < 10) {
        gmtSeconds = "0" + gmtSeconds;
      }else if(gmtSeconds === 0){
        gmtSeconds = "0" + gmtSeconds;
      }
      
      var dateInThisCountry = `${eval(gmtHours + localHourGMT)}:${gmtMinutes}:${gmtSeconds}`
      timeDisplay.innerHTML = dateInThisCountry;
    }
    timeInHtml();
    setInterval(timeInHtml, 1000);

    // displaying it
    let nameInput = document.getElementById("titleOfInfo");
    let descInput = document.getElementById("description");
    let flagImage = document.getElementById("flagImage");
    let nameWithoutSpaces = name.replace(/\s/g, '');
    flagImage.attributes.src.value = images[`${nameWithoutSpaces}.png`];

    nameInput.innerHTML = name;
    descInput.innerHTML = foundedArray.description;
  }


  return (
    <div className="Container">
      <div className="App">
        <TransformWrapper
          defaultScale={1}
          defaultPositionX={200}
          defaultPositionY={100}
          doubleClick={{ disabled: true }}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <TransformComponent>
                <div style={styleForScaleElem}>
                  <VectorMap {...world} layerProps={{ onClick }} />
                </div>
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>

      </div>
      <div className="info">
        <h1 id="titleOfInfo" >*Please select any country*</h1>
        <div className="flagNameTime">
          <img id='flagImage' src={require('./images/state.png')} alt="flag" />
          <p id="time"></p>
        </div>
        <p id="description"></p>
      </div>
    </div>
  );
}

export default App;
