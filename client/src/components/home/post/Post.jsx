
import { Box, Typography, styled } from '@mui/material';

import { addElipsis } from '../../../utils/common-utils';

const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    height: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: 0.3s;
    &:hover {
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
    }
`;

const Image = styled('img')({
    width: '100%',
    height: 150,
    borderRadius: '10px 10px 0 0',
    objectFit: 'cover',
});

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Heading = styled(Typography)`
    font-size: 16px;
    font-weight: 600;
`;

const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
`;

const Post = ({ post }) => {
    
    return (
        <Container>
            <Image src={post.picture} alt="blog" />
            <Text>{post.categories}</Text>
            <Heading>{addElipsis(post.title, 20)}</Heading>
            <Text>By {post.username}</Text>
            <Details>{addElipsis(post.description, 100)}</Details>
        </Container>
    );
};

export default Post;
