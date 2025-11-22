import mongoose from 'mongoose';

export const connection = async (username, password) => {
    try {
        // 1) Check if full MONGODB_URL is provided (preferred for production)
        const fullURL = process.env.MONGODB_URL;

        let URL = "";

        if (fullURL) {
            URL = fullURL;   // use full connection string from env
        } else {
            // fallback: build connection string using username/password
            URL = `mongodb+srv://${username}:${password}@blog-app.cy9vr3n.mongodb.net/?appName=Blog-app`;
        }

        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Database connected successfully');

    } catch (error) {
        console.log('Error while connecting with the database: ', error);
        process.exit(1); // exit app if DB fails (good for production)
    }
};

export default connection;

// import mongoose from 'mongoose'



// export const connection = async (username, password) => {
//     const URL = `mongodb+srv://${username}:${password}@blog-app.cy9vr3n.mongodb.net/?appName=Blog-app`;
//     try {
//         await mongoose.connect(URL, { useNewUrlParser: true });
//         console.log('Database connected successfully');
//     } catch (error){
//         console.log('Error while connecting with the database ', error);
//     }
// }

// export default connection;