import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, LinkedIn, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;


const Contact = () => {
    return (
        <Box>
            <Banner />
            <Wrapper>
                <Typography variant="h3">Let's Connect!</Typography>    
                <Text variant="h5">
                    Hi, I’m <strong>Aryan Titoria</strong> — a developer passionate about building web apps and learning new technologies.
                    <br /><br />
                    You can reach me on LinkedIn: <strong>Aryan Titoria</strong>
                    <Link 
                        href="https://www.linkedin.com/in/aryan-titoria/" 
                        color="inherit" 
                        target="_blank"
                    >
                        <LinkedIn />
                    </Link>
                    <br/> Dm me on Instagram: <strong>@aryan_titoria12</strong>
                    <Link href="https://www.instagram.com/aryan_titoria12/" color="inherit" target="_blank">
                        <Instagram />
                    </Link>
                    <br /><br />
                    For any inquiries, feel free to email me at: <strong>aryantitoria90@gmail.com</strong>
                    <Link 
                        href="mailto:aryantitoria90@gmail.com" 
                        target="_blank" 
                        color="inherit"
                    >
                        <Email /> 
                    </Link>
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;