import { useEffect, useState, useContext } from 'react';

import { Box, Typography, styled } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

import { useParams, Link, useNavigate } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)(({ theme }) =>({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
})

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 20px 0 10px 0;  
    word-break: break-word;
`;

const IconContainer = styled(Box)`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 10px; /* pushes icons below the image */
`;


const EditIcon = styled(Edit)`
    background: #fff;
    border: 1px solid #878787;
    border-radius: 8px;
    padding: 6px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: #f0f0f0;
    }
`;

const DeleteIcon = styled(Delete)`
    background: #fff;
    border: 1px solid #878787;
    border-radius: 8px;
    padding: 6px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: #f0f0f0;
    }
`;

const Author = styled(Box)`
    color: #878787;
    margin: 20px 0;
    display: flex;
`;

const Description = styled(Typography)`
    word-break: break-word;
`;

const DetailView = () => {

    const [post, setPost] = useState({});

    const { id } = useParams();
    const { account } = useContext(DataContext);

    const navigate = useNavigate();

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const fetchData = async() => {
            let response = await API.getPostById(id);
            if(response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, [])

    const deleteBlog = async() => {
        let response = await API.deletePost(post._id);
        if (response.isSuccess) {
            navigate('/');
        }
    }


    return (
        <Container>
            <Image src={url} alt="blog" />

            <IconContainer >
                {
                    account.username === post.username &&
                    <>
                        <Link to={`/update/${post._id}`}><EditIcon color="primary"/></Link>
                        <DeleteIcon onClick={() => deleteBlog()} color="error"/>
                    </>
                }
            </IconContainer>
            <Heading>{post.title}</Heading>

            <Author>
                <Typography>Author: <Box component="span" style={{ fontWeight: 600}}>{post.username}</Box></Typography>
                <Typography style={{ marginLeft: 'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>

            <Description>{post.description}</Description>
        </Container>
    )
}

export default DetailView;