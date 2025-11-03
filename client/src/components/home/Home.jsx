
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

//ye
// import { Box, Grid } from '@mui/material';

// //components
// import Banner from '../banner/Banner';
// import Categories from './Categories';
// import Posts from './post/Posts';

// const Home = () => {
//     return (
//         <>
//             <Banner />
//             <Grid container spacing={1} >
//                 <Grid item lg={2} sm={3} xs={12}>
//                     <Categories />
//                 </Grid>
//                 <Grid container item xs={12} sm={9} lg={10}>
//                     <Posts />
//                 </Grid>
//             </Grid>
//         </>
//     )
// }

// export default Home;