/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import './App.css';
import { Loader } from './Loader';
import fetchMock from 'fetch-mock';

const apiUrl = process.env.REACT_APP_API_URL!;
const refreshInterval = 10 * 10000; 

const placeholderImage = "data:image/jpeg;base64,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";
const placeholderImage2 = "data:image/jpeg;base64,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";

let counter = 0;

const getFromApi = async () => {
  fetchMock.mock('', {
    image: (counter++) % 2 === 0 ? placeholderImage : placeholderImage2
  });

  const response = await fetch(apiUrl);

  fetchMock.restore();

  return await response.json();
}

const App: React.FC = () => {
  const [image, setImage] = useState(undefined);

  const refreshData = async () => {
    try {
      const responseBody = await getFromApi();

      if (responseBody.image) {
        setImage(responseBody.image);
      }

      setTimeout(refreshData, refreshInterval);
    } catch (e) {
      setTimeout(refreshData, refreshInterval);
    } 
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="App">
      {!!image && <img src={image} alt="image from server" className="meine-image" />}
      {!image && <Loader />}
    </div>
  );
}

export default App;
