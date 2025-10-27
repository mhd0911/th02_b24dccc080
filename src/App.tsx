import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WeatherApp from './components/WeatherApp';
import StudentList from './components/StudentList';
import NewsApp from './components/NewsApp';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <nav style={{
          backgroundColor: '#343a40',
          padding: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            gap: '20px'
          }}>
            <Link
              to="/"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: '#495057'
              }}
            >
              Thời tiết
            </Link>
            <Link
              to="/students"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: '#495057'
              }}
            >
              Sinh viên
            </Link>
            <Link
              to="/news"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: '#495057'
              }}
            >
              Tin tức
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<WeatherApp />} />
          <Route path="/students/*" element={<StudentList />} />
          <Route path="/news" element={<NewsApp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;