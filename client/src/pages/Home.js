import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

function Home() {
  return (
    <Container fluid className="home d-flex flex-column align-items-center justify-content-center">
      <Row className="align-items-center">
        <Col md={6} className="text-center text-md-center mb-4 mb-md-0">
          <h1 className="title">TimeWise</h1>
          <p className="subtitle">
            "Streamline Your Study Schedule and Conquer Your Academic Goals with TimeWise
          </p>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={6} className="text-center text-md-end">
          <Image
            src="https://picsum.photos/1200/400"
            alt="TimeWise"
            className="home-img "
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
