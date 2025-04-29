"use client";

import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const containerClasses = fullScreen
    ? "min-h-screen flex items-center justify-center bg-gray-50"
    : "flex items-center justify-center";

  return (
    <div className={containerClasses}>
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 border-indigo-500 ${sizeClasses[size]}`}
      />
    </div>
  );
};
