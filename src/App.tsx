import React, { useState } from 'react';
import { TreePine, Send, Loader2, ListPlus } from 'lucide-react';
import { getClimateSuggestion } from './lib/gemini';
import { SuggestionCard } from './components/SuggestionCard';
import { TemperaturePrediction } from './components/TemperaturePrediction';

const TOPICS = [
  'Energy Conservation',
  'Waste Reduction',
  'Sustainable Transportation',
  'Water Conservation',
  'Renewable Energy',
  'Sustainable Diet',
];

function App() {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCustom, setIsCustom] = useState(false);

  const handleGetSuggestion = async () => {
    const prompt = isCustom ? customPrompt : selectedTopic;
    if (!prompt) return;
    
    setLoading(true);
    try {
      const result = await getClimateSuggestion(prompt);
      setSuggestion(result);
    } catch (error) {
      console.error('Error:', error);
      setSuggestion('Failed to get suggestion. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setIsCustom(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <TreePine className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Climate Action Advisor
          </h1>
          <p className="text-lg text-gray-600">
            Get personalized suggestions for fighting climate change
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md mb-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Select a Topic or Write Your Own
              </label>
              <button
                onClick={() => setIsCustom(!isCustom)}
                className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
              >
                <ListPlus className="w-4 h-4" />
                {isCustom ? 'Choose Topic' : 'Custom Prompt'}
              </button>
            </div>

            {isCustom ? (
              <div className="mb-4">
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Enter your climate-related question or topic..."
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring focus:ring-green-200 transition-colors resize-none h-32"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {TOPICS.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleTopicSelect(topic)}
                    className={`p-3 rounded-lg text-sm font-medium transition-colors
                      ${
                        selectedTopic === topic
                          ? 'bg-green-100 text-green-700 border-2 border-green-500'
                          : 'bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100'
                      }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleGetSuggestion}
            disabled={(!selectedTopic && !customPrompt) || loading}
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            Get Suggestion
          </button>
        </div>

        {(suggestion || loading) && (
          <SuggestionCard suggestion={suggestion} loading={loading} />
        )}

        <div className="mt-12">
          <TemperaturePrediction />
        </div>
      </div>
    </div>
  );
}

export default App;