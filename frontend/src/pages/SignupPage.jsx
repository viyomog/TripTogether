import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import AuthLayout from '../components/Auth/AuthLayout';

const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z" fill="#4285F4" />
        <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957273V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853" />
        <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957273C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957273 13.0418L3.96409 10.71Z" fill="#FBBC05" />
        <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957273 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335" />
    </svg>
);

const SignupPage = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                fullName,
                email,
                password,
            }, { withCredentials: true });

            toast.success('Welcome explorer! Your Passport is ready.', {
                style: {
                    background: '#1e293b',
                    color: '#fff',
                    borderRadius: '14px',
                },
                iconTheme: {
                    primary: '#22c55e',
                    secondary: '#fff',
                },
            });
            console.log('Signup successful:', response.data);
            navigate('/');
        } catch (err) {
            const message = err.response?.data?.message || 'Something went wrong. Please try again.';
            toast.error(message, {
                style: {
                    background: '#1e293b',
                    color: '#fff',
                    borderRadius: '14px',
                },
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout 
            title="Join the Voyage" 
            subtitle="Create your explorer profile today"
        >
            <motion.button 
                type="button" 
                className="google-liquid-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
            >
                <GoogleIcon /> Sign up with Google
            </motion.button>

            <div className="divider-liquid">
                <span className="divider-line-liquid"></span>
                <span>or use email</span>
                <span className="divider-line-liquid"></span>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="input-field-liquid">
                    <User className="input-icon-liquid" size={20} />
                    <input 
                        type="text" 
                        className="auth-input" 
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="input-field-liquid">
                    <Mail className="input-icon-liquid" size={20} />
                    <input 
                        type="email" 
                        className="auth-input" 
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="input-field-liquid">
                    <Lock className="input-icon-liquid" size={20} />
                    <input 
                        type="password" 
                        className="auth-input" 
                        placeholder="Create Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>

                <motion.button 
                    type="submit" 
                    className="auth-btn-glow"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                    style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    {isLoading ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                            <Loader2 size={20} />
                        </motion.div>
                    ) : 'Create Passport'}
                </motion.button>

                <p className="auth-footer">
                    Already a member? <Link to="/login" className="auth-link">Sign in</Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default SignupPage;
