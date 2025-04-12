import React from 'react';
import { Shield, AlertTriangle, Clock, FileType, Activity, Zap, CheckCircle } from 'lucide-react';
import { ScanResult } from '../types/fileTypes';

interface ScanInfoProps {
  scanResult: ScanResult;
}

export function ScanInfo({ scanResult }: ScanInfoProps) {
  const statusColors = {
    clean: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/50 border-green-200 dark:border-green-800',
    suspicious: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/50 border-yellow-200 dark:border-yellow-800',
    malicious: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/50 border-red-200 dark:border-red-800',
  };

  const riskTypeColors = {
    None: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
    Low: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
    Medium: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300',
    High: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300',
    Critical: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
  };

  const statusIcons = {
    clean: <Shield className="w-5 h-5" />,
    suspicious: <Activity className="w-5 h-5" />,
    malicious: <AlertTriangle className="w-5 h-5" />,
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-500 dark:text-green-400';
    if (confidence >= 60) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-red-500 dark:text-red-400';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-300">
      <div className={`p-4 ${
        scanResult.status === 'clean' ? 'bg-green-50 dark:bg-green-900/50' :
        scanResult.status === 'suspicious' ? 'bg-yellow-50 dark:bg-yellow-900/50' : 'bg-red-50 dark:bg-red-900/50'
      }`}>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Risk Assessment</h2>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`border rounded-lg p-4 flex items-center space-x-3 ${
            statusColors[scanResult.status]
          }`}>
            <div className="shrink-0">
              {statusIcons[scanResult.status]}
            </div>
            <div>
              <p className="text-sm font-medium">Analysis Status</p>
              <p className="font-semibold capitalize">{scanResult.status}</p>
            </div>
          </div>

          <div className="border rounded-lg p-4 flex items-center space-x-3 bg-purple-50 dark:bg-purple-900/50 border-purple-200 dark:border-purple-800">
            <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Confidence Level</p>
              <div className="flex items-center space-x-2">
                <span className={`font-semibold ${getConfidenceColor(scanResult.riskAssessment.confidence)}`}>
                  {scanResult.riskAssessment.confidence}%
                </span>
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getConfidenceColor(scanResult.riskAssessment.confidence)} transition-all duration-500`}
                    style={{ width: `${scanResult.riskAssessment.confidence}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Vulnerabilities</h3>
            </div>
            <ul className="space-y-2">
              {scanResult.riskAssessment.vulnerabilities.map((vulnerability, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <span className="mt-1 w-2 h-2 rounded-full bg-red-400 dark:bg-red-500 shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">{vulnerability}</span>
                </li>
              ))}
              {scanResult.riskAssessment.vulnerabilities.length === 0 && (
                <li className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />
                  <span>No vulnerabilities detected</span>
                </li>
              )}
            </ul>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-500 dark:text-green-400" />
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Recommendations</h3>
            </div>
            <ul className="space-y-2">
              {scanResult.riskAssessment.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <span className="mt-1 w-2 h-2 rounded-full bg-green-400 dark:bg-green-500 shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border rounded-lg p-4 space-y-3 border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Impact Assessment</h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                riskTypeColors[scanResult.riskType]
              }`}>
                {scanResult.riskType} Risk
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                scanResult.riskAssessment.impactLevel === 'Low' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' :
                scanResult.riskAssessment.impactLevel === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300' :
                'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
              }`}>
                {scanResult.riskAssessment.impactLevel} Impact
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                scanResult.riskType === 'None' ? 'bg-green-500 dark:bg-green-400' :
                scanResult.riskType === 'Low' ? 'bg-blue-500 dark:bg-blue-400' :
                scanResult.riskType === 'Medium' ? 'bg-yellow-500 dark:bg-yellow-400' :
                scanResult.riskType === 'High' ? 'bg-orange-500 dark:bg-orange-400' :
                'bg-red-500 dark:bg-red-400'
              }`}
              style={{ width: `${Math.min(100, scanResult.riskLevel * 20)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}