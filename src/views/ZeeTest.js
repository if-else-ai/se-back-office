import React from "react";
import ChartistGraph from "react-chartist";
import { Card, Container, Row, Col } from "react-bootstrap";

function ZeeTest() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">ถิรวัฒน์ พงศะทัตกิจ</Card.Title>
                <p className="card-category">62050163</p>
              </Card.Header>
              <Card.Body>Test</Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update now
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ZeeTest;
