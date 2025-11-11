import { useState } from "react";

function Variable({ name, value, setValue, type = "real" }) {
  return (
    <div
      className="border border-black border-2 rounded-3 m-auto p-2 mt-3 text-center bg-black bg-opacity-25"
      style={{ width: "fit-content", minWidth: "220px"}}
    >
      <h1 className="text-primary fw-bold">{name || "Value"}</h1>
      <div className="d-flex justify-content-between align-items-center gap-2">
        <button
          className="btn btn-danger fw-bold fs-4 d-flex justify-content-center align-items-center"
          style={{ width: "40px", height: "40px", borderRadius: "8px" }}
          onClick={() => setValue(value - 1)}
        >
          −
        </button>

        <div className="fs-3 fw-bold">
          {type === "real" ? value.toFixed(2) : Math.round(value)}
        </div>

        <button
          className="btn btn-success fw-bold fs-4 d-flex justify-content-center align-items-center"
          style={{ width: "40px", height: "40px", borderRadius: "8px" }}
          onClick={() => setValue(value + 1)}
        >
          ＋
        </button>
      </div>
    </div>
  );
}

function Temperature() {
  const [celsius, setCelsius] = useState(0);
  const [fahrenheit, setFahrenheit] = useState(0);
  const [kelvin, setKelvin] = useState(0);

  const handleCelsiusChange = (val) => {
    setCelsius(val);
    setFahrenheit((val * 9) / 5 + 32);
    setKelvin(val + 273.15);
  };

  const handleFahrenheitChange = (val) => {
    setFahrenheit(val);
    const c = ((val - 32) * 5) / 9;
    setCelsius(c);
    setKelvin(c + 273.15);
  };

  const handleKelvinChange = (val) => {
    setKelvin(val);
    const c = val - 273.15;
    setCelsius(c);
    setFahrenheit((c * 9) / 5 + 32);
  };

  return (
    <div
      className="border border-black  border-3 rounded-4 p-4 mt-4 bg-light-subtle shadow-sm"
      style={{ width: "fit-content", margin: "auto" }}
    >
      <h1 className="text-center text-navy fw-medium">TEMPERATURES</h1>
      <h3 className="text-center mb-4">
        <span className="badge bg-primary fs-5 mx-1">
          {celsius.toFixed(2)} °C
        </span>
        <span className="badge bg-primary fs-5 mx-1">
          {fahrenheit.toFixed(2)} °F
        </span>
        <span className="badge bg-primary fs-5 mx-1">
          {kelvin.toFixed(2)} K
        </span>
      </h3>

      <div className="d-flex justify-content-center flex-wrap gap-4">
        <Variable
          className
          name="CELSIUS"
          value={celsius}
          setValue={handleCelsiusChange}
        />
        <Variable
          name="FAHRENHEIT"
          value={fahrenheit}
          setValue={handleFahrenheitChange}
        />
        <Variable name="KELVIN" value={kelvin} setValue={handleKelvinChange} />
      </div>
    </div>
  );
}

export default Temperature;
