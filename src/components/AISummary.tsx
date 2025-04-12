import React from 'react';
import { Brain, AlertTriangle, Shield, Activity } from 'lucide-react';
import type { ScanResult } from '../types/fileTypes';

interface AISummaryProps {
  scanResult: ScanResult;
  fileName: string;
}

export function AISummary({ scanResult, fileName }: AISummaryProps) {
  const getSummaryText = () => {
    const riskLevel = scanResult.riskLevel;
    const issues = scanResult.detectedIssues;
    
    if (scanResult.status === 'clean') {
      return `I've analyzed "${fileName}" and found no security concerns. The file appears to be safe with no detected malicious patterns. The scan completed in ${scanResult.scanTime}ms, and all security checks passed successfully.`;
    } else if (scanResult.status === 'suspicious') {
      return `I've detected some potential concerns with "${fileName}". While not definitively malicious, the file exhibits ${issues.length} suspicious characteristics that warrant caution. The analysis took ${scanResult.scanTime}ms to complete. I recommend reviewing the detected issues before proceeding.`;
    } else {
      return `Warning! I've identified significant security risks in "${fileName}". The file contains ${issues.length} concerning patterns that indicate potential malicious content. The analysis completed in ${scanResult.scanTime}ms, and I strongly advise against using this file without thorough verification.`;
    }
  };

  const getStatusIcon = () => {
    switch (scanResult.status) {
      case 'clean':
        return <Shield className="w-6 h-6 text-green-500 dark:text-green-400" />;
      case 'suspicious':
        return <Activity className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />;
      case 'malicious':
        return <AlertTriangle className="w-6 h-6 text-red-500 dark:text-red-400" />;
    }
  };

  const getBorderColor = () => {
    switch (scanResult.status) {
      case 'clean':
        return 'border-green-200 dark:border-green-800';
      case 'suspicious':
        return 'border-yellow-200 dark:border-yellow-800';
      case 'malicious':
        return 'border-red-200 dark:border-red-800';
    }
  };

  const getBackgroundColor = () => {
    switch (scanResult.status) {
      case 'clean':
        return 'bg-green-50 dark:bg-green-900/20';
      case 'suspicious':
        return 'bg-yellow-50 dark:bg-yellow-900/20';
      case 'malicious':
        return 'bg-red-50 dark:bg-red-900/20';
    }
  };

  return (
    <div className={`rounded-xl border ${getBorderColor()} ${getBackgroundColor()} transition-colors duration-300`}>
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg">
            <Brain className="w-6 h-6 text-purple-500 dark:text-purple-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                AI Analysis Summary
              </h3>
              {getStatusIcon()}
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {getSummaryText()}
            </p>
            
            {scanResult.detectedIssues.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Key Findings:
                </h4>
                <ul className="space-y-2">
                  {scanResult.detectedIssues.map((issue, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 dark:bg-red-500" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mt-4 flex items-center space-x-2">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                scanResult.status === 'clean'
                  ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                  : scanResult.status === 'suspicious'
                  ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300'
                  : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
              }`}>
                {scanResult.riskType} Risk Level
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Scan completed in {scanResult.scanTime}ms
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}