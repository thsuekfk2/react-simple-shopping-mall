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

function App() {
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
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
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

      <Route exact path="/">
        <div className="Jumbotron">
          <h1>20% Season off Sale</h1>

          <p>
            Welcome to the sticker shop. There is a season sale, so please check
            the notice. thank you.
          </p>
        </div>
        <div className="container">
          <div className="row">
            {sticker.map((a, i) => {
              return <Contents sticker={a} i={i} key={i}></Contents>;
            })}
          </div>
        </div>
      </Route>
      <Route path="/detail">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src={require(`./Sketch001.jpg`)} width="100%" />
            </div>
            <div className="col-md-6 mt-4">
              <h4 className="pt-5">상품명</h4>
              <p>상품설명</p>
              <p>120000원</p>
              <button className="btn btn-danger">주문하기</button>
            </div>
          </div>
        </div>
      </Route>
    </div>
  );
}

function Contents(props) {
  return (
    <div className="col-md-4">
      <img src={require(`./Sketch00${props.i + 1}.jpg`)} width="100%" />

      <h4>{props.sticker.title}</h4>
      <p>
        {props.sticker.content} & {props.sticker.price}
      </p>
    </div>
  );
}

export default App;
