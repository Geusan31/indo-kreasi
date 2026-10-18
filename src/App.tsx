import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './lib/AuthContext';
import { ToastProvider } from './components/ui/Toast';
import { MainLayout } from './layouts/MainLayout';

// Public Pages
import { Home } from './pages/Home';
import { Games } from './pages/Games';
import { GameDetail } from './pages/GameDetail';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

// Admin Layout & Protected Route
import { AdminLayout } from './components/admin/AdminLayout';
import { ProtectedRoute } from './components/admin/ProtectedRoute';

// Admin Pages
import { Login } from './pages/admin/Login';
import { DashboardOverview } from './pages/admin/DashboardOverview';
import { GamesList } from './pages/admin/GamesList';
import { GameFormPage } from './pages/admin/GameFormPage';
import { ServicesList } from './pages/admin/ServicesList';
import { ServiceFormPage } from './pages/admin/ServiceFormPage';
import { HomepageCMS } from './pages/admin/HomepageCMS';
import { CompanyCMS } from './pages/admin/CompanyCMS';
import { InquiriesList } from './pages/admin/InquiriesList';
import { MediaLibrary } from './pages/admin/MediaLibrary';
import { AdminProfile } from './pages/admin/AdminProfile';
import { AdminSettings } from './pages/admin/AdminSettings';

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Website Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="games" element={<Games />} />
              <Route path="games/:slug" element={<GameDetail />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* Admin Authentication */}
            <Route path="/admin/login" element={<Login />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<DashboardOverview />} />
                <Route path="games" element={<GamesList />} />
                <Route path="games/new" element={<GameFormPage />} />
                <Route path="games/:id/edit" element={<GameFormPage />} />
                <Route path="services" element={<ServicesList />} />
                <Route path="services/new" element={<ServiceFormPage />} />
                <Route path="services/:id/edit" element={<ServiceFormPage />} />
                <Route path="homepage" element={<HomepageCMS />} />
                <Route path="company" element={<CompanyCMS />} />
                <Route path="inquiries" element={<InquiriesList />} />
                <Route path="media" element={<MediaLibrary />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Route>

            {/* 404 Catch-All */}
            <Route path="*" element={<MainLayout />}>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
