import React from 'react';

const Animals = ({ animals }) => {
    return (
        <div>
            {animals.map((animal, i) => (
                <div className="card" key={i}>
                    <h2>{animal.name}</h2>
                    <div className="img-wrapper">
                        {animal.photos[0] ? <img src={animal.photos[0].medium} alt={animal.name} /> : 'No Picture Available'}
                    </div>
                    <p>{animal.description}</p>
                    <a href={animal.url} target="_blank" rel="noopener noreferrer" >More Information</a>
                </div>
            ))}
        </div>
    );
};

export default Animals