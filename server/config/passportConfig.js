const LocalStrategy=require('passport-local');
const User=require('../models/user');


exports.initialisingPassport= (passport)=>{
        passport.use(new LocalStrategy(
  async (username, password, done) => {
    const user= await User.findOne({ username: username });
        
   //   if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password!=password) { return done(null, false); }
      return done(null, user);
    })
    )
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });
    passport.deserializeUser(async (id,done)=>{
        try{
            const user=await User.findById(id);
            done(null,user);
        }
        catch(error){
            done(error,false);
        }
    });
};