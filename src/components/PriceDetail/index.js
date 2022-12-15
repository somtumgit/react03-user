import React from "react";
import Card from "../../components/UI/Card";
import './style.css';

export default function PriceDetail(props) {
    return (
        <Card headerleft={"Price Details"} style={{ maxWidth: "380px", ...props.style }}>
          <div
            style={{
              padding: "10px 20px",
              boxSizing: "border-box",
            }}
          >
            <div className="flexRow sb" style={{ margin: "0 0 10px" }}>
              <div>Price ({props.totalItem} items)</div>
              <div>{props.totalPrice}</div>
            </div>
            <div className="flexRow sb" style={{ margin: "0 0 10px" }}>
              <div>Delivery Charges</div>
              <div>FREE</div>
            </div>
            <div className="flexRow sb" style={{ margin: "0 0 10px" }}>
              <div>Total Amount</div>
              <div>{props.totalPrice}</div>
            </div>
          </div>
        </Card>
    );
}
