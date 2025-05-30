import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { getAllCharacters } from '../api/CharacterService';

export default function Home() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllCharacters()
      .then(({ data }) => {
        setFeatured(
          data.slice(0, 3).map(char => ({
            ...char,
            description: char.description || 'No description available',
          }))
        );
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load characters');
        setLoading(false);
      });
  }, []);

  return (
    <Container className="mt-5">
      {/* Welcome Section */}
      <Row className="justify-content-center text-center mb-5">
        <Col md={8}>
          <h1>Welcome to the Marvel Characters Database</h1>
          <p className="lead">
            Explore your favorite Marvel characters, add new ones, and manage your collection.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/characters')}
          >
            View All Characters
          </Button>
        </Col>
      </Row>

      {/* Featured Characters Section */}
      <h2 className="mb-4">Featured Characters</h2>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {!loading && !error && featured.map(character => (
          <Col key={character.id} sm={12} md={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={character.image_url || 'https://via.placeholder.com/300x200'}
                alt={character.name}
              />
              <Card.Body>
                <Card.Title>{character.name}</Card.Title>
                <Card.Text>
                  {character.description.length > 100
                    ? character.description.substring(0, 100) + '...'
                    : character.description}
                </Card.Text>
                <Link to={`/characters/${character.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
