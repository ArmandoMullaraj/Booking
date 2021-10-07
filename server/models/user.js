import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true, //removes any extra white space etc.
        required: 'Name is required',
    },
    email: {
        type: String,
        trim: true, 
        required: 'E-mail is required',
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 3,
        max: 30,
    },
  },
  { timestamps: true} //for the db dates
 );


 userSchema.pre("save", function (next) {
     let user = this;
// hash password only if user is changing the passord or registering for the first time
// make sure to use this otherwise each time user.save() is executed, password will get auto updated and you can't login with original password
     if (user.isModified('password')) {
        return bcrypt.hash(user.password, 12, function(err, hash) {
            if (err) {
                console.log("BCRYPT HASH ERR ", err);
                return next(err);
            }
            user.password = hash;
            return next();
        });
     } else {
         return next();
     }
 });

 userSchema.methods.comparePassword = function (password, next) {
     bcrypt.compare(password, this.password, function(err, match) {
         if(err){
             console.log('COMPARE PASSWORD ERR', err)
             return next(err, false);
         }
         // if no err, we get null
         console.log("MATCH PASSWORD", match) 
         return next(null, match); //true
     });
 };


export default mongoose.model("User", userSchema);