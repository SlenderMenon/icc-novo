import React from 'react';

// bootstrap
import { Container, Row, Col, Dropdown, ListGroup, Carousel } from '../../styles';

// styling
import './Content.css';

// components

export class Content extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dropdownSelected: 'Select Topic'
    }
  }

  render() {
    return (
      <div className="content-component">

        <Container fluid>

          <Row className="pane-container">

            <Col className="left-pane bg-light" lg="3">

              <div className="dropdown-container">
                <h6>Categories</h6>
                <Dropdown size="lg">
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    {this.state.dropdownSelected}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div className="file-list-container">
                <h6>Files</h6>
                <ListGroup>
                  <ListGroup.Item>Cras justo odio</ListGroup.Item>
                  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
              </div>

            </Col>

          </Row>

        </Container>

      </div>
    )
  }
}

export default Content;
