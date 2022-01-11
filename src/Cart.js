import React, { useEffect, memo } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

function Cart(props) {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  return (
    <div>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>+</th>
            <th>-</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {state.reducer.map((a, i) => {
            return (
              <tr key={i}>
                <td>{i}</td>
                <td>{a.name}</td>
                <td>{a.quan}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch({
                        type: "수량증가",
                        payload: {
                          id: i,
                        },
                      });
                    }}
                  >
                    +
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      dispatch({
                        type: "수량감소",
                        payload: {
                          id: i,
                        },
                      });
                    }}
                  >
                    -
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      dispatch({
                        type: "삭제",
                        payload: {
                          index: i,
                        },
                      });
                    }}
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {props.close === true ? (
        <div className="my-alert2">
          <p>지금 구매하시면 1000원 할인 쿠폰 제공</p>
          <button
            onClick={() => {
              dispatch({ type: "닫기" });
            }}
          >
            닫기
          </button>
        </div>
      ) : null}
      <Parent 이름="혜삔" 나이="25"></Parent>
    </div>
  );
}
function Parent(props) {
  return (
    <div>
      <Child1 이름={props.이름}></Child1>
      <Child2 나이={props.나이}></Child2>
    </div>
  );
}
function Child1() {
  useEffect(() => {
    console.log("랜더링됨1");
  });
  return <div>111</div>;
}
let Child2 = memo(function () {
  useEffect(() => {
    console.log("랜더링됨2");
  });
  return <div>222</div>;
});
//export default connect(state를props화)(Cart);

export default Cart;
