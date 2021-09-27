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

            <Col className="center-pane" lg="9">

              <Row className="carousel-container">
                <Col>
                  <Carousel className="carousel-element">
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="holder.js/800x400?text=First slide&bg=373940"
                        alt="First slide"
                      />
                      <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="holder.js/800x400?text=Second slide&bg=282c34"
                        alt="Second slide"
                      />

                      <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="holder.js/800x400?text=Third slide&bg=20232a"
                        alt="Third slide"
                      />

                      <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  </Carousel>
                </Col>
              </Row>

              <Row className="carousel-images-container bg-light">
                <Col>
                  <div className="carousel-preview-container">
                    <div className="carousel-preview-image"></div>
                    <h7>Landscape-5.png</h7>
                  </div>
                  <div className="carousel-preview-container">
                    <div className="carousel-preview-image"></div>
                    <h7>Landscape-5.png</h7>
                  </div>
                  <div className="carousel-preview-container">
                    <div className="carousel-preview-image"></div>
                    <h7>Landscape-5.png</h7>
                  </div>
                  <div className="carousel-preview-container">
                    <div className="carousel-preview-image"></div>
                    <h7>Landscape-5.png</h7>
                  </div>
                  <div className="carousel-preview-container">
                    <div className="carousel-preview-image"></div>
                    <h7>Landscape-5.png</h7>
                  </div>
                  <div className="carousel-preview-container">
                    <div className="carousel-preview-image"></div>
                    <h7>Landscape-5.png</h7>
                  </div>
                  <div className="carousel-preview-container">
                    <div className="carousel-preview-image"></div>
                    <h7>Landscape-5.png</h7>
                  </div>
                  <div className="carousel-preview-container">
                    <div className="carousel-preview-image"></div>
                    <h7>Landscape-5.png</h7>
                  </div>
                </Col>
              </Row>

            </Col>

          </Row>

        </Container>

      </div>
    )
  }
}

export default Content;
