import React from "react";
import { BiRupee } from "react-icons/bi";

export default function Price(props) {
    return (
        <div
          style={{
            fontSize: props.fontSize ? props.fontSize : "14px",
            fontWeight: "bold",
            margin: "5px 0",
          }}
        >
          <BiRupee />
          {props.value}
        </div>
    );
}
