import React from 'react';
import './App.css';
// import { mouseWheelZoom } from 'mouse-wheel-zoom';
// import {wheelzoom} from 'wheelzoom';
// import myimage from './karina.jpeg';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { VectorMap } from '@south-paw/react-vector-maps';
import world from './world.json';
import descriptions from './description.json'


// const wz = mouseWheelZoom({
//   element: document.getElementById('.App'),
//   zoomStep: .25  
// });
// wz.reset();

// wheelzoom(document.querySelectror('.image'), {zoom:0.05});

const percent90 = `${document.documentElement.clientWidth / 100 * 80}px`;
const styleForScaleElem = {
  width: percent90
}

// let isTransformed = true;
// const onClickForWorld = () => {
//   isTransformed = false;
//   console.log(isTransformed);
//   setTimeout(() => {
//     isTransformed = true;
//     console.log(isTransformed);
//   }, 1000);
// }


const onClick = ({ target }) => {
  console.log(setTimeout(function() {}, 0));
  for (var i = setTimeout(function() {}, 0); i > 0; i--) {
    window.clearInterval(i);
    window.clearTimeout(i);
    if (window.cancelAnimationFrame) window.cancelAnimationFrame(i);
  }
  // setTimeout(() => {
  //   if (updateCountyTime) {
  //     console.log(updateCountyTime);
  //     clearInterval(updateCountyTime);
  //     timeDisplay.innerHTML = '';
  //   }
  // }, 4000)
  // if (updateCountyTime) {
  //   clearInterval(updateCountyTime);
  //   timeDisplay.innerHTML = '';
  // }
  const infoArray = [];
  // just name which == name in descript
  const name = target.attributes.name.value;
  // finding this country in JSON
  var foundedArray = descriptions.find(country => country.name === name);
  // getting date for this country
  var timeDisplay = document.getElementById("time");

  var timeInHtml = function () {
    const currDate = new Date();
    const gmtHours = currDate.getUTCHours();
    const gmtMinutes = currDate.getUTCMinutes();
    const gmtSeconds = currDate.getUTCSeconds();
    var dateInThisCountry = `${eval(gmtHours + foundedArray.GMT)}:${gmtMinutes}:${gmtSeconds}`
    timeDisplay.innerHTML = dateInThisCountry;
  }
  setInterval(timeInHtml, 1000);
}




function App() {
  return (
    <div className="Container">
      <div className="App">
        <TransformWrapper
          defaultScale={1}
          defaultPositionX={200}
          defaultPositionY={100}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <div className="tools">
                <button onClick={resetTransform}>reset</button>
                <p id="time"></p>
              </div>
              <TransformComponent>
                <div className="scaleElem" style={styleForScaleElem}>
                  <VectorMap {...world} layerProps={{ onClick }} />
                </div>
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
}

export default App;
