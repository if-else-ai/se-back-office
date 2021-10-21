import logo from "./logo.svg";
import "./App.css";
import { Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Row className="mx-0">
          <Button as={Col} variant="primary">
            Button #1
          </Button>
          <Button as={Col} variant="secondary" className="mx-2">
            Button #2
          </Button>
          <Button as={Col} variant="success">
            Button #3
          </Button>
        </Row>
      </header>
    </div>
  );
}

export default App;
