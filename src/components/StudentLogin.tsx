import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export function StudentLogin() {
  const { loginAsStudent } = useAuth();

  const years = [1, 2, 3];
  const classes = ['A', 'B', 'N'];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            時間割確認
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            あなたのクラスを選択してください
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {years.map(year => (
              <React.Fragment key={year}>
                {classes.map(className => (
                  <button
                    key={`${year}-${className}`}
                    onClick={() => loginAsStudent(year, className)}
                    className="
                      relative w-full flex justify-center py-4 px-4 border border-transparent
                      text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    "
                  >
                    {year}年{className}組
                  </button>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}