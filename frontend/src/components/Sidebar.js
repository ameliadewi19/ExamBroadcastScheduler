import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import feather from 'feather-icons';

const Sidebar = () => {
    const location = useLocation();
    
    useEffect(() => {
        feather.replace(); // Replace the icons after component mounts
    }, []);

    return (
        <nav id="sidebar" className="sidebar js-sidebar">
            <div className="sidebar-content js-simplebar">
                <a className="sidebar-brand" href="/dashboard">
                    <span className="align-middle">ExamBroadcastMessage</span>
                </a>

                <ul className="sidebar-nav">
                    <li className="sidebar-header">
                        Pages
                    </li>

                    <li className={`sidebar-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                        <a className="sidebar-link" href="/dashboard">
                            <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Dashboard</span>
                        </a>
                    </li>

                    <li className={`sidebar-item ${location.pathname === '/dosen' ? 'active' : ''}`}>
                        <a className="sidebar-link" href="/dosen">
                            <i className="align-middle" data-feather="user"></i> <span className="align-middle">Dosen</span>
                        </a>
                    </li>

                    <li className={`sidebar-item ${location.pathname === '/jadwal-ujian' ? 'active' : ''}`}>
                        <a className="sidebar-link" href="/jadwal-ujian">
                            <i className="align-middle" data-feather="calendar"></i> <span className="align-middle">Jadwal Ujian</span>
                        </a>
                    </li>

                    <li className={`sidebar-item ${location.pathname === '/confirmation' ? 'active' : ''}`}>
                        <a className="sidebar-link" href="/confirmation">
                            <i className="align-middle" data-feather="message-circle"></i> <span className="align-middle">Confirmation Messages</span>
                        </a>
                    </li>

                    <li className={`sidebar-item ${location.pathname === '/reminder' ? 'active' : ''}`}>
                        <a className="sidebar-link" href="/reminder">
                            <i className="align-middle" data-feather="bell"></i> <span className="align-middle">Reminder Messages</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Sidebar;
