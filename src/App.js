import React from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Map from "./components/Map"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



function App() {

  return (
    <Router>
      <div className="App">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to={"/"}>Worldik🌐</Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <Link className="nav-link" to={"/sign-in"}>Login <span class="sr-only">(current)</span></Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Sign-UP</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="auth-wrapper">
          <Switch>
            {/* <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route> */}
            <Route path="/">

              {/* map and info */}
              <Container fluid>
                <Row>
                  <Col className="colMap">
                    <Map />
                  </Col>
                  <Col md={3} id="fullInfo" style={{ backgroundColor: '#5b8982', height: `${document.documentElement.clientHeight}px` }}>
                    <Row>
                      <h2 id="titleOfInfo" >*Please select any country*</h2>
                    </Row>
                    <Row>
                      <Col>
                        <div className="authIMG">
                          <img id='flagImage' style={{ width: '100%' }} src={require('./images/state.png')} alt="flag" />
                        </div>
                      </Col>
                      <Col>
                        <p id="time"></p>
                      </Col>
                    </Row>
                    <Row>
                      <div className="descDIV">
                        <p id="description"></p>
                      </div>
                    </Row>
                  </Col>
                </Row>
              </Container>

            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
