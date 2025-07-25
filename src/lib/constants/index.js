import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppLayout from '@/app/layout/AppLayout.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AppLayout />
  </BrowserRouter>
);