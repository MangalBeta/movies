import React, { useState, useEffect } from 'react';
import { Row, Col, Form, InputGroup, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import Slider from 'react-slick'; // For horizontal slider
import MovieCard from '../Component/MovieCard';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../../src/App.css'; // Import the CSS file (if created separately)
import { Search } from 'react-bootstrap-icons';

const HomePage = () => {
  const [movies, setMovies] = useState([]); // Fetched movies from the API
  const [searchQuery, setSearchQuery] = useState(''); // Search query input
  const [sortBy, setSortBy] = useState(''); // Sorting criteria

  const genres = [
    "Action",
    "Crime",
    "Drama",
    "Biography",
    "Fantasy",
    "Romance",
    "Adventure",
    "Horror",
  ];

  // Fetch movies from API on initial render
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3001/movies"); // Replace with your API endpoint
        if(response?.data?.[0]?.movies.length > 0){
          setMovies(response?.data?.[0]?.movies);
        }else{
          setMovies([]);
        }

      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  // Filter and sort movies whenever the input changes
  const filterAndSortMovies = (genreMovies) => {
    // Apply search filter
    let filteredMovies = genreMovies.filter((movie) => {
      return movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Apply sorting based on the sortBy value
    if (sortBy === 'title') {
      filteredMovies = filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'year') {
      filteredMovies = filteredMovies.sort((a, b) => a.year - b.year);
    }

    return filteredMovies;
  };

  // Render movies by genre
  const renderGenreSections = () => {
    return genres.map((genre) => {
      // Filter movies by genre
      const genreMovies = movies.filter((movie) =>
        movie.genre?.includes(genre)
      );

      // Apply search and sort filters to the movies
      const filteredAndSortedMovies = filterAndSortMovies(genreMovies);

      // Only render genre section if there are movies that match the search query
      if (filteredAndSortedMovies.length === 0) return null;

      return (
        <Row key={genre} className="mb-4">
          <Col md={12}>
            <h2>{genre}</h2> {/* Genre heading */}
            <Slider {...sliderSettings}>
              {filteredAndSortedMovies.map((movie) => (
                <div key={movie.id} className="px-2">
                  <MovieCard
                  onDelete={handleDelete}
                  movie={movie} /> {/* Movie card component */}
                </div>
              ))}
            </Slider>
          </Col>
        </Row>
      );
    });
  };

  // Slider settings
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Handle movie deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/movies/${id}`);
      setMovies(movies.filter(movie => movie.id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <Container>
      <h1 className="">Movie Collection</h1>
      
      <Row className="mb-4">
        {/* Search Input */}
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>
              <Search />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search movies by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={6}>
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="title">Title</option>
            <option value="year">Year</option>
          </Form.Select>
        </Col>
      </Row>
      
      {/* Render all genre sections that have matching movies */}
      {renderGenreSections()}
    </Container>
  );
};

export default HomePage;
