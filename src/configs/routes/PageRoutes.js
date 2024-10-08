import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/home/Home';
import Music from '../../pages/music/MusicPage';
import Samples from '../../pages/samples/Samples';
import About from '../../pages/about/About';
import LoginPage from '../../pages/login/LoginPage';
import ImagePage from '../../pages/images/ImagePage';
import NotFound from '../../pages/notfound/NotFound';
import UserList from "../../components/lists/UserList";
import UserForm2 from "../../components/forms/userForm/UserForm2";
import Dashboard from "../../pages/admin/Dashboard";
import UnusedComponents from "../../pages/unused/UnusedComponents";

const PageRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/music" element={<Music />} />
            <Route path="/images" element={<ImagePage />} />
            <Route path="/unused" element={<UnusedComponents />} />
            <Route path="/samples" element={<Samples />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<UserForm2 />} />
            <Route path="/account" element={<UserList />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default PageRoutes;
