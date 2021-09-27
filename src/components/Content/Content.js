import React from 'react';

// bootstrap
import { Container, Row, Col, Dropdown, ListGroup, Carousel } from '../../styles';

// styling
import './Content.css';

// components

// variables
const DRAGGABLE_TYPES = {
  LEFT_PANE: 'left-pane-draggable',
  RIGHT_PANE: 'right-pane-draggable',
}

export class Content extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dropdownSelected: 'Select Topic',
      fileList: [
        'Landscape-1.png',
        'Landscape-2.png',
        'Landscape-3.png',
        'Landscape-4.png',
        'Landscape-5.png',
        'Landscape-6.png',
        'Landscape-7.png',
        'Landscape-8.png',
        'Landscape-9.png',
        'Landscape-10.png'
      ],
      carouselPreviewImages: [],
    }

    window.addEventListener('DOMContentLoaded', () => {
      this.addDraggableListenerToFileList();
    });
  }

  dragOver = (ev) => {
    ev.preventDefault();
  }

  dropOverFilePicker = (ev) => {
    ev.preventDefault();
    console.log(ev.dataTransfer.getData("application/json"));
    const data = JSON.parse(ev.dataTransfer.getData("application/json"));
    if (data.source !== DRAGGABLE_TYPES.RIGHT_PANE) {
      console.log('Cannot drop here!');  // @TODO set error status
      return;
    }
    const { fileList } = this.state;
    fileList.push(data.title);
    this.setState({ fileList });
    console.log('STATE UPDATED!', this.state.fileList);
  }

  dropOverCarouselPicker = (ev) => {
    ev.preventDefault();
    console.log(ev.dataTransfer.getData("application/json"));
    const data = JSON.parse(ev.dataTransfer.getData("application/json"));
    if (data.source !== DRAGGABLE_TYPES.LEFT_PANE) {
      console.log('Cannot drop here!');  // @TODO set error status
      return;
    }
    const { carouselPreviewImages } = this.state;
    carouselPreviewImages.push({
      title: data.title
    });
    this.setState({ carouselPreviewImages });
    console.log('STATE UPDATED!', this.state.carouselPreviewImages);
  }

  addDraggableListenerToFileList() {
    // add draggable to the file-list
    Array.from(document.getElementsByClassName('list-group-item')).forEach((listGroupItem) => {
      listGroupItem.addEventListener("dragstart", (ev) => {
        ev.dataTransfer.setData("application/json", JSON.stringify({
          title: ev.target.innerText,
          source: DRAGGABLE_TYPES.LEFT_PANE
        }));
        console.log(ev.target.innerText);
      });
    });
  }

  addDraggableListenerToCarouselPicker() {
    // add draggable to the carousel-picker
    Array.from(document.getElementsByClassName('carousel-preview-container')).forEach((carouselPreviewItem) => {
      carouselPreviewItem.addEventListener("dragstart", (ev) => {
        console.log(ev);
        ev.dataTransfer.setData("application/json", JSON.stringify({
          title: ev.srcElement.children[1].innerText,
          source: DRAGGABLE_TYPES.RIGHT_PANE
        }));
      });
    });
  }

  getCarouselImagePreviewItem(imageName) {
    return (
      <div className="carousel-preview-container" draggable="true">
        <div className="carousel-preview-image"></div>
        <h7 className="carousel-preview-image-title">{imageName}</h7>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { prevFileList, prevCarouselPreviewImages } = prevState;
    const { fileList, carouselPreviewImages } = this.state;    
    if (!prevFileList && fileList || fileList.length !== prevFileList.length) this.addDraggableListenerToFileList();
    if (!prevCarouselPreviewImages && carouselPreviewImages || prevCarouselPreviewImages.length !== carouselPreviewImages.length) this.addDraggableListenerToCarouselPicker();
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
                <ListGroup onDragOver={this.dragOver} onDrop={this.dropOverFilePicker}>
                  {
                    this.state.fileList.map((fileName) =>
                      <ListGroup.Item draggable="true">{fileName}</ListGroup.Item>
                    )
                  }
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
                <Col id="coursel-images-drop-container" onDragOver={this.dragOver} onDrop={this.dropOverCarouselPicker}>
                  {
                    this.state.carouselPreviewImages.map((carouselPreviewImage) =>
                      this.getCarouselImagePreviewItem(carouselPreviewImage.title)
                    )
                  }
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
