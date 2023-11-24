// This is the component you can render if you need a button with an icon image. Eg. OpenAI, Mailchimp etc.
// You can render an array of this component with appropriate css for the display.
// Pass the url of the image you want to display as a button (relative path)
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { callApi } from '../src/api'; // Replace with the function from api.js

const ImageButton = ({ imageUrl }) => {
  const [isApiCallPending, setApiCallPending] = useState(false);

  const handleButtonClick = () => {
    if (!isApiCallPending) {
      setApiCallPending(true);
      callApi()
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          setApiCallPending(false);
        });
    }
  };

  return (
    <div>
      <img src={imageUrl} alt="Button Image" />
      <button onClick={handleButtonClick} disabled={isApiCallPending}>
        {isApiCallPending ? 'Loading...' : 'Click me'} 
      </button>
    </div>
  );
};

ImageButton.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default ImageButton;
