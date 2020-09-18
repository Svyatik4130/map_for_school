import React from 'react';
import './App.css';
// import myimage from './karina.jpeg';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { VectorMap } from '@south-paw/react-vector-maps';
import world from './world.json';
import descriptions from './description.json';


const percent90 = `${document.documentElement.clientWidth / 100 * 80}px`;
const styleForScaleElem = {
  width: percent90
}


function App() {
  const onClick = ({ target }) => {
    // cleaning all timeouts and intervals
    for (var i = setTimeout(function () { }, 0); i > 0; i--) {
      window.clearInterval(i);
      if (window.cancelAnimationFrame) window.cancelAnimationFrame(i);
    }

    const infoArray = [];
    // just name which === name in descript
    const name = target.attributes.name.value;

    // finding this country in JSON
    var foundedArray = descriptions.find(country => country.name === name);

    // checking
    if (!foundedArray) {
      return (console.log('error'));
    }
    // bulding info array
    infoArray.push(name, foundedArray.description, foundedArray.GMT);
    console.log(infoArray);
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
              <div className="tools">
                <button onClick={resetTransform}>reset</button>
                <p id="time"></p>

                <div>
                </div>
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
