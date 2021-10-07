import User from '../models/user';
import jsonwebtoken, { JsonWebTokenError } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => { 
       try {
        console.log(req.body);
        /* req.body is const res = await axios.post(`http://localhost:8000/api/register`, {
                name,
                email,
                password,
            });
        */
       const { name, email, password } = req.body;
       //validation
       if (!name) return res
        .status(400)
        .send('Name is required!');
       if (!password || password.length < 6) return res
        .status(400)
        .send('Password is required and should be minimum 6 characters long');
        let userExist = await User.findOne({email}).exec();
       if (userExist) return res
        .status(400)
        .send('E-mail is taken!');
       //register
       const user = new User(req.body);
       
        await user.save()
        console.log('USER CREATED', user);
        return res.json({ ok: true });
       } catch (err) {
               console.log('CREATE USER FAILE', err);
               return res.status(400).send('Error. Try again.')
       }
};

export const login = async (req, res) => {
        console.log(req.body);
        const {email, password} = req.body;
        try {
          //check if user with that email exist
          let user = await User.findOne({email}).exec();
          // console.log('USER EXIST', user);
          if(!user) res.status(400).send("User with that email not found");
          // compare password
          user.comparePassword (password, (err, match) => {
                console.log('COMPARE PASSORD IN LOGIN ERR', err);
                if(!match || err) return res.status(400).send("Wrong password")
                // generate a TOKEN then send as response to the client
                let token = jwt.sign({_id: user._id }, process.env.JWT_SECRET, {
                        expiresIn: '7d'
                });
                res.json({token, user: {
                        _id : user._id,
                        name: user.name,
                        email: user.email,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                } });
          });
        } catch (err) {
                console.log('LOGIN ERROR', err)
                res.status(400).send("Signin failed");
        }
};