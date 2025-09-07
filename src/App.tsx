import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import { config } from './shared/env';
import ToastContainer from './modules/notifications/components/ToastContainer';

function App() {
  const handleLogout = () => {
    // This should be handled by the auth provider
    console.log('Logout');
  };

  const handleBackToHome = () => {
    // This should be handled by the router
    console.log('Back to home');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        onBackToHome={handleBackToHome}
        onLogout={handleLogout}
      />
      
      <div className="flex min-h-screen">
        <Sidebar />
        
        <main className="flex-1 p-8 ml-64 min-h-screen">
          <Outlet />
        </main>
      </div>

      {config.notifications.enabled && config.notifications.toastsEnabled && <ToastContainer />}
    </div>
  );
}

export default App;