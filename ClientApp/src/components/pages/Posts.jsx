import React, { useState, useEffect } from 'react';
import PostList from '../PostList';
import '../../styles/App.css';
import PostForm from '../PostForm';
import PostFilter from '../PostFilter';
import MyModal from '../UI/modal/MyModal';
import MyButton from '../UI/button/myButton';
import { usePosts } from '../hooks/usePost';
import PostService from '../../API/PostService';
import Loader from '../UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { getPageCount } from '../../utils/pages';
import { usePagination } from '../hooks/usePagination';
import Pagination from '../UI/pagination/Paggination';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [fetchPosts, isPostLoading, postError] = useFetching(async (limit,page) => {
    const responce = await PostService.getAll(limit, page);
    setPosts(responce.data);
    const totalCount = responce.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  const pagesArray = usePagination(totalPages);
  useEffect(() => {
    fetchPosts(limit,page);
  }, []);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (post) => {
    setPosts(posts.filter(x => x.id !== post.id))
  }

const changePage = (page)=>{
  setPage(page);
  fetchPosts(limit,page);
};

  return (
    <div className="App">

      <MyButton onClick={() => setModal(true)} style={{ marginTop: 30 }}>Create Post</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: '15px' }} />
      <PostFilter filter={filter} setFilter={setFilter} />

      {postError && <h1>Error: {postError}</h1>}
      {isPostLoading ?
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><Loader></Loader></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'List of Posts'} />
      }
      
      <Pagination pagesArray={pagesArray} page={page} callback={changePage}/>
    </div>
  );

}
