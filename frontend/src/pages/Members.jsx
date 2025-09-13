import { useState, useEffect } from 'react';
import { membersAPI } from '../services/api';
import { Plus, Edit, Trash2, User } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    role: 'membre'
  });
  const { success, error } = useToast();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await membersAPI.getAll();
      setMembers(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMember) {
        await membersAPI.update(editingMember._id, formData);
        success('Membre modifié avec succès');
      } else {
        await membersAPI.create(formData);
        success('Membre créé avec succès');
      }
      setShowModal(false);
      setEditingMember(null);
      setFormData({ nom: '', email: '', role: 'membre' });
      fetchMembers();
    } catch (err) {
      error('Erreur lors de l\'opération');
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      nom: member.nom,
      email: member.email,
      role: member.role
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ce membre ?')) {
      try {
        await membersAPI.delete(id);
        success('Membre supprimé avec succès');
        fetchMembers();
      } catch (err) {
        error('Erreur lors de la suppression');
      }
    }
  };

  const getRoleColor = (role) => {
    return role === 'chef' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Membres</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Nouveau Membre</span>
        </button>
      </div>

      {/* Liste des membres */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <div key={member._id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  <User size={24} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{member.nom}</h3>
                  <p className="text-gray-600">{member.email}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${getRoleColor(member.role)}`}>
                    {member.role}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(member._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingMember ? 'Modifier le membre' : 'Nouveau membre'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nom complet"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.nom}
                onChange={(e) => setFormData({...formData, nom: e.target.value})}
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="membre">Membre</option>
                <option value="chef">Chef</option>
              </select>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  {editingMember ? 'Modifier' : 'Créer'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingMember(null);
                    setFormData({ nom: '', email: '', role: 'membre' });
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;