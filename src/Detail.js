import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Styled from "styled-components";
import "./Detail.scss";

let Box = Styled.div`
  padding : 20px;
`;

let Title = Styled.h4`
  font-size : 25px;
  color : ${(props) => props.color}
`;

function Detail(props) {
  let history = useHistory();
  let { id } = useParams();
  let realID = props.sticker[id].id;
  let [modal, modalChange] = useState(true);
  let [inputData, inputChange] = useState("");

  useEffect(() => {
    console.log("안녕");
    //컴포넌트가 보일 때, 업데이가 될 때 특정 코드 실행 가능
    let timer = setTimeout(() => {
      modalChange(false);
    }, 2000);
  }, []);

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
      {modal == true ? <Modal /> : modal == false}
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
          <button className="btn btn-danger">Order</button>
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
    </div>
  );
}
function Modal() {
  return (
    <div className="my-alert">
      <p>재고가 얼마 남지 않았습니다</p>
    </div>
  );
}

export default Detail;
