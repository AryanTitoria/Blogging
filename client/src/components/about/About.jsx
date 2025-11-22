import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email, LinkedIn } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
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

const About = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3">Building Ideas Together</Typography>
                <Text variant="h5">
                    I’m Aryan Titoria, a tech enthusiast currently learning how to build efficient, scalable, and user-friendly systems.
                    I enjoy experimenting, debugging, and improving with each project I take on. Here, I share my learnings, small wins, challenges, and everything I pick up on this journey.<br />
                    Check out some of my work here
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/AryanTitoria" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                </Text>
                <Text variant="h5">
                    Want to collaborate or just say hi? connect to us on LinkedIn
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.linkedin.com/in/aryan-titoria/" color="inherit" target="_blank">
                            <LinkedIn />
                        </Link>
                    </Box>  <br></br>
                        Follow me on Instagram at  <strong>@aryan_titoria12</strong>
                        <Link href="https://www.instagram.com/aryan_titoria12/" color="inherit" target="_blank">
                            <Instagram />
                        </Link>.
                </Text>

            </Wrapper>
        </Box>
    )
}

export default About;
