import bcrypt from 'bcrypt';

import User from '../model/user.js';

export const signupUser = async (request, response) => {
    try{
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const userData = { username: request.body.username, name: request.body.name, password: hashedPassword }
        //const userData = request.body;
        console.log('signup request: ', userData);
        const newUser = new User(userData);
        await newUser.save();

        return response.status(200).json({ msg: 'signup successful'})
    }catch (error){
        console.log('error during signup: ', error);
        return response.status(500).json({ msg: 'Error while signup the user', error: error.message})
    }
}

/*


import user from '../model/user.js';

export const signupUser = async (request, response) => {
    try{
        const user = request.body;

        const newUser = new UserActivation(user);
        await newUser.isActive();

        return response.status(200).json({ msg: 'signup successful'})
    }catch (error){
        return response.status(500).json({ msg: 'Error while signup the user'})
    }
}
    */