import { useState, useEffect } from 'react';
import { tachesAPI, membersAPI } from '../services/api';
import { CheckSquare, Users, Clock, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTaches: 0,
    tachesEnCours: 0,
    tachesTerminees: 0,
    totalMembers: 0
  });
  const [recentTaches, setRecentTaches] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchRecentTaches();
  }, []);

  const fetchStats = async () => {
    try {
      const [tachesResponse, membersResponse] = await Promise.all([
        tachesAPI.getAll(),
        membersAPI.getAll()
      ]);
      
      const taches = tachesResponse.data.tache || [];
      setStats({
        totalTaches: taches.length,
        tachesEnCours: taches.filter(t => t.status === 'en cours').length,
        tachesTerminees: taches.filter(t => t.status === 'terminée').length,
        totalMembers: membersResponse.data.length
      });
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const fetchRecentTaches = async () => {
    try {
      const response = await tachesAPI.getAll({ limit: 5 });
      setRecentTaches(response.data.tache || []);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  const getPriorityColor = (priorite) => {
    switch (priorite) {
      case 'élevée': return 'bg-red-100 text-red-800';
      case 'moyenne': return 'bg-yellow-100 text-yellow-800';
      case 'faible': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tableau de Bord</h1>
        <p className="text-gray-600">Vue d'ensemble de vos tâches et équipes</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Tâches"
          value={stats.totalTaches}
          icon={CheckSquare}
          color="bg-blue-500"
        />
        <StatCard
          title="En Cours"
          value={stats.tachesEnCours}
          icon={Clock}
          color="bg-yellow-500"
        />
        <StatCard
          title="Terminées"
          value={stats.tachesTerminees}
          icon={TrendingUp}
          color="bg-green-500"
        />
        <StatCard
          title="Membres"
          value={stats.totalMembers}
          icon={Users}
          color="bg-purple-500"
        />
      </div>

      {/* Tâches récentes */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Tâches Récentes</h2>
        </div>
        <div className="p-6">
          {recentTaches.length > 0 ? (
            <div className="space-y-4">
              {recentTaches.map((tache) => (
                <div key={tache._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{tache.titre}</h3>
                    <p className="text-sm text-gray-600">{tache.description}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(tache.priorite)}`}>
                        {tache.priorite}
                      </span>
                      <span className="text-xs text-gray-500">
                        Assigné à: {tache.assigneA?.nom || 'Non assigné'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tache.status === 'terminée' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {tache.status}
                    </span>
                    {tache.dateEch && (
                      <p className="text-xs text-gray-500 mt-1">
                        Échéance: {new Date(tache.dateEch).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Aucune tâche trouvée</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;