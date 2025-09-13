import { useState, useEffect } from 'react';
import { usersAPI } from '../services/api';
import { Trash2, Shield, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Users = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      const response = await usersAPI.getAll();
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cet utilisateur ?')) {
      try {
        await usersAPI.delete(id);
        fetchUsers();
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await usersAPI.updateRole(id, newRole);
      fetchUsers();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Accès refusé - Administrateur requis</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((userItem) => (
          <div key={userItem._id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  <User size={24} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{userItem.nom}</h3>
                  <p className="text-gray-600">{userItem.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <select
                      value={userItem.role}
                      onChange={(e) => handleRoleChange(userItem._id, e.target.value)}
                      className="text-xs border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      userItem.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {userItem.role === 'admin' && <Shield size={12} className="mr-1" />}
                      {userItem.role}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Créé le: {new Date(userItem.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDelete(userItem._id)}
                  className="text-red-600 hover:text-red-800"
                  disabled={userItem._id === user.id}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;