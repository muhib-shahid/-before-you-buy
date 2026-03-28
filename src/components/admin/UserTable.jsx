// import './UserTable.css';

const UserTable = ({ users, onBan, onMakeAdmin }) => {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Joined</th>
          <th>Admin</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{new Date(user.created_at).toLocaleDateString()}</td>
            <td>{user.is_admin ? 'Yes' : 'No'}</td>
            <td>
              {!user.is_admin && (
                <button onClick={() => onMakeAdmin(user.id)}>Make Admin</button>
              )}
              <button onClick={() => onBan(user.id)} className="ban">Ban</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;