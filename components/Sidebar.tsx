
import React, { useState } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { NAVIGATION_LINKS } from '../constants';
import type { NavLink } from '../types';

const NavLinkItem: React.FC<{ link: NavLink; isCollapsed: boolean }> = ({ link, isCollapsed }) => (
  <RouterNavLink
    to={link.path}
    className={({ isActive }) =>
      `flex items-center p-2 my-1 transition-colors duration-200 rounded-lg ${
        isActive ? 'bg-brand-secondary text-white' : 'text-gray-200 hover:bg-brand-primary hover:text-white'
      }`
    }
  >
    <link.icon className="h-6 w-6" />
    {!isCollapsed && <span className="mx-4 text-sm font-normal">{link.label}</span>}
  </RouterNavLink>
);

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`flex flex-col justify-between bg-brand-dark text-white transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div>
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && <span className="text-xl font-bold">M-APSS</span>}
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1 rounded-full hover:bg-brand-primary focus:outline-none">
            {isCollapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            )}
          </button>
        </div>
        <nav className="mt-4 px-2">
          {NAVIGATION_LINKS.map((group) => (
            <div key={group.title} className="mb-4">
              {!isCollapsed && <h3 className="px-2 mb-2 text-xs uppercase text-gray-400 tracking-wider">{group.title}</h3>}
              {group.links.map((link) => (
                <NavLinkItem key={link.path} link={link} isCollapsed={isCollapsed} />
              ))}
            </div>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
            <img className="h-8 w-8 rounded-full object-cover" src="https://picsum.photos/100" alt="User" />
            {!isCollapsed && (
                <div className="ml-3">
                    <p className="text-sm font-medium">Operator</p>
                    <p className="text-xs text-gray-400">Admin Role</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};