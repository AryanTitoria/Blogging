import { Box, Typography, styled } from '@mui/material';
import API_URL from '../../api'; // adjust path based on your project
import defaultImg from '../../../assets/default-image.png'; // or use any default image you want

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
    font-size: 16px;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
`;

const Details = styled(Typography)`
    font-size: 16px;
    word-break: break-word;
`;

const fixImageURL = (url) => {
    if (!url) return defaultImg;

    // Case 1: already a full https URL → return as-is
    if (url.startsWith("https://") || url.startsWith("http://")) {
        // if it's localhost, rewrite it:
        if (url.includes("localhost")) {
            return url.replace("http://localhost:8000", API_URL);
        }
        return url;
    }

    // Case 2: relative URL like /file/xxx
    if (url.startsWith("/file")) {
        return `${API_URL}${url}`;
    }

    // Fallback
    return defaultImg;
};

const Post = ({ post }) => {

    const imageSrc = fixImageURL(post.picture);

    return (
        <Container>
            <Image 
                src={imageSrc} 
                alt="blog"
                onError={(e) => { e.target.onerror = null; e.target.src = defaultImg; }} 
            />
            <Text>{post.categories}</Text>
            <Heading>{addElipsis(post.title, 20)}</Heading>
            <Text>By {post.username}</Text>
            <Details>{addElipsis(post.description, 100)}</Details>
        </Container>
    );
};

export default Post;


