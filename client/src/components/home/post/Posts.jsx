import { useEffect, useState } from 'react';

import { Box, Grid } from '@mui/material';
import { useSearchParams, Link } from 'react-router-dom';

import { API } from '../../../service/api';

//components
import Post from './Post';


const Posts = () => {   

    const [posts, setPosts] = useState([]);

    const [searchParams ] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getAllPosts({ category: category || ''});
            if (response.isSuccess) {
                setPosts(response.data);
            }
        }
        fetchData();
    }, [category])

    return (
        <>
            {
                posts && posts.length > 0 ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '20px', }} >
                {posts.map((post) => (
                    <Box key={post._id} sx={{ flex: '1 1 calc(25% - 20px)', maxWidth: 'calc(25% - 20px)' }}>
                        <Link to={`details/${post._id}`} style={{ textDecoration: 'none', color: 'inherit'}}>
                            <Post post={post} />
                        </Link>
                    </Box>
                ))}
                </Box>
                ) : (
                <Box sx={{ color: '#878787', margin: '30px 80px', fontSize: 18 }}>
                    No data available to display
                </Box>
                )
            }
        </>
    )
}

export default Posts;
