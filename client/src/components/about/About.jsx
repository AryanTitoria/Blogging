import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email, LinkedIn } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(https://raw.githubusercontent.com/aryantitoria12/images/main/banner.png);
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
                    We are a group of three friends — Aryan Titoria, Vertika Sati, and Shalini Mehra — passionate Engineering students from India.<br />
                    We love to learn, build, and create exciting projects together.<br />
                    Check out some of our favorite work here
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
