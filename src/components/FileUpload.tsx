import React, { useCallback } from 'react';
import { Upload, File } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

export function FileUpload({ onFileSelect, isProcessing }: FileUploadProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onFileSelect(file);
    },
    [onFileSelect]
  );

  return (
    <div className="relative transform transition-all duration-300 hover:scale-[1.01]">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`w-full p-8 border-2 border-dashed rounded-xl transition-all duration-300 ${
          isProcessing
            ? 'border-purple-400 dark:border-purple-500 bg-purple-50 dark:bg-purple-900/20'
            : 'border-purple-300 dark:border-purple-600 bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-400 dark:hover:border-purple-500'
        } cursor-pointer group animate-fade-in-up`}
      >
        <label className="flex flex-col items-center justify-center gap-4 cursor-pointer">
          <div className="relative">
            <div className="transition-transform group-hover:scale-110 duration-300">
              <div className="absolute -inset-4 bg-purple-100 dark:bg-purple-900/50 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Upload className="w-12 h-12 text-purple-500 dark:text-purple-400 relative animate-bounce-slow" />
            </div>
          </div>
          <div className="text-center transform transition-all duration-300">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {isProcessing ? 'Processing file...' : 'Drop your file here or click to upload'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 opacity-75 group-hover:opacity-100">
              Supports any file type for hash verification
            </p>
          </div>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center transform transition-all duration-300 hover:scale-105">
              <File className="w-4 h-4 mr-2" />
              <span>Any file type</span>
            </div>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
            <span className="transform transition-all duration-300 hover:scale-105">No size limit</span>
          </div>
          <input
            type="file"
            onChange={handleChange}
            className="hidden"
            disabled={isProcessing}
          />
        </label>
      </div>
      
      {isProcessing && (
        <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl flex items-center justify-center animate-fade-in">
          <div className="flex flex-col items-center w-64">
            <ProgressBar />
            <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium animate-pulse">Analyzing file...</p>
          </div>
        </div>
      )}
    </div>
  );
}