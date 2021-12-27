import React, { useState } from "react";

function Detail() {
  return (
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
          <button className="btn">뒤로가기</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
