import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { createCharacter, getCharacterById, updateCharacter } from '../api/CharacterService';

export default function CharacterForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    alias: '',
    alignment: '',
    powers: '',
    image_url: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (id) {
      setLoading(true);
      getCharacterById(id)
        .then(({ data }) => {
          setFormData({
            name: data.name || '',
            alias: data.alias || '',
            alignment: data.alignment || '',
            powers: data.powers || '',
            image_url: data.image_url || '',
          });
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to load character data.');
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (id) {
        await updateCharacter(id, formData);
        setSuccess('Character updated successfully!');
      } else {
        await createCharacter(formData);
        setSuccess('Character created successfully!');
      }

      setTimeout(() => navigate('/characters'), 1500);
    } catch {
      setError('There was a problem submitting the form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Character' : 'Create Character'}</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter character name"
          />
        </Form.Group>

        <Form.Group controlId="alias" className="mb-3">
          <Form.Label>Alias</Form.Label>
          <Form.Control
            type="text"
            name="alias"
            value={formData.alias}
            onChange={handleChange}
            required
            placeholder="Enter character alias"
          />
        </Form.Group>

        <Form.Group controlId="alignment" className="mb-3">
          <Form.Label>Alignment</Form.Label>
          <Form.Control
            type="text"
            name="alignment"
            value={formData.alignment}
            onChange={handleChange}
            required
            placeholder="Enter alignment (e.g., hero, villain)"
          />
        </Form.Group>

        <Form.Group controlId="powers" className="mb-3">
          <Form.Label>Powers</Form.Label>
          <Form.Control
            type="text"
            name="powers"
            value={formData.powers}
            onChange={handleChange}
            required
            placeholder="Enter character powers (comma-separated)"
          />
        </Form.Group>

        <Form.Group controlId="imageUrl" className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            id ? 'Update Character' : 'Create Character'
          )}
        </Button>
      </Form>
    </div>
  );
}
