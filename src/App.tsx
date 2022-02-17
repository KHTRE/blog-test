import { Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import WrongPage from './components/WrongPage';
import { NewPostForm } from './components/NewPostForm';
import { UpdatePostForm } from './components/UpdatePostForm';

const App: React.FC = () => {
  const getPostsBlock = () => {
    return (
      <main className="App__main">
        <div className="App__sidebar">
          <PostsList />
        </div>

        <div className="App__content">
          <PostDetails />
        </div>
      </main>
    );
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={getPostsBlock()} />
        <Route path="/new-post-form" element={<NewPostForm />} />
        <Route path="/update-post-form" element={<UpdatePostForm />} />
        <Route path="*" element={<WrongPage />} />
      </Routes>
    </div>
  );
};

export default App;
