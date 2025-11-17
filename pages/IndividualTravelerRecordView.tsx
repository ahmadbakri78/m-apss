import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { DetailSection, DetailItem } from '../components/DetailSection';
import type { ConsolidatedTravelerRecord } from '../types';

// Mock data - in a real app, you'd fetch this based on the puid
const mockTravelerRecords: ConsolidatedTravelerRecord[] = [
    {
        puid: 'PUID-1001', name: 'John Doe', dob: '1985-04-12', nationality: 'USA', photoUrl: 'https://picsum.photos/seed/puid1/100', riskIndicator: 'High',
        journeys: [
            { flightNumber: 'UA234', origin: 'JFK', destination: 'LHR', date: '2023-10-28', status: 'Scheduled' },
            { flightNumber: 'BA289', origin: 'LHR', destination: 'JFK', date: '2023-09-15', status: 'Completed' },
        ],
        dataSubmissions: [
            { type: 'API', id: 'TR-123', timestamp: '2023-10-27 15:01:12', status: 'Processed' },
            { type: 'PNR', id: 'A1B2C3D', timestamp: '2023-10-27 12:34:01', status: 'Processed' },
            { type: 'API', id: 'TR-098', timestamp: '2023-09-14 11:05:00', status: 'Processed' },
        ],
    },
    {
        puid: 'PUID-2034', name: 'Jane Smith', dob: '1992-08-22', nationality: 'GBR', photoUrl: 'https://picsum.photos/seed/puid2/100', riskIndicator: 'Low',
        journeys: [{ flightNumber: 'BA098', origin: 'LHR', destination: 'DXB', date: '2023-10-28', status: 'Scheduled' }],
        dataSubmissions: [{ type: 'API', id: 'TR-124', timestamp: '2023-10-27 15:01:45', status: 'Pending' }],
    },
    {
        puid: 'PUID-8572', name: 'Klaus Mueller', dob: '1978-12-01', nationality: 'DEU', photoUrl: 'https://picsum.photos/seed/puid3/100', riskIndicator: 'Low',
        journeys: [{ flightNumber: 'LH456', origin: 'FRA', destination: 'JFK', date: '2023-10-28', status: 'Scheduled' }],
        dataSubmissions: [{ type: 'API', id: 'TR-125', timestamp: '2023-10-27 14:55:00', status: 'Processed' }, { type: 'PNR', id: 'I7J8K9L', timestamp: '2023-10-27 15:01:10', status: 'Rejected' }],
    },
];

const getRiskIndicatorPill = (risk: ConsolidatedTravelerRecord['riskIndicator']) => {
    switch (risk) {
        case 'Low': return 'bg-green-100 text-green-800';
        case 'Medium': return 'bg-amber-100 text-amber-800';
        case 'High': return 'bg-red-100 text-red-800';
        case 'Critical': return 'bg-red-700 text-white';
    }
};

const getStatusPillColor = (status: 'Processed' | 'Rejected' | 'Pending') => {
    switch (status) {
        case 'Processed': return 'bg-green-100 text-green-800';
        case 'Pending': return 'bg-amber-100 text-amber-800';
        case 'Rejected': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}


export const IndividualTravelerRecordView: React.FC = () => {
    const { puid } = useParams<{ puid: string }>();
    const navigate = useNavigate();
    const traveler = mockTravelerRecords.find(t => t.puid === puid);

    if (!traveler) {
        return (
            <Card title="Error">
                <p>Traveler record not found.</p>
                <button onClick={() => navigate(-1)} className="mt-4 text-brand-secondary hover:underline">&larr; Go Back</button>
            </Card>
        );
    }

    return (
        <Card>
            <button onClick={() => navigate(-1)} className="text-brand-secondary hover:underline mb-4">&larr; Back to Traveler Dashboard</button>
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="md:w-1/4 flex flex-col items-center">
                    <img src={traveler.photoUrl} alt={traveler.name} className="w-32 h-32 rounded-full object-cover mb-4 shadow-lg" />
                    <h2 className="text-2xl font-bold text-brand-dark text-center">{traveler.name}</h2>
                    <p className="font-mono text-gray-500 text-sm">{traveler.puid}</p>
                </div>
                <div className="flex-1">
                    <DetailSection title="Consolidated Profile">
                        <DetailItem label="Date of Birth" value={traveler.dob} />
                        <DetailItem label="Nationality" value={traveler.nationality} />
                        <DetailItem label="Overall Risk Indicator" value={
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getRiskIndicatorPill(traveler.riskIndicator)}`}>
                                {traveler.riskIndicator}
                            </span>
                        } />
                    </DetailSection>
                </div>
            </div>

            <Card title="Journey History" className="mt-6 shadow-sm bg-gray-50">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Flight</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {traveler.journeys.map((journey, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 whitespace-nowrap font-bold text-gray-800">{journey.flightNumber}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{journey.origin} &rarr; {journey.destination}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-mono text-brand-primary">{journey.date}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{journey.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            
            <Card title="Associated Data Submissions" className="mt-6 shadow-sm bg-gray-50">
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Identifier</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {traveler.dataSubmissions.map((sub, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 whitespace-nowrap font-bold text-gray-800">{sub.type}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-mono text-gray-600">{sub.id}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-mono text-brand-primary">{sub.timestamp}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusPillColor(sub.status)}`}>
                                            {sub.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </Card>
    );
};