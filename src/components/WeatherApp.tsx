import React, { useState } from 'react';
import axios from 'axios';

interface WeatherData {
  current_condition: Array<{
    temp_C: string;
    weatherDesc: Array<{
      value: string;
    }>;
  }>;
}

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError('');
    try {
      const response = await axios.get<WeatherData>(
        `https://wttr.in/${city}?format=j1`
      );
      setWeather(response.data);
    } catch (err) {
      setError('Không thể lấy thông tin thời tiết. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Ứng dụng thời tiết</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Nhập tên thành phố..."
          style={{
            padding: '10px',
            marginRight: '10px',
            width: '200px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
        <button 
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Đang tải...' : 'Tìm kiếm'}
        </button>
      </form>

      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>
      )}

      {weather && weather.current_condition && (
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa'
        }}>
          <h3>Thời tiết tại {city}</h3>
          <p><strong>Nhiệt độ:</strong> {weather.current_condition[0].temp_C}°C</p>
          <p><strong>Tình trạng:</strong> {weather.current_condition[0].weatherDesc[0].value}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;