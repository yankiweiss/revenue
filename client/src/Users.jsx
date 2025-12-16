import { useEffect } from "react";
import { useState } from "react";

function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3500/register");

        const data = await res.json();

        setUsers(data);

       
      } catch (error) {
        console.error("Fetch Error");
      }
    };
    fetchUsers();
  }, [users]);

  

  return (
    <>
          <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
          </tr>
        </thead>
      <tbody>
        {users.map((user) => {
            return (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
          </tr>
            )
        })}
      </tbody>
      </table>
      </>
    
  );
}

export default User;
