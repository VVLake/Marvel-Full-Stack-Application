import axios from 'axios';

const API_BASE = 'http://localhost:5050/api';

// GET all characters
export const getAllCharacters = () => {
  return axios.get(`${API_BASE}/characters`);
};

// GET character by ID
export const getCharacterById = (id) => {
  return axios.get(`${API_BASE}/characters/${id}`);
};

// POST create new character
export const createCharacter = (characterData) => {
  return axios.post(`${API_BASE}/characters`, characterData);
};

// PUT update character by ID
export const updateCharacter = (id, characterData) => {
  return axios.put(`${API_BASE}/characters/${id}`, characterData);
};

// DELETE character
export const deleteCharacter = (id) => {
  return axios.delete(`${API_BASE}/characters/${id}`);
};
