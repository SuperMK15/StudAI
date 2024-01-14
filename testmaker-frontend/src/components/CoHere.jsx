import React, { useState, useEffect } from 'react';
import { CohereClient } from 'cohere-ai';

import { useAddNewQueryMutation } from '../features/queries/queriesApiSlice';

const CoHere = ({ user_id, title, prompt }) => {
  const [prediction, setPrediction] = useState(null);

  const [addNewQuery, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewQueryMutation();

  useEffect(() => {
    const fetchPrediction = async () => {
      const cohere = new CohereClient({
        token: import.meta.env.VITE_COHERE_API_KEY,
      });

      try {
        const result = await cohere.generate({
          prompt: "Make a practice test for the following notes: \n" + prompt + "\n The test should have 10 questions and answers.",
          maxTokens: 1000,
        });

        console.log('Prediction:', result);
        setPrediction(result);
      } catch (error) {
        console.error('Error fetching prediction:', error);
      }
    };

    fetchPrediction();
  }, []);

  useEffect(() => {
    const updateQueries = async () => {
      await addNewQuery({
        user_id: user_id,
        title: title,
        lecture_note_input: prompt,
        test_output: prediction.generations[0].text
      });
    }

    if (prediction && !isLoading && !isSuccess) {
      updateQueries();
    }
  }, [prediction, isLoading, isSuccess]);

  return (
    <div class="m-4 p-4 border rounded-lg bg-gray-100">
      <h1 class="text-lg font-semibold mb-4">Generated Prediction:</h1>
      {prediction ? (
        <pre class="whitespace-pre-wrap font-mono text-sm text-gray-700">
          {prediction.generations[0].text}
        </pre>
      ) : (
        <p class="text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default CoHere;