// src/components/dashboard/StatsCard.jsx
import React from 'react';

const StatsCard = ({ title, value, subtitle, icon: Icon, color = 'blue', trend }) => {
  const colorClasses = {
    blue: {
      bg: 'from-blue-500 to-blue-600',
      icon: 'bg-blue-500',
      glow: 'shadow-blue-500/25',
      border: 'border-blue-200/50'
    },
    green: {
      bg: 'from-green-500 to-green-600',
      icon: 'bg-green-500',
      glow: 'shadow-green-500/25',
      border: 'border-green-200/50'
    },
    emerald: {
      bg: 'from-emerald-500 to-emerald-600',
      icon: 'bg-emerald-500',
      glow: 'shadow-emerald-500/25',
      border: 'border-emerald-200/50'
    },
    violet: {
      bg: 'from-violet-500 to-violet-600',
      icon: 'bg-violet-500',
      glow: 'shadow-violet-500/25',
      border: 'border-violet-200/50'
    },
    purple: {
      bg: 'from-purple-500 to-purple-600',
      icon: 'bg-purple-500',
      glow: 'shadow-purple-500/25',
      border: 'border-purple-200/50'
    },
    orange: {
      bg: 'from-orange-500 to-orange-600',
      icon: 'bg-orange-500',
      glow: 'shadow-orange-500/25',
      border: 'border-orange-200/50'
    },
    rose: {
      bg: 'from-rose-500 to-rose-600',
      icon: 'bg-rose-500',
      glow: 'shadow-rose-500/25',
      border: 'border-rose-200/50'
    },
    red: {
      bg: 'from-red-500 to-red-600',
      icon: 'bg-red-500',
      glow: 'shadow-red-500/25',
      border: 'border-red-200/50'
    },
    teal: {
      bg: 'from-teal-500 to-teal-600',
      icon: 'bg-teal-500',
      glow: 'shadow-teal-500/25',
      border: 'border-teal-200/50'
    }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div className={`
      relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-sm 
      border ${colors.border} p-6 shadow-xl ${colors.glow}
      hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
      group cursor-pointer
    `}>
      {/* Background gradient overlay on hover */}
      <div className={`
        absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 
        group-hover:opacity-5 transition-opacity duration-300
      `}></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mr-6 -mt-6 h-12 w-12 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 -ml-4 -mb-4 h-8 w-8 rounded-full bg-gradient-to-tr from-white/10 to-transparent"></div>
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`
              w-12 h-12 rounded-xl bg-gradient-to-br ${colors.bg} 
              flex items-center justify-center shadow-lg
              transform group-hover:scale-110 transition-transform duration-300
            `}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                {title}
              </h3>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-3xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
              {value}
            </p>
            {subtitle && (
              <p className="text-sm text-gray-600 font-medium">
                {subtitle}
              </p>
            )}
            {trend && (
              <p className={`text-xs font-semibold px-2 py-1 rounded-full inline-block mt-2
                ${color === 'blue' ? 'bg-blue-100 text-blue-700' :
                  color === 'green' || color === 'emerald' ? 'bg-green-100 text-green-700' :
                  color === 'violet' || color === 'purple' ? 'bg-purple-100 text-purple-700' :
                  color === 'rose' ? 'bg-rose-100 text-rose-700' :
                  'bg-gray-100 text-gray-700'
                }
              `}>
                {trend}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;