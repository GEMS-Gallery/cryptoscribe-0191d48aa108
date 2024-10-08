import React from 'react';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

interface Post {
  id: bigint;
  title: string;
  content: string;
  author: string;
  timestamp: bigint;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <List>
      {posts.map((post) => (
        <ListItem key={post.id.toString()} component={Paper} elevation={2} sx={{ mb: 2, p: 2 }}>
          <ListItemText
            primary={
              <Typography variant="h5" component="h2" gutterBottom>
                {post.title}
              </Typography>
            }
            secondary={
              <>
                <Typography variant="body2" color="text.secondary" paragraph>
                  By {post.author} | {new Date(Number(post.timestamp) / 1000000).toLocaleString()}
                </Typography>
                <Typography variant="body1" paragraph>
                  {post.content}
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default PostList;
