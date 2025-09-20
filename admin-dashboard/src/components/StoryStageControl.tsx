import { useState } from 'react';
import { LuPlay, LuRotateCcw, LuLoader } from 'react-icons/lu';

export function StoryStageControl() {
  const [loading, setLoading] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const setStoryStage = async (stage: number) => {
    setLoading(stage);
    setError('');
    setSuccess('');

    try {
      const auth = localStorage.getItem('auth');
      if (!auth) {
        throw new Error('Authentication required');
      }

      const apiBase = import.meta.env.VITE_DATA_ENDPOINT;
      const response = await fetch(`${apiBase}/setStoryStage`, {
        method: 'POST',
        headers: {
          'Authorization': auth,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stage),
      });

      if (!response.ok) {
        throw new Error(`Failed to set story stage: ${response.status}`);
      }

      const stageName = stage === 0 ? 'Reset' : `Stage ${stage}`;
      setSuccess(`Successfully set to ${stageName}`);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(null);
    }
  };

  const stages = [
    { value: 0, label: 'Reset', icon: LuRotateCcw, color: 'bg-gray-500 hover:bg-gray-600' },
    { value: 1, label: 'Stage 1', icon: LuPlay, color: 'bg-blue-500 hover:bg-blue-600' },
    { value: 2, label: 'Stage 2', icon: LuPlay, color: 'bg-green-500 hover:bg-green-600' },
    { value: 3, label: 'Stage 3', icon: LuPlay, color: 'bg-purple-500 hover:bg-purple-600' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Story Stage Control
      </h2>
      
      {/* Status Messages */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
          {success}
        </div>
      )}

      {/* Stage Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stages.map(({ value, label, icon: Icon, color }) => (
          <button
            key={value}
            onClick={() => setStoryStage(value)}
            disabled={loading !== null}
            className={`
              ${color} text-white font-medium py-3 px-4 rounded-lg 
              transition-colors duration-200 flex items-center justify-center
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            `}
          >
            {loading === value ? (
              <LuLoader className="animate-spin mr-2" />
            ) : (
              <Icon className="mr-2" />
            )}
            {label}
          </button>
        ))}
      </div>

      <p className="mt-3 text-sm text-gray-600">
        Control the story progression for the wedding experience.
      </p>
    </div>
  );
}
