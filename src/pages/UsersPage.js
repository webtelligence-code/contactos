import axios from 'axios';
import React, { useEffect, useState } from 'react'
import UserTable from '../components/UsersTable';

const UsersPage = ({ title }) => {
    const [users, setUsers] = useState([]);

    // This useEffect will run on page reload
    useEffect(() => {
        document.title = title

        const getUsers = () => {
            axios.get('http://localhost:80/contactos/api/index.php', {
                params: {
                    action: 'get_users',
                }
            })
            .then((response) => {
                console.log(response)
                const groupedUsers = response.data.reduce((acc, user) => {
                    const concession = user.concessao;
                    if (!acc[concession]) {
                        acc[concession] = [];
                    }
                    acc[concession].push(user);
                    return acc;
                }, {});
                console.log('Grouped users:', groupedUsers)
                setUsers(groupedUsers);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
        }

        getUsers();
    }, [title]);

    return (
        <UserTable users={users} />
    );
}

export default UsersPage