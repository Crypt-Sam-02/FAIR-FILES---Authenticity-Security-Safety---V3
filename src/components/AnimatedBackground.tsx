import React from 'react';

interface AnimatedBackgroundProps {
  status?: 'clean' | 'suspicious' | 'malicious';
}

export function AnimatedBackground({ status }: AnimatedBackgroundProps) {
  const getGradientColors = () => {
    switch (status) {
      case 'clean':
        return [
          'from-green-600/20 via-emerald-500/20 to-teal-500/20',
          'from-emerald-500/20 via-teal-500/20 to-green-600/20'
        ];
      case 'suspicious':
        return [
          'from-yellow-500/20 via-orange-500/20 to-amber-500/20',
          'from-orange-500/20 via-amber-500/20 to-yellow-500/20'
        ];
      case 'malicious':
        return [
          'from-red-600/20 via-rose-500/20 to-pink-500/20',
          'from-rose-500/20 via-pink-500/20 to-red-600/20'
        ];
      default:
        return [
          'from-purple-600/20 via-indigo-500/20 to-violet-500/20',
          'from-indigo-500/20 via-violet-500/20 to-purple-600/20'
        ];
    }
  };

  const [gradient1, gradient2] = getGradientColors();

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-white dark:bg-gray-900 transition-colors duration-700" />
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br ${gradient1} rounded-full blur-3xl opacity-60 animate-float-slow`} />
        <div className={`absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br ${gradient2} rounded-full blur-3xl opacity-60 animate-float-slow-reverse`} />
      </div>
    </div>
  );
}