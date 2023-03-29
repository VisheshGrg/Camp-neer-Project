const User=require('../models/user');

module.exports.renderRegister = (req,res)=>{
    res.render('./users/register');
}

module.exports.createUser = async(req,res)=>{
    try{
        const {email,username,password} = req.body;
        const user = new User({email,username});
        const registeredUser=await User.register(user,password);
        req.login(registeredUser,err=>{
            if(err) {return next(err);}
            req.flash('success','Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        }); 
    }
    catch(e){
        req.flash('error',e.message);
        res.redirect('/register');
    }
}

module.exports.renderLogin = (req,res)=>{
    res.render('./users/login');
}

module.exports.loginUser = async(req,res)=>{
    req.flash('success','Welcome back!');
    let redirectPath = req.session.returnToPath || '/campgrounds';
    if(redirectPath=='/wdw'){
        redirectPath='/campgrounds';
    }
    delete req.session.returnToPath;
    res.redirect(redirectPath);
}

module.exports.logoutUser = (req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success',"Goodbye!");
        res.redirect('/campgrounds');
    });
}
