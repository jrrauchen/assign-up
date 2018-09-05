const router = require('express').Router();
const passport = require('passport');
//auth login
router.get('/login',(req,res) => {
  res.render('login', {user:req.user });
});

router.get('/logout', (req,res) => {
  //handle with passport
  req.logout();
  res.redirect('/'); //redirect to home
});
//google auth
router.get('/google', passport.authenticate('google', {
  scope:['profile']
}));

//calback route for google to redirect //
router.get('/google/redirect', passport.authenticate('google'), (req,res)=>{
  //res.send(req.user);
  res.redirect('/profile/');
});

module.exports = router;
