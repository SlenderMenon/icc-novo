import React from 'react';
import axios from 'axios';

// bootstrap
import { Container, Row, Col, Dropdown, ListGroup, Carousel } from '../../styles';

// styling
import './Content.css';

// services
import services from '../../apis';

// models
import Image from '../../models/image';

// utilities
import constants from '../../constants';

// variables
const DRAGGABLE_TYPES = {
  LEFT_PANE: 'left-pane-draggable',
  RIGHT_PANE: 'right-pane-draggable',
}

export class Content extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      dropdownSelected: 'Select Topic',
      fileList: [],
      carouselPreviewImages: [],
      unsplashPhotos: []
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
    const isSourceNotRightPane = data.source !== DRAGGABLE_TYPES.RIGHT_PANE;
    const isThisLastImageInCarousel = this.state.carouselPreviewImages.length === 1;
    if (isSourceNotRightPane || isThisLastImageInCarousel) {
      this.props.setMessage('error',  isSourceNotRightPane
        ? `Cannot drop image here.`
        : `This is the last image in the carousel.`);
      return;
    }
    const { fileList, carouselPreviewImages } = this.state;
    this.updateList(fileList, carouselPreviewImages, new Image(data.image.title, data.image.url));
    this.setState({ fileList, carouselPreviewImages });
    this.props.setMessage('success', `"${data.image.title}" image was removed from the carouseel.`);
  }

  dropOverCarouselPicker = (ev) => {
    ev.preventDefault();
    console.log(ev.dataTransfer.getData("application/json"));
    const data = JSON.parse(ev.dataTransfer.getData("application/json"));
    if (data.source !== DRAGGABLE_TYPES.LEFT_PANE) {
      this.props.setMessage('error', `Cannot drop image here.`);
      return;
    }
    const { fileList, carouselPreviewImages } = this.state;
    this.updateList(carouselPreviewImages, fileList, new Image(data.image.title, data.image.url));
    this.setState({ fileList, carouselPreviewImages });
    this.props.setMessage('success', `"${data.image.title}" image was added to the carousel.`);
  }

  addDraggableListenerToFileList() {
    // add draggable to the file-list
    Array.from(document.getElementsByClassName('list-group-item')).forEach((listGroupItem) => {
      listGroupItem.addEventListener("dragstart", (ev) => {
        const topic = ev.target.innerText;
        ev.dataTransfer.setData("application/json", JSON.stringify({
          image: Image.fromJSON(ev.target.attributes['data-image'].value),
          source: DRAGGABLE_TYPES.LEFT_PANE
        }));
        console.log(topic);
      });
    });
  }

  addDraggableListenerToCarouselPicker() {
    // add draggable to the carousel-picker
    Array.from(document.getElementsByClassName('carousel-preview-container')).forEach((carouselPreviewItem) => {
      carouselPreviewItem.addEventListener("dragstart", (ev) => {
        console.log('TARGET', ev, ev.target, ev.target.attributes['data-image'].value);
        ev.dataTransfer.setData("application/json", JSON.stringify({
          image: Image.fromJSON(ev.target.attributes['data-image'].value),
          source: DRAGGABLE_TYPES.RIGHT_PANE
        }));
      });
    });
  }

  getCarouselImagePreviewItem(carouselImage) {
    return (
      <div className="carousel-preview-container" draggable="true" data-image={carouselImage.asJSONString()}>
        <div className="carousel-preview-image" data-image={carouselImage.asJSONString()}>
          <img src={carouselImage.url} data-image={carouselImage.asJSONString()}></img>
        </div>
        <h7 className="carousel-preview-image-title text-center" data-image={carouselImage.asJSONString()}>{carouselImage.title}</h7>
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

  handleDropdownClick = async (ev) => {
    this.setState({ dropdownSelected: '...' });
    const topic = ev.target.innerText;
    this.props.setMessage('info', `Loading count ...`);
    const count = await services.getCount(topic);
    if (!count) {
      this.setState({ dropdownSelected: 'Select Topic' });
      return;
    }
    this.props.setMessage('success', `Got count of images in "${topic}".`);
    this.setState({ dropdownSelected: topic });

    // call unplash for list of images
    this.props.setMessage('info', `Loading images from Unsplash ...`);
    const unsplashPhotos = await this.getUnsplashPhotos(topic, count);
    const fileList = unsplashPhotos.map((photo, i) => new Image(`${topic}-${i + 1}`, photo.urls.small));
    const fileListLastIndexInCarousel = fileList.length >= constants.DEFAULT_CAROUSEL_IMAGE_COUNT ? 8 : fileList.length;
    const carouselPreviewImages = fileList.slice(0, fileListLastIndexInCarousel);
    fileList.splice(0, fileListLastIndexInCarousel);
    console.log(fileList);
    if (unsplashPhotos) this.setState({
      unsplashPhotos,
      fileList,
      carouselPreviewImages
    });
    this.props.setMessage('success', `Got ${count} images from Unsplash for "${topic}".`);
  }

  async getUnsplashPhotos(topic, count) {
    let photos = [];
    for (let i = 1; true; i++) {
      photos.push(...await services.getPhotos(topic, i));
      if (photos.length >= count) return photos.splice(0, count);
    }
  }

  async componentDidMount() {
    const topics = await services.getTopics();
    if (topics) {
      this.setState({ topics });
      this.props.setMessage('success', `Got list of categories.`);
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
                    {
                      this.state.topics.map((topic) =>
                        <Dropdown.Item href="#" onClick={this.handleDropdownClick}>{topic}</Dropdown.Item>
                      )
                    }
                    {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div className="file-list-container" onDragOver={this.dragOver} onDrop={this.dropOverFilePicker}>
                <h6>Files</h6>
                <ListGroup>
                  {
                    this.state.fileList.map((imageFile) =>
                      <ListGroup.Item draggable="true" data-image={imageFile.asJSONString()}>{imageFile.title}</ListGroup.Item>
                    )
                  }
                </ListGroup>
              </div>

            </Col>

            <Col className="center-pane" lg="9">

              <Row className="carousel-container">
                <Col>
                  <Carousel variant="dark" className="carousel-element" interval={null}>
                    {
                      this.state.carouselPreviewImages.map((carouselImage) =>
                        <Carousel.Item>
                          <img
                            className="carousel-image img-responsive"
                            src={carouselImage.url}
                            alt={carouselImage.title}
                          />
                          {/* <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                      </Carousel.Caption> */}
                        </Carousel.Item>)
                    }
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
