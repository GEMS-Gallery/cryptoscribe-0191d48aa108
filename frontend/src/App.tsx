import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, CircularProgress, Box } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { backend } from 'declarations/backend';
import PostList from './components/PostList';
import NewPostForm from './components/NewPostForm';

interface Post {
  id: bigint;
  title: string;
  content: string;
  author: string;
  timestamp: bigint;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await backend.getPosts();
      setPosts(fetchedPosts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const handleNewPost = async (title: string, content: string, author: string) => {
    try {
      const result = await backend.createPost(title, content, author);
      if ('ok' in result) {
        await fetchPosts();
        setShowNewPostForm(false);
      } else {
        console.error('Error creating post:', result.err);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Crypto Blog
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowNewPostForm(true)}
          sx={{ mb: 2 }}
        >
          New Post
        </Button>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {showNewPostForm && (
              <NewPostForm onSubmit={handleNewPost} onCancel={() => setShowNewPostForm(false)} />
            )}
            <PostList posts={posts} />
          </>
        )}
      </Box>
    </Container>
  );
}

export default App;
