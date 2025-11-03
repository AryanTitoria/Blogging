import { useState, useEffect, useContext } from 'react';

import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';

import { useLocation, useNavigate } from 'react-router-dom';

import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';

const Container = styled(Box)`
    margin: 50px 100px
`;

const Image = styled('img')({
    width: '95%',         
    height: '50vh', objectFit: 'cover',
    display: 'block', margin: '0 auto', borderRadius: '10px'    
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    margin-top: 50px;
    font-size: 18px;
    border: none;
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

const CreatePost = () => {

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');

    const { account } = useContext(DataContext);

    const location = useLocation();
    const navigate = useNavigate();

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'

    useEffect(() => {
  const uploadImage = async () => {
    if (file) {
      const data = new FormData();
      data.append("file", file);

      try {
        const response = await API.uploadFile(data);
        console.log("Upload response:", response.data);

        // ✅ Fixed logic
        const imageUrl = response.data?.imageUrl || response.data;

        if (imageUrl) {
          setPost(prev => ({
            ...prev,
            picture: imageUrl
          }));
          console.log("✅ Image URL set to:", imageUrl);
        } else {
          console.error("❌ No imageUrl found in response:", response.data);
        }

      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  uploadImage();
}, [file]);

useEffect(() => {
 
  setPost(prev => ({
    ...prev,
    categories: location.search?.split("=")[1] || "All",
    username: account.username
  }));
}, [account.username, location.search]);



    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }
    const savePost = async () => {
    // Default banner image
    const defaultImage = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';

    // ⏳ If file selected but upload not complete yet
    if (file && !post.picture) {
        alert("Please wait, image is still uploading...");
        return;
    }

    // 🧩 If no image selected at all, use default banner
    const postData = {
        ...post,
        picture: post.picture || defaultImage,
    };

    try {
        const response = await API.createPost(postData);
        if (response.isSuccess) {
            navigate('/');
        } else {
            alert("Failed to create post. Please try again.");
        }
    } catch (error) {
        console.error("Error creating post:", error);
        alert("Something went wrong while creating the post.");
    }
};

    // const savePost = async () => {
    // // 🧩 Check if image is still uploading
    // if (!post.picture) {
    //     alert("Image is still uploading. Please wait...");
    //     return;
    // }

    // try {
    //     const response = await API.createPost(post);
    //     if (response.isSuccess) {
    //         navigate('/');
    //     } else {
    //         alert("Failed to create post. Please try again.");
    //     }
    // } catch (error) {
    //     console.error("Error creating post:", error);
    //     alert("Something went wrong while creating the post.");
    // }
    // };

    // const savePost = async () => {
    //     let response = await API.createPost(post);
    //     if (response.isSuccess) {
    //         navigate('/');
    //     }
    // }
    
    return(
        <Container>
            <Image src={url} alt="banner" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input 
                type="file" 
                id="fileInput"
                style={{ display: 'none' }}
                onChange={(e) => setFile(e.target.files[0])}
                />

                <InputTextField placeholder='Title' onChange={(e) => handleChange(e)} name="title" />
                <Button variant="contained" onClick={() => savePost()}>Publish</Button>
            </StyledFormControl>

            <Textarea 
                minRows={5}
                placeholder="Tell your story..."
                onChange={(e) => handleChange(e)}
                name="description"
            />
        </Container>
    )
}


export default CreatePost;