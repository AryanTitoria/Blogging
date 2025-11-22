
import { Box, Grid } from '@mui/material';

//components
import Banner from '../banner/Banner';
import Categories from './Categories';
import Posts from './post/Posts';

const Home = () => {
    return (
        <>
            <Banner />
            <Box sx={{ display: 'flex', margin: '20px ' }}>
                <Box >
                    <Categories />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Posts />
                </Box>
            </Box>
        </>
    );
}

export default Home;

