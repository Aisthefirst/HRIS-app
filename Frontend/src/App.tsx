import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useAuth } from './hooks/useAuth';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AppShell } from './components/layout/AppShell';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { PeoplePage } from './pages/PeoplePage';
import { EmployeeDetailPage } from './pages/EmployeeDetailPage';
import { TimeOffPage } from './pages/TimeOffPage';
import { RecruitmentPage } from './pages/RecruitmentPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { ToastContainer } from './components/ui/ToastContainer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { isAuthenticated, getCurrentUser } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      getCurrentUser();
    }
  }, [isAuthenticated, getCurrentUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <AppShell />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="profile" element={<ProfilePage />} />
              
              {/* Admin/HR Routes */}
              <Route 
                path="people" 
                element={
                  <ProtectedRoute requiredPermission="view_employees">
                    <PeoplePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="people/:id" 
                element={
                  <ProtectedRoute requiredPermission="view_employees">
                    <EmployeeDetailPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Time Off Routes */}
              <Route path="timeoff" element={<TimeOffPage />} />
              
              {/* Admin Only Routes */}
              <Route 
                path="recruitment" 
                element={
                  <ProtectedRoute requiredPermission="view_recruitment">
                    <RecruitmentPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="settings" 
                element={
                  <ProtectedRoute requiredPermission="view_settings">
                    <SettingsPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route path="" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Routes>
        </div>
        <ToastContainer />
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;