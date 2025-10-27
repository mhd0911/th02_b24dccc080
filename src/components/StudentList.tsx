import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Routes, Route } from 'react-router-dom';

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
  address: {
    street: string;
    city: string;
  };
}

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get<Student[]>(
          'https://jsonplaceholder.typicode.com/users'
        );
        setStudents(response.data);
      } catch (err) {
        setError('Không thể tải danh sách sinh viên');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleStudentClick = (studentId: number) => {
    navigate(`/students/${studentId}`);
  };

  if (loading) return <div>Đang tải danh sách sinh viên...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Danh sách sinh viên</h2>
      
      <Routes>
        <Route path="/" element={
          <div>
            {students.map((student) => (
              <div
                key={student.id}
                onClick={() => handleStudentClick(student.id)}
                style={{
                  padding: '15px',
                  margin: '10px 0',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: '#f8f9fa'
                }}
              >
                <h4>{student.name}</h4>
                <p>Email: {student.email}</p>
              </div>
            ))}
          </div>
        } />
        
        <Route path="/:id" element={<StudentDetail students={students} />} />
      </Routes>
    </div>
  );
};

const StudentDetail: React.FC<{ students: Student[] }> = ({ students }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const student = students.find(s => s.id === parseInt(id || '0'));

  if (!student) {
    return <div>Không tìm thấy sinh viên</div>;
  }

  return (
    <div>
      <button 
        onClick={() => navigate('/students')}
        style={{
          padding: '8px 16px',
          marginBottom: '20px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        ← Quay lại
      </button>
      
      <div style={{
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f8f9fa'
      }}>
        <h3>Chi tiết sinh viên</h3>
        <p><strong>Họ tên:</strong> {student.name}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Điện thoại:</strong> {student.phone}</p>
        <p><strong>Website:</strong> {student.website}</p>
        <p><strong>Công ty:</strong> {student.company.name}</p>
        <p><strong>Địa chỉ:</strong> {student.address.street}, {student.address.city}</p>
      </div>
    </div>
  );
};

export default StudentList;