import React, { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Users() {
    const { token } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);

    const getUsers = useCallback(async () => {
        const url = `http://localhost:3001/users?page=${currentPage}&limit=${itemsPerPage}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (res.status === 200) {
                setUserData(data.users);
                setTotalUsers(data.totalUsers);
            } else {
                console.log("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.log(err);
        }
    }, [token, currentPage, itemsPerPage]);

    useEffect(() => {
        if (token) {
            getUsers();
        }
    }, [token, getUsers]);

    return (
        <div className='container-fluid p-5'>
            <h1>Users</h1>
            <div className="overflow-auto mt-3" style={{ maxHeight: "38rem" }}>
                <table className="table table-striped table-hover mt-3 fs-5">
                    <thead>
                        <tr className="tr_color">
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((element, id) => (
                            <tr key={element._id}>
                                <th scope="row">{id + 1}</th>
                                <td>{element.name}</td>
                                <td>{element.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-center">
                <nav>
                    <ul className="pagination">
                        {Array.from({ length: Math.ceil(totalUsers / itemsPerPage) }, (_, i) => i + 1).map(page => (
                            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}
