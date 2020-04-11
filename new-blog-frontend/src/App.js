import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

import Header from './components/Header';
import Post from './components/Post';


const drawerWidth = 600;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));


function App() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (err) {
      console.log("ERROR", err);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className={classes.root}>
      <Header />
      {posts.map(post => {
        return (
          <Post key={post.id} post={post} />
        )
      })}
      <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => setOpenDrawer(true)}>
        <EditIcon />
      </Fab>
      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <h1>Add post here</h1>
      </Drawer>
    </div>
  );
}

export default App;
