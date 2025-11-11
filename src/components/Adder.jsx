import Value from "./Value";
import { useState } from "react";

const Adder = () => {
    const [a, setA] = useState(0)
    const [b, setB] = useState(0)

  return (
    <div className="border border-black border-2 mx-auto mt-3 rounded-3 p-3" style={{width: 'auto', height:'280px'}}>
      <h1 className="text-center text-navy fw-medium">Adder</h1>
      <div className="gap-2 fs-2 d-flex justify-content-between align-items-center ">
        <div className="badge bg-secondary ">A = {a}</div>
        <div className="badge bg-primary ">A + B = {a + b}</div>
        <div className="badge bg-secondary">B = {b}</div>
      </div>
      <div className="d-flex gap-2 mt-2">
        <Value name={"A"} value={a} setValue={setA} />
        <Value name={"B"} value={b} setValue={setB} />
      </div>
    </div>
  );
};

export default Adder;
