import React from 'react';
import { appendPost } from './dom-manipulations';
import { loadImage } from './lib';

export const MessageForm = () => {
  const [message, setMessage] = React.useState('');
  const [img, setImg] = React.useState(null);
  const [imgName, setImgName] = React.useState('');

  const handleFileUpload = ev => {
    const file = ev.target.files[0];

    loadImage(file).then($img => {
      setImg($img);
      setImgName(file.name);
    });

    ev.target.value = null;
  };

  const removeImage = ev => {
    setImg(null);
    setImgName('');
  };

  const handleSubmit = ev => {
    ev.preventDefault();

    appendPost(message, img);

    setMessage('');
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
        <div className="toolbar">
          {img ? (
            <button className="button" onClick={removeImage}>
              Remove {imgName}
            </button>
          ) : (
            <>
              <input
                id="file-upload"
                className="file-input"
                type="file"
                onChange={handleFileUpload}
              />
              <label
                className="file-input-label button"
                htmlFor="file-upload"
                tabIndex={-1}
              >
                Upload
              </label>
            </>
          )}
        </div>
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
