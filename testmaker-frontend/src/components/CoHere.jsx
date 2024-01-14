import React, { useState, useEffect } from 'react';
import { CohereClient } from 'cohere-ai';

const CoHere = ({ msg }) => {
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      const cohere = new CohereClient({
        token: import.meta.env.VITE_COHERE_API_KEY,
      });

      try {
        const result = await cohere.generate({
          prompt: msg,
          maxTokens: 500,
        });

        console.log('Prediction:', result);
        setPrediction(result);
      } catch (error) {
        console.error('Error fetching prediction:', error);
      }
    };

    fetchPrediction();
  }, []);

  return (
    <div>
      <h1>Generated Prediction:</h1>
      {prediction ? (
        <pre>{prediction.generations[0].text}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CoHere;
