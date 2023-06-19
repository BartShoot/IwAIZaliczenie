import React, { useEffect, useState } from 'react';

const RandomValueComponent: React.FC<{randomNumber: number}> = ({randomNumber}) => {
    const [titleText, setTitleText] = useState<string | null>(null);
    const [titleEnglish, setTitleEnglish] = useState<string | null>(null);
    const [titleNative, setTitleNative] = useState<string | null>(null);


    useEffect(() => {
        const fetchRandomValue = async () => {
            const query = `
            query ($id: Int) {
            Media (id: $id) {
                title {
                romaji
                english
                native
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
            setTitleText(data.Media.title.romaji);
            setTitleEnglish(data.Media.title.english);
            setTitleNative(data.Media.title.native);
        };

        fetchRandomValue();
    }, []);

    return (
        <div>
            {titleText ? (
                <div>
                    <h1>{titleText}</h1>
                    <h2>{titleNative}</h2>
                    <h2>{titleEnglish}</h2>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default RandomValueComponent;