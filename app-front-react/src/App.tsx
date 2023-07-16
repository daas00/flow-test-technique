import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import "./App.css";
import './i18n';


const TradingPage = lazy(() => import('./pages/TradingPage'));

const App: React.FC = () => {
  

  return (
    
      <BrowserRouter>
        <div className="App">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<TradingPage />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
  );
};

export default App;
