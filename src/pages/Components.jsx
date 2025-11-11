import { Col, Row } from "react-bootstrap";
import Adder from "../components/Adder";
import Temperature from "../components/Temperature";
import Timer from "../components/Timer";
import Value from "../components/Value";
import { useState } from "react";
import Container from "react-bootstrap/Container";

const Components = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div className="components-container">
      <Container className="p-3 my-layout-background">
        <Row className="g-3">
          <Col md={6}>
            <Row className="g-3">
              <Col xs={12}>
                <Value name={"COUNTER"} value={counter} setValue={setCounter} />
              </Col>
              <Col xs={12}>
                <Timer />
              </Col>
            </Row>
          </Col>

          <Col md={6}>
            <Adder />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs={12}>
            <Temperature />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Components;
