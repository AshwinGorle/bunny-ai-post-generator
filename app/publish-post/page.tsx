'use client'
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface Message {
  type: 'success' | 'error';
  text: string;
}

export default function PublishPost() {
  const searchParams = useSearchParams();
  const caption = searchParams.get('caption') || '';
  const url = searchParams.get('url') || '';
  const pageId = '502967012891563';
  const accessToken = 'EAASFaN7CjxoBO9PUgSJJjYsdM5kh53mbjX7DUZCt4qUY068qbVqZAp7B3WiUkBMZCeRfqgURMHs8zDYizFnxCBfRnOsNSuAFIPCIAJO60V3Yq35MpQ2RAFmA0wB9BSkFGKZCFCrdBYhsWGqx7zpDt35aPxz6aVY57BRWSM1pUgFLIy3ZCOK7k2YFM8bmcAdV3sHF0UZCj5KNopuzXcxIj4DUcj5SMRIN4vQAZDZD';

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isScheduling, setIsScheduling] = useState<boolean>(false);
  const [scheduledDate, setScheduledDate] = useState<string>('');

  // Function to handle publishing immediately
  const handlePublishNow = async (): Promise<void> => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`https://graph.facebook.com/${pageId}/photos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          caption,
          access_token: accessToken,
        }),
      });

      const data = await response.json();

      if (data.id) {
        setMessage({ type: 'success', text: 'Post published successfully!' });
      } else {
        setMessage({ type: 'error', text: `Error: ${data.error.message || 'Unable to publish post.'}` });
      }
    } catch (error) {
      setMessage({ type: 'error', text: `Error: ${(error as Error).message || 'Network error occurred.'}` });
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  // Function to handle scheduling the post
  const handleSchedulePost = async (): Promise<void> => {
    if (!scheduledDate) return;

    setLoading(true);
    setMessage(null);

    const scheduledTimestamp = Math.floor(new Date(scheduledDate).getTime() / 1000);

    try {
      const response = await fetch(`https://graph.facebook.com/${pageId}/photos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          caption,
          published: false,
          scheduled_publish_time: scheduledTimestamp,
          access_token: accessToken,
        }),
      });

      const data = await response.json();

      if (data.id) {
        setMessage({ type: 'success', text: 'Post scheduled successfully!' });
      } else {
        
        setMessage({ type: 'error', text: `Error: ${data.error.message || 'Unable to schedule post.'}` });
      }
    } catch (error) {
      console.log(error);
      setMessage({ type: 'error', text: `Error: ${(error as Error).message || 'Network error occurred.'}` });
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Publish Post</h2>
        <div className="mb-4">
          <img src={url} alt="Post Preview" className="w-full h-64 object-cover rounded-lg" />
        </div>
        <p className="text-lg mb-4">{caption}</p>
        <button
          onClick={() => setShowModal(true)}
          disabled={loading}
          className="w-full py-2 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700"
        >
          Publish
        </button>

        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-center ${
              message.type === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {message.text}
          </div>
        )}
      </div>

      {/* Modal for Publish Options */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Publish Options</h3>
            <div className="flex justify-around mb-4">
              <button
                onClick={() => {
                  setIsScheduling(false);
                  handlePublishNow();
                }}
                className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Publish Now
              </button>
              <button
                onClick={() => setIsScheduling(true)}
                className="py-2 px-4 bg-yellow-600 hover:bg-yellow-700 rounded-lg"
              >
                Schedule
              </button>
            </div>

            {isScheduling && (
              <div className="mt-4">
                <label htmlFor="scheduledDate" className="block text-sm font-medium mb-2">
                  Select Date and Time:
                </label>
                <input
                  type="datetime-local"
                  id="scheduledDate"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded-lg text-white"
                />
                <button
                  onClick={handleSchedulePost}
                  disabled={!scheduledDate || loading}
                  className="mt-4 w-full py-2 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? 'Scheduling...' : 'Schedule Post'}
                </button>
              </div>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full py-2 rounded-lg font-semibold bg-red-600 hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
