import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Badge, Spinner } from "react-bootstrap";
import { Star, ExternalLink } from 'lucide-react';

const SingleMovie = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3001/movies/${id}`);
                setMovie(response.data);
            } catch (err) {
                setError("Failed to load movie details");
                console.error("Error fetching movie:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center py-5">
                <h3 className="text-danger mb-4">{error}</h3>
                <Button variant="primary" onClick={() => navigate("/")}>
                    Back to Home
                </Button>
            </Container>
        );
    }

    return movie ? (
        <Container className="py-5">
            <Row className="g-4">
                <Col md={4}>
                    <Card className="border-0 shadow">
                        <Card.Img
                            variant="top"
                            src={movie.big_image}
                            alt={movie.title}
                            className="img-fluid"
                            style={{ 
                                height: "500px", 
                                objectFit: "cover",
                                borderRadius: "0.5rem"
                            }}
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/500x750?text=No+Image+Available";
                            }}
                        />
                    </Card>
                </Col>

                <Col md={8}>
                    <div className="ps-md-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>

                                <h1 className="mb-2">{movie.title} ({movie.year})</h1>
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className="d-flex align-items-center">
                                        <Star className="text-warning me-1" size={20} fill="gold" />
                                        <span className="fw-bold">{movie.rating}</span>
                                        <span className="text-muted">/10</span>
                                    </div>
                                    <Badge bg="secondary">Rank #{movie.rank}</Badge>
                                    <a 
                                        href={movie.imdb_link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="btn btn-warning btn-sm d-flex align-items-center gap-1"
                                    >
                                        IMDb <ExternalLink size={14} />
                                    </a>
                                </div>
                            </div>
                          
                        </div>

                        <div className="mb-4">
                            {Array.isArray(movie.genre) ? (
                                movie.genre.map((genre, index) => (
                                    <Badge 
                                        bg="primary" 
                                        className="me-2 mb-2"
                                        key={index}
                                    >
                                        {genre}
                                    </Badge>
                                ))
                            ) : (
                                movie.genre?.split(',').map((genre, index) => (
                                    <Badge 
                                        bg="primary" 
                                        className="me-2 mb-2"
                                        key={index}
                                    >
                                        {genre.trim()}
                                    </Badge>
                                ))
                            )}
                        </div>

                        <Card className="bg-light border-0 mb-4">
                            <Card.Body>
                                <h5 className="text-primary mb-3">Overview</h5>
                                <p className="text-muted mb-0" style={{ lineHeight: "1.8" }}>
                                    {movie.description}
                                </p>
                            </Card.Body>
                        </Card>

                        <Card className="border-0 shadow-sm">
                            <Card.Body>
                                <Row className="g-3">
                                    <Col sm={4}>
                                        <h6 className="text-primary mb-1">Rating</h6>
                                        <p className="mb-0 d-flex align-items-center">
                                            <Star className="text-warning me-1" size={16} fill="gold" />
                                            {movie.rating}/10
                                        </p>
                                    </Col>
                                    <Col sm={4}>
                                        <h6 className="text-primary mb-1">Year</h6>
                                        <p className="mb-0">{movie.year}</p>
                                    </Col>
                                    <Col sm={4}>
                                        <h6 className="text-primary mb-1">Rank</h6>
                                        <p className="mb-0">#{movie.rank}</p>
                                    </Col>
                                </Row>
                                <Button 
                                variant="btn btn-outline-primary float-right mt-5" 
                                onClick={() => navigate("/")}
                            >
                                Back to Movies
                            </Button>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
    ) : null;
};

export default SingleMovie;