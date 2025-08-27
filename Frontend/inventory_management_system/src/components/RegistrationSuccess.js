import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegistrationSuccess() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 5000); // 5 seconds

        // Cleanup the timer if the component unmounts
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="container-fluid p-5 text-center">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8">
                    <div className="alert alert-success" role="alert">
                        <h4 className="alert-heading">Registration Successful!</h4>
                        <p>You have successfully registered your account. You will be automatically redirected to the login page in 5 seconds.</p>
                        <hr />
                        <p className="mb-0">If you are not redirected, please click the button below.</p>
                    </div>
                    <Link to="/login" className="btn btn-primary btn-lg mt-3">
                        Login Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
