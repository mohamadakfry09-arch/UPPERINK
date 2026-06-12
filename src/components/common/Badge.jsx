import React from 'react';
import { getStatusColor } from '../../utils/formatters';

const Badge = ({ status, className = '' }) => {
  const colorClass = getStatusColor(status);
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${colorClass} ${className}`}>
      {status}
    </span>
  );
};

export default Badge;
