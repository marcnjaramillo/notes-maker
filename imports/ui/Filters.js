import React, { useState, useEffect } from 'react';
import { Session } from 'meteor/session';

const handleChange = (e) => {
  Session.set('showVisible', !e.target.checked)
}

const Filters = () => {

  const [showVisible, setShowVisible] = useState(true);

  useEffect(() => {
    const tracker = Tracker.autorun(() => {
      setShowVisible(Session.get('showVisible'));
    })

    return () => {
      tracker.stop();
    }
  })

  return (
    <div>
      <label className="checkbox">
        <input type="checkbox" checked={!showVisible} onChange={handleChange} className="checkbox__box" />
        Show hidden links
      </label>
    </div>
  )
};

export default Filters;