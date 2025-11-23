import { Box, Typography, styled } from '@mui/material';
import API_URL from '../../api'; // adjust import path if needed
import defaultImg from '../../../assets/default-image.png'; // optional local default

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

/**
 * Resolve the image source for a post:
 * - If post.picture starts with http(s) -> return as-is
 * - If it starts with /file or is a filename -> prefix with API_URL
 * - If it contains localhost -> replace with API_URL
 * - Otherwise fallback to default image
 */
const resolveImageSrc = (picture) => {
  if (!picture) return defaultImg; // local default or a remote default

  const trimmed = picture.trim();

  // already absolute url
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  // starts with /file or relative path -> prefix with API_URL
  if (trimmed.startsWith('/file') || trimmed.startsWith('file/')) {
    return `${API_URL}${trimmed}`;
  }

  // if saved with localhost base, replace it
  if (trimmed.includes('localhost:')) {
    return trimmed.replace(/https?:\/\/localhost:\d+/i, API_URL);
  }

  // fallback: prefix just in case it's a filename or relative path
  return `${API_URL}/${trimmed}`.replace(/([^:]\/)\/+/g, '$1'); // removes duplicate slashes
};

const Post = ({ post }) => {
    const imgSrc = resolveImageSrc(post?.picture);

    return (
        <Container>
            <Image src={imgSrc} alt="blog" onError={(e) => { e.target.onerror = null; e.target.src = defaultImg; }} />
            <Text>{post.categories}</Text>
            <Heading>{addElipsis(post.title, 20)}</Heading>
            <Text>By {post.username}</Text>
            <Details>{addElipsis(post.description, 100)}</Details>
        </Container>
    );
};

export default Post;

// import { Box, Typography, styled } from '@mui/material';

// import { addElipsis } from '../../../utils/common-utils';

// const Container = styled(Box)`
//     border: 1px solid #d3cede;
//     border-radius: 10px;
//     margin: 10px;
//     height: 320px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     transition: 0.3s;
//     &:hover {
//         box-shadow: 0 0 10px rgba(0,0,0,0.2);
//     }
// `;

// const Image = styled('img')({
//     width: '100%',
//     height: 150,
//     borderRadius: '10px 10px 0 0',
//     objectFit: 'cover',
// });

// const Text = styled(Typography)`
//     color: #878787;
//     font-size: 16px;
// `;

// const Heading = styled(Typography)`
//     font-size: 18px;
//     font-weight: 600;
// `;

// const Details = styled(Typography)`
//     font-size: 16px;
//     word-break: break-word;
// `;

// const Post = ({ post }) => {
    
//     return (
//         <Container>
//             <Image src={post.picture} alt="blog" />
//             <Text>{post.categories}</Text>
//             <Heading>{addElipsis(post.title, 20)}</Heading>
//             <Text>By {post.username}</Text>
//             <Details>{addElipsis(post.description, 100)}</Details>
//         </Container>
//     );
// };

// export default Post;
