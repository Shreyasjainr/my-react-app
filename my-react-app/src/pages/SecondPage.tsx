import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DepartmentList from '../components/DepartmentList';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const SecondPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (!userDetails) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <Container>
      <Typography variant="h4">Posts</Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={posts}
          columns={[
            { field: 'userId', headerName: 'User ID', width: 130 },
            { field: 'id', headerName: 'ID', width: 130 },
            { field: 'title', headerName: 'Title', width: 200 },
            { field: 'body', headerName: 'Body', width: 400 }
          ]}
        />
      </div>
      <Typography variant="h4">Departments</Typography>
      <DepartmentList />
    </Container>
  );
};

export default SecondPage;
