import mongoose from 'mongoose'



export const connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@blog-app.cy9vr3n.mongodb.net/?appName=Blog-app`;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error){
        console.log('Error while connecting with the database ', error);
    }
}

export default connection;