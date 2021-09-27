import React from 'react';

// bootstrap

// styling
import './Message.css';

export class Message extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"message-component d-flex align-items-center p-1 " + this.props.message.type}>
        <span>Status: <strong>{this.props.message.info}</strong></span>
      </div>
    )
  }
}

export default Message;
