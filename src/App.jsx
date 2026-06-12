import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';
import WhatsAppButton from './components/common/WhatsAppButton';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage'));
const OrderPage = lazy(() => import('./pages/OrderPage'));
const TrackingPage = lazy(() => import('./pages/TrackingPage'));
const SizeChartPage = lazy(() => import('./pages/SizeChartPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const TentangPage = lazy(() => import('./pages/TentangPage'));
const KontakPage = lazy(() => import('./pages/KontakPage'));

// Admin pages
const LoginPage = lazy(() => import('./pages/admin/LoginPage'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
const LeadsPage = lazy(() => import('./pages/admin/LeadsPage'));
const WhatsAppConfirmPage = lazy(() => import('./pages/admin/WhatsAppConfirmPage'));
const ProductionUpdatePage = lazy(() => import('./pages/admin/ProductionUpdatePage'));
const ProductsPage = lazy(() => import('./pages/admin/ProductsPage'));
const GalleryPage = lazy(() => import('./pages/admin/GalleryPage'));
const ReportsPage = lazy(() => import('./pages/admin/ReportsPage'));

// Customer layout wrapper
const CustomerLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="flex-1">{children}</div>
    <Footer />
    <WhatsAppButton />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Customer Routes */}
            <Route path="/" element={
              <CustomerLayout><HomePage /></CustomerLayout>
            } />
            <Route path="/katalog" element={
              <CustomerLayout><CatalogPage /></CustomerLayout>
            } />
            <Route path="/produk" element={
              <CustomerLayout><CatalogPage /></CustomerLayout>
            } />
            <Route path="/order" element={
              <Navigate to="/produk" replace />
            } />
            <Route path="/tracking" element={
              <CustomerLayout><TrackingPage /></CustomerLayout>
            } />
            <Route path="/size-chart" element={
              <CustomerLayout><SizeChartPage /></CustomerLayout>
            } />
            <Route path="/produk/:id" element={
              <CustomerLayout><ProductDetailPage /></CustomerLayout>
            } />
            <Route path="/tentang" element={
              <CustomerLayout><TentangPage /></CustomerLayout>
            } />
            <Route path="/kontak" element={
              <CustomerLayout><KontakPage /></CustomerLayout>
            } />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="orders" element={<Navigate to="/admin/leads" replace />} />
              <Route path="leads" element={<LeadsPage />} />
              <Route path="whatsapp-confirm" element={<WhatsAppConfirmPage />} />
              <Route path="production-update" element={<ProductionUpdatePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="reports" element={<ReportsPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={
              <CustomerLayout>
                <div className="flex flex-col items-center justify-center min-h-screen py-20">
                  <div className="text-8xl mb-6">404</div>
                  <h1 className="text-3xl font-bold text-navy-900 mb-3">Halaman Tidak Ditemukan</h1>
                  <p className="text-gray-500 mb-6">Halaman yang Anda cari tidak tersedia.</p>
                  <a href="/" className="btn-primary">Kembali ke Beranda</a>
                </div>
              </CustomerLayout>
            } />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
