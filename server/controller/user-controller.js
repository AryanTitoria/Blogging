

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