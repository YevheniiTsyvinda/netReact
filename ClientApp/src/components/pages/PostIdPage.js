import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostService from "../../API/PostService";
import { useFetching } from "../hooks/useFetching";
import Loader from "../UI/Loader/Loader";
const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    });
    const [fetchCommentsById, isLoadingComments, errorComments] = useFetching(async (id) => {
        const response = await PostService.getComments(id);
        setComments(response.data);
    });

    useEffect(() => {
        fetchPostById(params.id);
        fetchCommentsById(params.id);
    }, [])
    return (
        <div>
            <h1>myPost Id {params.id}</h1>
            {isLoading
                ? <Loader />
                : <div>
                    {post.id}.{post.title}
                </div>}
            <h1>Comments</h1>
            {isLoadingComments
                ? <Loader />
                : <div>
                    {comments.map(comm =>
                        <div style={{ marginTop: '15px' }} key={comm.id}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    )}
                </div>}
        </div>
    );
};

export default PostIdPage