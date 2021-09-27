import React from 'react';

// bootstrap
import { Container, Row, Col, Dropdown, ListGroup, Carousel } from '../../styles';

// styling
import './Content.css';

// models
import Image from '../../models/image';

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
        new Image('Landscape-1.png', 'zxd'),
        new Image('Landscape-2.png', 'dsa'),
        new Image('Landscape-3.png', 'rer'),
        new Image('Landscape-4.png', 'ggg'),
        new Image('Landscape-5.png', 'hgt'),
        new Image('Landscape-6.png', 'sdf'),
        new Image('Landscape-7.png', 'lkj'),
        new Image('Landscape-8.png', 'uio'),
        new Image('Landscape-9.png', 'cvb'),
        new Image('Landscape-10.png', 'rfg')
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
    const { fileList, carouselPreviewImages } = this.state;
    this.updateList(fileList, carouselPreviewImages, new Image(data.image.title, data.image.url));
    this.setState({ fileList, carouselPreviewImages });
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
    const { fileList, carouselPreviewImages } = this.state;
    this.updateList(carouselPreviewImages, fileList, new Image(data.image.title, data.image.url));
    this.setState({ fileList, carouselPreviewImages });
    console.log('STATE UPDATED!', this.state.carouselPreviewImages);
  }

  addDraggableListenerToFileList() {
    // add draggable to the file-list
    Array.from(document.getElementsByClassName('list-group-item')).forEach((listGroupItem) => {
      listGroupItem.addEventListener("dragstart", (ev) => {
        // console.log('TARGET', ev, ev.target.attributes['data-url'].value);
        ev.dataTransfer.setData("application/json", JSON.stringify({
          image: new Image(ev.target.innerText, ev.target.attributes['data-url'].value),
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
        // console.log('TARGET', ev, ev.target);
        ev.dataTransfer.setData("application/json", JSON.stringify({
          image: new Image(ev.srcElement.children[1].innerText, ev.target.attributes['data-url'].value),
          source: DRAGGABLE_TYPES.RIGHT_PANE
        }));
      });
    });
  }

  getCarouselImagePreviewItem(carouselImage) {
    return (
      <div className="carousel-preview-container" draggable="true" data-url={carouselImage.url}>
        <div className="carousel-preview-image"></div>
        <h7 className="carousel-preview-image-title">{carouselImage.title}</h7>
      </div>
    )
  }

  updateList(list, srcList, image) {
    let thisImageDoesExist = list.find((val) => (val.url === image.url));
    if (thisImageDoesExist) {
      console.log('This is a duplicate!');  // @TODO wrap into error
    } else {
      list.push(image);
      thisImageDoesExist = srcList.find((val) => (val.url === image.url));
      if (thisImageDoesExist) srcList.splice(srcList.indexOf(thisImageDoesExist), 1);
    }
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
                    this.state.fileList.map((imageFile) =>
                      <ListGroup.Item draggable="true" data-url={imageFile.url}>{imageFile.title}</ListGroup.Item>
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
                      this.getCarouselImagePreviewItem(carouselPreviewImage)
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
