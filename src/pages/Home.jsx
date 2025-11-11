import { Container, Row, Col, Card } from "react-bootstrap";

const Home = () => {
  return (
    <div className="home-container">
      <Container>
        <Row className="justify-content-center mt-4 mb-4">
          <Col md={6} lg={5}>
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
              <Card.Img
                className="my-bg"
                variant="top"
                style={{ objectFit: "cover", height: "350px" }}
              />
              <Card.Body className="text-center bg-white">
                <Card.Title className="fw-bold fs-4 mt-2">
                  นายปรเมษฐ ลีลาวนาวัลย์
                </Card.Title>
                <Card.Subtitle className="mb-2 fw-bold">
                  รหัสนักศึกษา: 67148270
                </Card.Subtitle>
                <Card.Text className="mt-3">
                  ชั้นปีที่ 2 สาขาวิทยาการคอมพิวเตอร์ (CSI)
                  <br />
                  คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยศรีปทุม
                </Card.Text>
                <hr />
                <Card.Text className="fw-semibold ">
                  ฝึกฝน React
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
