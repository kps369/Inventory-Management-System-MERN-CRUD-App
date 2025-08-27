import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        setLoading(true);
        setError('');

        try {
            const res = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || 'Something went wrong');
            }

            // Use the login function from context
            login(data.token);
            navigate('/products');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid p-5">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3 col-lg-6 col-md-6 col-12 fs-4">
                    <label htmlFor="email" className="form-label fw-bold">Email</label>
                    <input
                        type="email"
                        className="form-control fs-5"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3 col-lg-6 col-md-6 col-12 fs-4">
                    <label htmlFor="password" className="form-label fw-bold">Password</label>
                    <input
                        type="password"
                        className="form-control fs-5"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="alert alert-danger col-lg-6">{error}</div>}
                <button type="submit" className="btn btn-primary fs-4" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}
