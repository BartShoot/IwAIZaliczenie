import React, { useEffect, useState } from 'react';

const RandomValueComponentImage: React.FC<{ randomNumber: number }> = ({ randomNumber }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomValue = async () => {
      const query = `
        query ($id: Int) {
          Media (id: $id) {
            coverImage {
              extraLarge
            }
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
      setImageUrl(data.Media.coverImage.extraLarge);
    };

    fetchRandomValue();
  }, []);

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="Media Cover" height={450}/>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RandomValueComponentImage;

