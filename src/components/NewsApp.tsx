    import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Article {
  id: number;
  title: string;
  url: string;
  image_url: string;
  summary: string;
  published_at: string;
}

interface NewsResponse {
  results: Article[];
}

const NewsApp: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get<NewsResponse>(
          'https://api.spaceflightnewsapi.net/v4/articles?limit=10'
        );
        setArticles(response.data.results);
      } catch (err) {
        setError('Không thể tải tin tức');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  if (loading) return <div>Đang tải tin tức...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Tin tức vũ trụ</h2>
      
      {articles.map((article) => (
        <div
          key={article.id}
          style={{
            padding: '20px',
            margin: '15px 0',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: 'white'
          }}
        >
          <div style={{ display: 'flex', gap: '20px' }}>
            {article.image_url && (
              <img
                src={article.image_url}
                alt={article.title}
                style={{
                  width: '150px',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '4px'
                }}
              />
            )}
            <div style={{ flex: 1 }}>
              <h3 style={{ marginTop: 0, marginBottom: '10px' }}>
                {article.title}
              </h3>
              <p style={{ color: '#666', marginBottom: '10px' }}>
                {article.summary}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#888' }}>
                  Ngày đăng: {formatDate(article.published_at)}
                </span>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  Đọc tin gốc
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsApp;