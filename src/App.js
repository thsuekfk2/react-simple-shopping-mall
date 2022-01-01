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
  Spinner,
} from "react-bootstrap";
import React, { useContext, useState } from "react";
import data from "./data.js";
import { Link, Route, Switch } from "react-router-dom";
import Detail from "./Detail.js";
import axios from "axios";
import Cart from "./Cart.js";

export let inventoryContext = React.createContext();
//React.createContext()는 같은 변수값을 공유할 범위를 생성해주는 문법

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
  let [loding, lodingChange] = useState(false);
  let [inventory, inventoryChange] = useState([10, 11, 12]);

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
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/detail">
                Detail
              </Nav.Link>
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
            <inventoryContext.Provider value={inventory}>
              <div className="row">
                {sticker.map((a, i) => {
                  return <Contents sticker={a} i={i} key={i}></Contents>;
                })}
              </div>
            </inventoryContext.Provider>
            {loding === true ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : null}

            <button
              className="btn btn-primary"
              onClick={() => {
                lodingChange(true);
                axios
                  .get("https://codingapple1.github.io/shop/data2.json")
                  .then((res) => {
                    lodingChange(false);

                    stickerChange([...sticker, ...res.data]);
                    console.log(sticker);
                  })
                  .catch(() => {
                    console.log("실패했어요");
                  });
              }}
            >
              더보기
            </button>
          </div>
        </Route>
        <Route path="/detail/:id">
          <inventoryContext.Provider value={inventory}>
            <Detail
              sticker={sticker}
              inventory={inventory}
              inventoryChange={inventoryChange}
            />
          </inventoryContext.Provider>
        </Route>

        <Route path="/cart">
          <Cart />
        </Route>
      </Switch>
    </div>
  );
}

function Contents(props) {
  let inventory = useContext(inventoryContext);

  return (
    <div className="col-md-4">
      <img
        //src={require(`./Sketch00${props.sticker.id + 1}.jpg`)}
        width="100%"
      />

      <h4>{props.sticker.title}</h4>
      <p>
        {props.sticker.content} & {props.sticker.price}
      </p>
      {inventory[props.i]}
      <Test></Test>
    </div>
  );
}
function Test() {
  let inventory = useContext(inventoryContext);
  return <p>재고 : {inventory[0]}</p>;
}

export default App;
