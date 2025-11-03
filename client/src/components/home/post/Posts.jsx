import { useEffect, useState } from 'react';

import { Box, Grid } from '@mui/material';

import { API } from '../../../service/api';

//components
import Post from './Post';


const Posts = () => {   

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getAllPosts();
            if (response.isSuccess) {
                setPosts(response.data);
            }
        }
        fetchData();
    }, [])

    return (
        <>
            {
                posts && posts.length > 0 ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '20px', }} >
                {posts.map((post) => (
                    <Box key={post._id} sx={{ flex: '1 1 calc(25% - 20px)', maxWidth: 'calc(25% - 20px)' }}>
                        <Post post={post} />
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
