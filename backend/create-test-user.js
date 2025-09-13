const mongoose = require('mongoose');
const User = require('./models/User');
const Member = require('./models/Member');
require('dotenv').config();

async function createTestUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connexion MongoDB réussie');

    // Créer un utilisateur de test
    const testUser = await User.create({
      nom: 'Test User',
      email: 'test@test.com',
      password: 'password123',
      role: 'admin'
    });
    console.log('✅ Utilisateur créé:', testUser.email);

    // Créer un membre chef
    const chef = await Member.create({
      nom: 'Chef Test',
      email: 'chef@test.com',
      role: 'chef',
      creePar: testUser._id
    });
    console.log('✅ Chef créé:', chef.nom);

    // Créer un membre normal
    const membre = await Member.create({
      nom: 'Membre Test',
      email: 'membre@test.com',
      role: 'membre',
      creePar: testUser._id
    });
    console.log('✅ Membre créé:', membre.nom);

    console.log('\n🎉 Données de test créées avec succès!');
    console.log('📧 Email: test@test.com');
    console.log('🔑 Mot de passe: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

createTestUser();