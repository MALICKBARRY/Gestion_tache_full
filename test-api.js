// Script de test pour vérifier l'API
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testAPI() {
  try {
    // Test de connexion
    console.log('Test de connexion...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: 'test@test.com', // Remplacez par vos identifiants
      password: 'password123'
    });
    
    const token = loginResponse.data.token;
    console.log('✅ Connexion réussie');
    
    // Test récupération des tâches
    console.log('\nTest récupération des tâches...');
    const tachesResponse = await axios.get(`${API_URL}/taches`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('📋 Tâches trouvées:', tachesResponse.data.tache.length);
    console.log('Données:', JSON.stringify(tachesResponse.data, null, 2));
    
  } catch (error) {
    console.error('❌ Erreur:', error.response?.data || error.message);
  }
}

testAPI();