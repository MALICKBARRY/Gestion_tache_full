import { useState, useEffect } from 'react';
import { tachesAPI, membersAPI, usersAPI } from '../services/api';
import { BarChart3, Users, CheckSquare, Clock, TrendingUp, Target, Award, Activity } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Statistics = () => {
  const [stats, setStats] = useState({
    totalTaches: 0,
    tachesTerminees: 0,
    tachesEnCours: 0,
    totalMembers: 0,
    totalUsers: 0,
    prioriteStats: { elevee: 0, moyenne: 0, faible: 0 }
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      // Récupérer les tâches
      const tachesResponse = await tachesAPI.getAll();
      const taches = tachesResponse.data.tache || [];
      
      // Récupérer les membres
      const membersResponse = await membersAPI.getAll();
      const members = membersResponse.data || [];
      
      // Récupérer les utilisateurs (si admin)
      let users = [];
      if (user?.role === 'admin') {
        try {
          const usersResponse = await usersAPI.getAll();
          users = usersResponse.data || [];
        } catch (error) {
          // Pas d'accès aux utilisateurs
        }
      }

      // Calculer les statistiques
      const tachesTerminees = taches.filter(t => t.status === 'terminée').length;
      const tachesEnCours = taches.filter(t => t.status === 'en cours').length;
      
      const prioriteStats = {
        elevee: taches.filter(t => t.priorite === 'élevée').length,
        moyenne: taches.filter(t => t.priorite === 'moyenne').length,
        faible: taches.filter(t => t.priorite === 'faible').length
      };

      setStats({
        totalTaches: taches.length,
        tachesTerminees,
        tachesEnCours,
        totalMembers: members.length,
        totalUsers: users.length,
        prioriteStats
      });
    } catch (error) {
      // Erreur silencieuse
    }
  };

  const StatCard = ({ icon: Icon, title, value, color, description }) => (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  const progressPercentage = stats.totalTaches > 0 ? Math.round((stats.tachesTerminees / stats.totalTaches) * 100) : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Statistiques du Site</h1>
        <p className="text-gray-600 dark:text-gray-400">Vue d'ensemble des performances et activités</p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={CheckSquare}
          title="Total Tâches"
          value={stats.totalTaches}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          description="Toutes les tâches créées"
        />
        <StatCard
          icon={Award}
          title="Tâches Terminées"
          value={stats.tachesTerminees}
          color="bg-gradient-to-r from-green-500 to-green-600"
          description={`${progressPercentage}% de réussite`}
        />
        <StatCard
          icon={Clock}
          title="Tâches En Cours"
          value={stats.tachesEnCours}
          color="bg-gradient-to-r from-orange-500 to-orange-600"
          description="Tâches actives"
        />
        <StatCard
          icon={Users}
          title="Membres d'Équipe"
          value={stats.totalMembers}
          color="bg-gradient-to-r from-purple-500 to-purple-600"
          description="Membres actifs"
        />
      </div>

      {/* Statistiques avancées */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progression globale */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="text-blue-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Progression Globale</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Tâches Terminées</span>
              <span className="font-semibold text-gray-900 dark:text-white">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{stats.tachesTerminees}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Terminées</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{stats.tachesEnCours}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">En cours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Répartition par priorité */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="text-purple-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Répartition par Priorité</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Élevée</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">{stats.prioriteStats.elevee}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Moyenne</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">{stats.prioriteStats.moyenne}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Faible</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">{stats.prioriteStats.faible}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques utilisateurs (admin seulement) */}
      {user?.role === 'admin' && stats.totalUsers > 0 && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="text-indigo-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Statistiques Utilisateurs</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <p className="text-2xl font-bold text-indigo-600">{stats.totalUsers}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Utilisateurs Total</p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{stats.totalMembers}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Membres d'Équipe</p>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{stats.totalTaches}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tâches Créées</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;