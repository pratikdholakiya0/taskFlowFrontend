import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Home = ({ isAuthenticated }) => {
    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Organize Your Work, Simplify Your Life</h1>
                    <p>TaskFlow helps you manage your tasks efficiently so you can focus on what really matters.</p>
                    {isAuthenticated ? (
                        <Link to="/tasks" className="cta-button">Go to Dashboard</Link>
                    ) : (
                        <div className="cta-buttons">
                            <Link to="/signup" className="cta-button primary">Get Started</Link>
                            <Link to="/demo" className="cta-button secondary">Live Demo</Link>
                        </div>
                    )}
                </div>
                <div className="hero-image">
                    <img src="https://fairshare.tech/wp-content/uploads/2019/12/Task_management_system.jpg" alt="Task Management Dashboard" />
                </div>
            </section>

            {/* Features Section */}
            {!isAuthenticated && (
                <section className="features-section">
                    <h2>Why Choose TaskFlow?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">📅</div>
                            <h3>Smart Scheduling</h3>
                            <p>Automatically prioritize and schedule your tasks based on deadlines and importance.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔄</div>
                            <h3>Seamless Sync</h3>
                            <p>Access your tasks from any device, anywhere, with real-time synchronization.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3>Productivity Insights</h3>
                            <p>Get detailed reports and analytics to improve your productivity over time.</p>
                        </div>
                    </div>
                </section>
            )}

            {/* Testimonials Section */}
            {!isAuthenticated && (
                <section className="testimonials-section">
                    <h2>Trusted by Thousands</h2>
                    <div className="testimonials">
                        <div className="testimonial">
                            <p>"TaskFlow completely transformed how I manage my daily tasks. I'm 40% more productive!"</p>
                            <div className="author">- Sarah J., Marketing Director</div>
                        </div>
                        <div className="testimonial">
                            <p>"The intuitive interface and powerful features make this the best task manager I've used."</p>
                            <div className="author">- Michael T., Software Engineer</div>
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-logo">
                        <span className="logo-icon">✓</span>
                        <span className="logo-text">TaskFlow</span>
                    </div>
                    <div className="footer-links">
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="/privacy">Privacy</Link>
                        <Link to="/terms">Terms</Link>
                    </div>
                    <div className="social-links">
                        <a href="https://x.com/Pratiikxd" target="_blank">Twitter</a>
                        <a href="https://www.instagram.com/pratiikxd/" target="_blank">Instagram</a>
                        <a href="https://www.linkedin.com/in/pratik-dholakiya/" target="_blank">LinkedIn</a>
                        <a href="https://github.com/pratikdholakiya0" target="_blank">Github</a>
                    </div>
                </div>
                <div className="copyright">
                    © {new Date().getFullYear()} TaskFlow. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Home;