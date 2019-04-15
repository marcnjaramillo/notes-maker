import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes';

export class Editor extends Component {

  state = {
    title: '',
    body: ''
  }

  handleTitleChange = (e) => {
    const title = e.target.value;
    this.setState({ title });
    this.props.call('notes.update', this.props.note._id, { title });
  };

  handleBodyChange = (e) => {
    const body = e.target.value;
    this.setState({ body });
    this.props.call('notes.update', this.props.note._id, { body });
  };

  handleRemoval = () => {
    this.props.call('notes.remove', this.props.note._id);
    this.props.history.push('/dashboard');
    this.props.Session.set('selectedNoteId', '');
  };

  componentDidUpdate(prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      });
    }
  };

  componentDidMount() {
    if (this.props.match) {
      this.props.Session.set('selectedNoteId', this.props.match.params.id)
    }
  };

  render() {
    if (this.props.note) {
      return (
        <div className="editor">
          <input className="editor__title" value={this.state.title} placeholder="Untitled note" onChange={this.handleTitleChange}/>
          <textarea className="editor__body" value={this.state.body} placeholder="Create your note here" onChange={this.handleBodyChange}></textarea>
          <div>
            <button className="button button--secondary" onClick={this.handleRemoval}>Delete Note</button>
          </div>
        </div>
      )
    } else {
      return (      
        <div className="editor">
          <p className="editor__message">{this.props.selectedNoteId ? 'Note not found.' : 'Pick or create a note to get started.'}</p>
        </div>
      )
    }
  };
};

Editor.propTypes = {
  note: PropTypes.object,
  selectedNoteId: PropTypes.string,
  call: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired

};

export default withRouter(withTracker(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    Session
  }
})(Editor));


