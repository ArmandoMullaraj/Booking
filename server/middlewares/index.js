import expressJwt from 'express-jwt'
import user from '../models/user'

export const requireSignin = expressJwt({
    // secret, expiryDate
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
})

{/* This file/middleware can be applied in routes. So any route I want to protect and make sure it is accessed only by the loged-in 
user with the valid token */}