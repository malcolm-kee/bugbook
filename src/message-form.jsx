import React from 'react';

export const MessageForm = () => {
  const [message, setMessage] = React.useState('');

  const handleSubmit = ev => {
    ev.preventDefault();

    console.log('form submitted!');
  };

  return (
    <div className="message-form">
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={ev => setMessage(ev.target.value)}
          className="message-form-input"
          placeholder="What're you thinking?"
        />
        {!!message && (
          <button
            type="submit"
            disabled={!message}
            className="button submit-button"
          >
            Post
          </button>
        )}
      </form>
    </div>
  );
};
