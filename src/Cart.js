import React from "react";
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
            <th>변경</th>
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
    </div>
  );
}

//export default connect(state를props화)(Cart);
export default Cart;
