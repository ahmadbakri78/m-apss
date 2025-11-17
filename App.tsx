
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ASOCDashboard } from './pages/ASOCDashboard';
import { RiskAnalyticsDashboard } from './pages/RiskAnalyticsDashboard';
import { DataIngestionDashboard } from './pages/DataIngestionDashboard';
import { XAIAuditDashboard } from './pages/XAIAuditDashboard';
import { APIGatewayDashboard } from './pages/APIGatewayDashboard';
import { PNRGatewayDashboard } from './pages/PNRGatewayDashboard';
import { TravelerModuleDashboard } from './pages/TravelerModuleDashboard';
import { IndividualTravelerRecordView } from './pages/IndividualTravelerRecordView';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/command-control/asoc" replace />} />
          <Route path="/command-control/asoc" element={<ASOCDashboard />} />
          <Route path="/command-control/xai-audit" element={<XAIAuditDashboard />} />
          <Route path="/pre-travel/traveler-module" element={<TravelerModuleDashboard />} />
          <Route path="/pre-travel/traveler/:puid" element={<IndividualTravelerRecordView />} />
          <Route path="/pre-travel/risk-analytics" element={<RiskAnalyticsDashboard />} />
          <Route path="/pre-travel/data-ingestion" element={<DataIngestionDashboard />} />
          <Route path="/pre-travel/api-gateway" element={<APIGatewayDashboard />} />
          <Route path="/pre-travel/pnr-gateway" element={<PNRGatewayDashboard />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;