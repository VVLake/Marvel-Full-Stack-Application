import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCharacterById } from '../api/CharacterService';
import { Spinner, Alert, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getCharacterById(id)
      .then(res => {
        setCharacter(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load character');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{character.name}</Card.Title>
        <Card.Text>{character.description}</Card.Text>
        <Button onClick={() => navigate(`/edit/${character.id}`)} variant="warning">Edit</Button>{' '}
        <Button onClick={() => navigate('/')} variant="secondary">Back</Button>
      </Card.Body>
    </Card>
  );
};

export default CharacterDetail;
