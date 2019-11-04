import React from 'react';

const Animals = ({ animals }) => {
    return (
        <div>
            <h1>Animals list</h1>
            {animals.map((animal, i) => (
                <div className="card" key={i}>
                    <h2>{animal.name}</h2>
                    {animal.photos[0] ? <img src={animal.photos[0].medium} alt={animal.name} /> : 'No Picture Available'}
                    <p>{animal.description}</p>
                    <a href={animal.url} target="_blank" rel="noopener noreferrer" >More Information</a>
                </div>
            ))}
        </div>
    );
};

export default Animals