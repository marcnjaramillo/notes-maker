import React, { useState, useRef, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

const AddLink = () => {

  const [url, setUrl] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState();
  const urlRef = useRef(null);

  useEffect(() => {
    Modal.setAppElement('body')
  })

  const onSubmit = (e) => {
    e.preventDefault();
    url;

    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        onClose()
      } else {
        setError(err.reason);
      }
    });
  }

  const onChange = (e) => {
    setUrl(e.target.value.trim());
  }

  const onOpen = () => {
    setIsOpen(true);
  }

  const onClose = () => {
    setUrl('');
    setIsOpen(false);
    setError('');
  }

  return (
    <div>
      <button onClick={onOpen} className="button">+ Add Link</button>
      <Modal 
        isOpen={isOpen} 
        contentLabel="Add link" 
        onAfterOpen={() => urlRef.current.focus()}
        onRequestClose={onClose}
        className="boxed-view__box"
        overlayClassName="boxed-view boxed-view--modal"
      >
        <h1>Add a Link</h1>
        {error ? <p>{error}</p> : undefined}
        <form onSubmit={onSubmit} className="boxed-view__form">
          <input 
            type="text"
            ref={urlRef}
            value={url || ''}
            onChange={onChange}
            placeholder="URL" />
          <button className="button">Add Link</button>
          <button type="button" onClick={onClose} className="button button--secondary">Cancel</button>
        </form>
      </Modal>
    </div>
  )
};

export default AddLink;