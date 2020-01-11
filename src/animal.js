import React from 'react';

const Animals = ({ animals }) => {
    return (
        <div id="animals">
            {animals.map((animal, i) => (
                <div className="card" key={i}>
                    <h2>{animal.name}</h2>
                    <p>{animal.gender} - {animal.type} - {animal.breeds.primary}</p>
                    <div className="img-wrapper">
                        {animal.photos[0] ? 
                            <img src={animal.photos[0].medium} alt={animal.name}/> 
                            : 
                            <img src="no-image.png" alt="" />}
                    </div>
                    <p>{animal.description}</p>
                    <a href={animal.url} target="_blank" rel="noopener noreferrer" >
                        More Info 
                        {/* 
                            External link icon from FontAwesome used under Creative Commons Attribution 4.0 International License 
                            Link to license: https://fontawesome.com/license
                        */}
                        <img src="external-link-alt-solid.svg" alt="" />
                    </a>
                </div>
            ))}
        </div>
    );
};

export default Animals