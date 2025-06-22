import React from 'react';
import { Search, Edit, Settings } from 'lucide-react';

const SidebarHeader = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Đoạn chat</h1>
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Edit size={16} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Settings size={16} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Tìm kiếm trong Messenger"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>
    </div>
  );
};

export default SidebarHeader;