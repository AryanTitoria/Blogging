import { useEffect, useState, useContext } from 'react';

import { Box, Typography, styled } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

import { useParams } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)`
    margin: 50px 100px
`;

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


// const EditIcon = styled(Edit)`
//     margin: 50px;
//     padding: 5px;
//     border: 1px solid #878787;
//     border-radius: 10px;
// `;

// const DeleteIcon = styled(Delete)`
//     margin: 50px;
//     padding: 5px;
//     border: 1px solid #878787;
//     border-radius: 10px;
// `;

const DetailView = () => {

    const [post, setPost] = useState({});

    const { id } = useParams();
    const { account } = useContext(DataContext);

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


    return (
        <Container>
            <Image src={url} alt="blog" />

            <IconContainer >
                {
                    account.username === post.username &&
                    <>
                        <Edit color="primary"/>
                        <Delete color="error"/>
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