import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const MovieCard = ({ movie, onDelete }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="h-100 movie-card">
        <NavLink to={`/movie/${movie.id}`}>
      <div className="image-container" >
        {!imageError ? (
          <Card.Img
            variant="top"
            src={movie.big_image}
            alt={movie.title}
            onError={handleImageError}
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              transform: 'scale(1)',
              transition: 'transform 0.3s ease'
            }}
          />
        ) : (
          <div className="placeholder-image d-flex align-items-center justify-content-center h-100 bg-secondary text-white">
            {movie.title[0]}
          </div>
        )}
      </div>
      </NavLink>
      <Card.Body className="d-flex flex-column">

        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          Year: {movie.year}
        </Card.Text>
        <div className="mt-auto d-flex justify-content-between">
          {/* <Link to={`/movie/${movie.id}`}>
            <Button variant="primary">View Details</Button>
          </Link> */}
          <Button 
            variant="danger"
            onClick={() => onDelete(movie.id)}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;