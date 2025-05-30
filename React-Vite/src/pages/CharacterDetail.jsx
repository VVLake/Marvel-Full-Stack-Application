import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCharacterById, deleteCharacter } from '../api/CharacterService';
import { Spinner, Alert, Card, Button } from 'react-bootstrap';

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
      .catch(() => {
        setError('Failed to load character');
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this character?')) {
      deleteCharacter(id)
        .then(() => navigate('/'))
        .catch(() => alert('Failed to delete character'));
    }
  };

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{character.name}</Card.Title>
        <Card.Text>{character.powers}</Card.Text>
        <Button onClick={() => navigate(`/edit/${character.id}`)} variant="warning">Edit</Button>{' '}
        <Button onClick={handleDelete} variant="danger">Delete</Button>{' '}
        <Button onClick={() => navigate('/')} variant="secondary">Back</Button>
      </Card.Body>
    </Card>
  );
};

export default CharacterDetail;
