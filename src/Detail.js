import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Styled from "styled-components";
import "./Detail.scss";
import { inventoryContext } from "./App.js"; //App.js에서 가져온 범위
import { Nav } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";

let Box = Styled.div`
  padding : 20px;
`;

let Title = Styled.h4`
  font-size : 25px;
  color : ${(props) => props.color}
`;

function Detail(props) {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();

  let [modal, modalChange] = useState(true);
  let [inputData, inputChange] = useState("");
  let [tab, tabChange] = useState(0);
  let [answitch, answitchChange] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      modalChange(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  let history = useHistory();
  let { id } = useParams();
  let realID = props.sticker[id].id;
  let inventory = useContext(inventoryContext);

  return (
    <div className="container">
      <Box>
        <Title className="navy">Detail</Title>
      </Box>
      <input
        onChange={(e) => {
          inputChange(e.target.value);
        }}
      />
      {modal === true ? <Modal /> : modal === false}
      <div className="row">
        <div className="col-md-6">
          <img
            src={require(`./Sketch00${parseInt(id) + 1}.jpg`)}
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{props.sticker[realID].title}</h4>
          <p>{props.sticker[realID].content}</p>
          <p>{props.sticker[realID].price}</p>
          <p>{props.sticker[id].id}</p>
          <Info inventory={props.inventory} />
          <input
            className="input"
            onChange={(e) => {
              props.재고입력수정(e.target.value);
            }}
          />
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch({
                type: "장바구니담기",
                payload: {
                  id: props.sticker[id].id,
                  name: props.sticker[realID].title,
                  quan: props.재고입력,
                },
              });

              history.push("/cart");
            }}
          >
            Order
          </button>
          <button
            className="btn"
            onClick={() => {
              history.goBack();
            }}
          >
            Back
          </button>
        </div>
      </div>

      <Nav className="mt-5" fill variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              answitchChange(false);
              tabChange(0);
            }}
          >
            NavLink
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              answitchChange(false);
              tabChange(1);
            }}
          >
            Link
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <CSSTransition in={answitch} classNames="boom" timeout={500}>
        <TabContent tab={tab} answitchChange={answitchChange} />
      </CSSTransition>
    </div>
  );
}
function TabContent(props) {
  useEffect(() => {
    props.answitchChange(true);
  });

  if (props.tab === 0) {
    return <div>0번째 내용입니다.</div>;
  } else if (props.tab === 1) {
    return <div>1번째 내용입니다.</div>;
  }
}

function Modal() {
  return (
    <div className="my-alert">
      <p>재고가 얼마 남지 않았습니다</p>
    </div>
  );
}

function Info(props) {
  return <p>재고{props.inventory[0]}</p>;
}

//export default connect(state를props화)(Detail);

export default Detail;
