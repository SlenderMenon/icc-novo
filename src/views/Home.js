import React from 'react';

// bootstrap

// styling
import './Home.css';

// components
import Titlebar from '../components/Titlebar/Titlebar';
import Content from '../components/Content/Content';
import Message from '../components/Message/Message';

export class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: {
        type: 'neutral',
        info: 'Idle'
      },
      carouselConfig: [],
      forceReRender: 0,
    }
  }

  getCarouselConfig = () => {
    return this.state.carouselConfig;
  }
  setCarouselConfig = (carouselConfig, mustForceReRender) => {
    this.setState({
      carouselConfig,
      forceReRender: mustForceReRender ? Math.random() : this.state.forceReRender
    });
  }

  setMessage = (type, info) => {
    this.setState({
      message: { type, info }
    });
  }

  render() {
    return (
      <div className="home-component">
        <Titlebar setMessage={this.setMessage} carouselConfig={this.state.carouselConfig} setCarouselConfig={this.setCarouselConfig} />
        <Content setMessage={this.setMessage} carouselConfig={this.state.carouselConfig} setCarouselConfig={this.setCarouselConfig} forceReRender={this.state.forceReRender} />
        <Message message={this.state.message} />
      </div>
    )
  }
}

export default Home;
