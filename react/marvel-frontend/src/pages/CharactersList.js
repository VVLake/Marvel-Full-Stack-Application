import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { getAllCharacters } from '../api/CharacterService';
import { Link } from 'react-router-dom';

const CharactersList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllCharacters()
      .then(res => {
        // Remove duplicates using a Set for IDs
        const seen = new Set();
        const uniqueCharacters = res.data.filter(char => {
          if (seen.has(char.id)) return false;
          seen.add(char.id);
          return true;
        });

        setCharacters(uniqueCharacters);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load characters');
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Row>
      {characters.map(char => (
        <Col key={char.id} sm={6} md={4} lg={3}>
          <Card className="mb-4">
            {char.image_url && (
              <Card.Img
                variant="top"
                src={char.image_url}
                alt={char.name}
                style={{ height: '250px', objectFit: 'cover' }}
              />
            )}
            <Card.Body>
              <Card.Title>{char.name}</Card.Title>
              <Card.Text>
                {char.description?.length > 100
                  ? char.description.slice(0, 100) + '...'
                  : char.description}
              </Card.Text>
              <Link to={`/characters/${char.id}`} className="btn btn-outline-primary">
                View Details
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CharactersList;
