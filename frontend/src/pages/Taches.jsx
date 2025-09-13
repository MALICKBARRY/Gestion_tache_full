import { useState, useEffect } from 'react';
import { tachesAPI, membersAPI } from '../services/api';
import { Plus, Edit, Trash2, Filter } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

const Taches = () => {
  const [taches, setTaches] = useState([]);
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTache, setEditingTache] = useState(null);
  const [filters, setFilters] = useState({ priorite: '', status: '' });
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    priorite: 'moyenne',
    status: 'en cours',
    assigneA: '',
    dateEch: ''
  });
  const { success, error } = useToast();

  useEffect(() => {
    fetchTaches();
    fetchMembers();
  }, [filters]);

  const fetchTaches = async () => {
    try {
      // Nettoyer les filtres vides
      const cleanFilters = {};
      if (filters.priorite) cleanFilters.priorite = filters.priorite;
      if (filters.status) cleanFilters.status = filters.status;
      
      const response = await tachesAPI.getAll(cleanFilters);
      setTaches(response.data.tache || []);
    } catch (error) {
      // Erreur silencieuse
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await membersAPI.getAll();
      setMembers(response.data);
    } catch (error) {
      // Erreur silencieuse
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTache) {
        await tachesAPI.update(editingTache._id, formData);
        success('Tâche modifiée avec succès');
      } else {
        await tachesAPI.create(formData);
        success('Tâche créée avec succès');
      }
      setShowModal(false);
      setEditingTache(null);
      setFormData({ titre: '', description: '', priorite: 'moyenne', status: 'en cours', assigneA: '', dateEch: '' });
      fetchTaches();
    } catch (err) {
      error('Erreur lors de l\'opération');
    }
  };

  const handleEdit = (tache) => {
    setEditingTache(tache);
    setFormData({
      titre: tache.titre,
      description: tache.description,
      priorite: tache.priorite,
      status: tache.status,
      assigneA: tache.assigneA?._id || '',
      dateEch: tache.dateEch ? new Date(tache.dateEch).toISOString().split('T')[0] : ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette tâche ?')) {
      try {
        await tachesAPI.delete(id);
        success('Tâche supprimée avec succès');
        fetchTaches();
      } catch (err) {
        error('Erreur lors de la suppression');
      }
    }
  };

  const getPriorityColor = (priorite) => {
    switch (priorite) {
      case 'élevée': return 'bg-red-100 text-red-800';
      case 'moyenne': return 'bg-yellow-100 text-yellow-800';
      case 'faible': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    return status === 'terminée' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestion des Tâches</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Organisez et suivez vos tâches efficacement</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          <Plus size={20} />
          <span>Nouvelle Tâche</span>
        </button>
      </div>

      {/* Filtres */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filtres:</span>
          </div>
          <select
            value={filters.priorite}
            onChange={(e) => setFilters({...filters, priorite: e.target.value})}
            className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Toutes priorités</option>
            <option value="élevée">Élevée</option>
            <option value="moyenne">Moyenne</option>
            <option value="faible">Faible</option>
          </select>
          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Tous statuts</option>
            <option value="en cours">En cours</option>
            <option value="terminée">Terminée</option>
          </select>
        </div>
      </div>

      {/* Liste des tâches */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {taches.map((tache) => (
          <div key={tache._id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-[1.02] animate-slide-up">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{tache.titre}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(tache)}
                  className="p-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(tache._id)}
                  className="p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{tache.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(tache.priorite)}`}>
                {tache.priorite}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(tache.status)}`}>
                {tache.status}
              </span>
            </div>
            
            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center justify-between">
                <span>Assigné à:</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">{tache.assigneA?.nom || 'Non assigné'}</span>
              </div>
              {tache.dateEch && (
                <div className="flex items-center justify-between">
                  <span>Échéance:</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{new Date(tache.dateEch).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-8 rounded-2xl w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-700 animate-slide-up">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              {editingTache ? 'Modifier la tâche' : 'Nouvelle tâche'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Titre"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.titre}
                onChange={(e) => setFormData({...formData, titre: e.target.value})}
              />
              <textarea
                placeholder="Description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.priorite}
                onChange={(e) => setFormData({...formData, priorite: e.target.value})}
              >
                <option value="faible">Faible</option>
                <option value="moyenne">Moyenne</option>
                <option value="élevée">Élevée</option>
              </select>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="en cours">En cours</option>
                <option value="terminée">Terminée</option>
              </select>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.assigneA}
                onChange={(e) => setFormData({...formData, assigneA: e.target.value})}
              >
                <option value="">Sélectionner un membre</option>
                {members.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.nom} ({member.role})
                  </option>
                ))}
              </select>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.dateEch}
                onChange={(e) => setFormData({...formData, dateEch: e.target.value})}
              />
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  {editingTache ? 'Modifier' : 'Créer'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingTache(null);
                    setFormData({ titre: '', description: '', priorite: 'moyenne', status: 'en cours', assigneA: '', dateEch: '' });
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

export default Taches;