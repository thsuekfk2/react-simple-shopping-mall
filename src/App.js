/* eslint-disable*/
import "./App.css";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import React, { useState } from "react";
import data from "./data.js";
import { Link, Route, Switch } from "react-router-dom";
import Detail from "./Detail.js";

function App() {
  function PriceSorting() {
    var newArray = [...sticker];

    newArray.sort((a, b) => {
      return a.price - b.price;
    });
    console.log(newArray);
    stickerChange(newArray);
  }

  let [sticker, stickerChange] = useState(data);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Sticker shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav>
                <Link to="/">Home</Link>
              </Nav>
              <Nav>
                <Link to="/detail">Detail</Link>
              </Nav>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item>Action</NavDropdown.Item>
                <NavDropdown.Item>Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <div className="Jumbotron">
            <h1>20% Season off Sale</h1>

            <p>
              Welcome to the sticker shop. There is a season sale, so please
              check the notice. thank you.
            </p>
          </div>
          <button className="btn" onClick={PriceSorting}>
            가격정렬
          </button>
          <div className="container">
            <div className="row">
              {sticker.map((a, i) => {
                return <Contents sticker={a} i={i} key={i}></Contents>;
              })}
            </div>
          </div>
        </Route>
        <Route path="/detail/:id">
          <Detail sticker={sticker} />
        </Route>

        <Route path="/:id">
          <div>아무거나 보여주기</div>
        </Route>
      </Switch>
    </div>
  );
}

function Contents(props) {
  return (
    <div className="col-md-4">
      <img
        src={require(`./Sketch00${props.sticker.id + 1}.jpg`)}
        width="100%"
      />

      <h4>{props.sticker.title}</h4>
      <p>
        {props.sticker.content} & {props.sticker.price}
      </p>
    </div>
  );
}

export default App;
