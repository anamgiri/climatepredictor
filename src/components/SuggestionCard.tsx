import React from 'react';
import { Leaf } from 'lucide-react';

interface SuggestionCardProps {
  suggestion: string;
  loading?: boolean;
}

export function SuggestionCard({ suggestion, loading }: SuggestionCardProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-green-100 rounded-full">
          <Leaf className="w-6 h-6 text-green-600" />
        </div>
        <div className="flex-1">
          <p className="text-gray-700 whitespace-pre-wrap">{suggestion}</p>
        </div>
      </div>
    </div>
  );
}