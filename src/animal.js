import React from 'react';

const Animals = ({ animals }) => {
    return (
        <div id="animals">
            {animals.map((animal, i) => (
                <div className="card" key={i}>
                    <h2>{animal.name}</h2>
                    <p>{animal.gender} - {animal.type} - {animal.breeds.primary}</p>
                    <div className="img-wrapper">
                        {animal.photos[0] ? <img src={animal.photos[0].medium} alt={animal.name} /> : <img src="no-image.png" alt="" />}
                    </div>
                    <p>{animal.description}</p>
                    <a href={animal.url} target="_blank" rel="noopener noreferrer" >More Info &#x1f875;</a>
                </div>
            ))}
        </div>
    );
};

export default Animals