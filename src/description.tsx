import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';

const RandomValueComponentDescription: React.FC<{randomNumber: number}> = ({randomNumber}) => {
  const [description, setDescription] = useState<string | null>(null);
  useEffect(() => {
    const fetchRandomValue = async () => {
      const query = `
        query ($id: Int) {
          Media (id: $id) {
            description(asHtml: true)
          }
        }
        `;

      const variables = {
        id: randomNumber
      };
      
      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          variables: variables
        }),
      });

      const { data } = await response.json();
      console.log(data);
      setDescription(data.Media.description);
    };

    fetchRandomValue();
  }, []);

  return (
    <div>
      {description ? (
        <div>{parse(description)}</div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RandomValueComponentDescription;