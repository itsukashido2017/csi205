import { useEffect, useState } from "react";

const Value = ({ name, initial, type, value, setValue }) => {
  // useEffect(() => {
  //     setValue(initial || 0)
  // }, [initial])

  return (
    <div
      className="border-2 border border-black rounded-3 p-2 pt-0 m-auto bg-black bg-opacity-25"
      style={{ width: "fit-content" }}
    >
      <div className="text-center text-navy fs-1 fw-medium ">
        {name || "VALUE"}
      </div>

      <div className="d-flex mt-3 justify-content-around">
        <button
          className="btn btn-danger"
          style={{ width: "fit-content" }}
          onClick={() => setValue(value - 1)}
        >
          &minus;
        </button>
        <div className="font fw-bold fs-3 m-4 mt-0 mb-0">
          {type === "real" ? value.toFixed(2) : value}
        </div>
        <button className="btn btn-success" onClick={() => setValue(value + 1)}>
          +
        </button>
      </div>
    </div>
  );
};

export default Value;