import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';

const API_URL = '/api/users';

function UserList() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showStats, setShowStats] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/stats`);
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats(data.data);
    } catch (err) {
      console.error('Stats error:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Вы уверены, что хотите удалить этого пользователя?')) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Delete failed');
      fetchUsers();
      fetchStats();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = () => {
    setEditingUser(null);
    fetchUsers();
    fetchStats();
  };

  const handleViewPosts = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/${userId}/with-posts`);
      if (!response.ok) throw new Error('Failed to fetch user with posts');
      const data = await response.json();
      alert(`
Пользователь: ${data.data.name}
Email: ${data.data.email}
Всего постов: ${data.data.postCount}

Посты:
${data.data.posts.map(p => `- ${p.title}`).join('\n') || 'Нет постов'}
      `);
    } catch (err) {
      alert('Ошибка: ' + err.message);
    }
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <div className="user-list-container">
      <div className="stats-section">
        <button onClick={() => setShowStats(!showStats)} className="stats-toggle">
          {showStats ? 'Скрыть статистику' : 'Показать статистику'}
        </button>
        
        {showStats && stats && (
          <div className="stats-cards">
            {stats.map(stat => (
              <div key={stat.role} className="stat-card">
                <h3>{stat.role === 'admin' ? 'Администраторы' : 'Пользователи'}</h3>
                <p>Количество: <strong>{stat.count}</strong></p>
                <p>Средний возраст: <strong>{stat.averageAge || '-'} лет</strong></p>
                <details>
                  <summary>Последние 5 пользователей</summary>
                  <ul>
                    {stat.users.map((user, idx) => (
                      <li key={idx}>{user.name} ({user.email})</li>
                    ))}
                  </ul>
                </details>
              </div>
            ))}
          </div>
        )}
      </div>

      <UserForm userToEdit={editingUser} onSave={handleSave} />
      
      <div className="user-list">
        <h2>👥 Список пользователей ({users.length})</h2>
        {users.length === 0 ? (
          <p>Нет пользователей. Создайте первого!</p>
        ) : (
          users.map(user => (
            <div key={user._id} className="user-card">
              <div className="user-info">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <p>Возраст: {user.age || 'не указан'}</p>
                <p>Роль: {user.role === 'admin' ? 'Администратор' : 'Пользователь'}</p>
              </div>
              <div className="user-actions">
                <button onClick={() => handleViewPosts(user._id)} className="view-posts">
                  Посты
                </button>
                <button onClick={() => handleEdit(user)} className="edit">
                  Редактировать
                </button>
                <button onClick={() => handleDelete(user._id)} className="delete">
                  Удалить
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserList;