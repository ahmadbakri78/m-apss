
import React from 'react';
import { useLocation } from 'react-router-dom';
import { NAVIGATION_LINKS } from '../constants';

const BellIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);

export const Header: React.FC = () => {
  const location = useLocation();

  const getPageTitle = () => {
    for (const group of NAVIGATION_LINKS) {
      const link = group.links.find(l => l.path === location.pathname);
      if (link) return link.label;
    }
    return 'Dashboard';
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b-2 border-gray-200 shadow-sm">
      <h1 className="text-2xl font-semibold text-brand-dark">{getPageTitle()}</h1>
      <div className="flex items-center">
        <button className="relative text-gray-600 hover:text-brand-primary focus:outline-none">
          <BellIcon className="h-6 w-6" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">3</span>
        </button>
        <div className="ml-6">
            <span className="text-sm font-medium text-gray-700">John Doe</span>
        </div>
      </div>
    </header>
  );
};
