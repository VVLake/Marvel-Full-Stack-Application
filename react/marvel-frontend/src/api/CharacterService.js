import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000';

export const getAllCharacters = () => axios.get(`${BASE_URL}/characters`);

export const getCharacterById = (id) => axios.get(`${BASE_URL}/characters/${id}`);

export const createCharacter = (characterData) => axios.post(`${BASE_URL}/characters`, characterData);

export const updateCharacter = (id, characterData) => axios.put(`${BASE_URL}/characters/${id}`, characterData);

export const deleteCharacter = (id) => axios.delete(`${BASE_URL}/characters/${id}`);
