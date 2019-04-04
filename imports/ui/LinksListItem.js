import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Clipboard from 'clipboard';
import moment from 'moment';

class LinksListItem extends Component {

  state = {
    copiedText: false
  };

  isVisible = () => {
    Meteor.call('links.setVisibility', this.props._id, !this.props.visible)
  }

  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);

    this.clipboard.on('success', () => {
      this.setState({ copiedText: true });
      setTimeout(() => {
        this.setState({ copiedText: false })
      }, 1000);
    }).on('error', () => {
      alert('Unable to copy to clipboard. Please copy manually.');
    })
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  renderStats() {
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
    let visitedMessage = null;

    if (typeof this.props.lastVisitedAt === 'number') {
      let momentNow = moment(this.props.lastVisitedAt)
      visitedMessage = `(last visited ${momentNow.fromNow()})`;
    }

    return <p className="item__message">{this.props.visitedCount} {visitMessage}  {visitedMessage} </p>;
  }

  render() {
    return (
      <div className="item">
        <h2>{this.props.url}</h2>
        <p className="item__message">{this.props.shortUrl}</p>
        {this.renderStats()}
        <a href={this.props.shortUrl} target="_blank" rel="noopener noreferrer nofollow" className="button button--pill">Visit</a>
        <button ref="copy" data-clipboard-text={this.props.shortUrl} className="button--pill">
          {this.state.copiedText ? 'Copied' : 'Copy'}
        </button>
        <button onClick={this.isVisible} className="button--pill">
          {this.props.visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    );
  }
};

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number
}

export default LinksListItem;