import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { createCharacter, getCharacterById, updateCharacter } from '../api/CharacterService';

export default function CharacterForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load existing character data if editing
  useEffect(() => {
    if (id) {
      setLoading(true);
      getCharacterById(id)
        .then(({ data }) => {
          setFormData({
            name: data.name || '',
            description: data.description || '',
            // populate other fields
          });
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to load character data.');
          setLoading(false);
        });
    }
  }, [id]);

  // Handle form input changes
  function handleChange(e) {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // Handle form submit for create or update
  async function handleSubmit(e) {
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
      setLoading(false);
      // Redirect after a short delay
      setTimeout(() => navigate('/characters'), 1500);
    } catch {
      setError('There was a problem submitting the form.');
      setLoading(false);
    }
  }

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

        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Enter description"
          />
        </Form.Group>

        <Form.Group controlId="imageUrl">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            name="image_url"
            value={formData.image_url || ''}
            onChange={handleChange}
          />
        </Form.Group>


        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : (id ? 'Update Character' : 'Create Character')}
        </Button>
      </Form>
    </div>
  );
}
