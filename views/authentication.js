const express = require('express');
const authRoutes = require('./routes/auth-routes');

const app = express();

app.set('view engine','ejs');

//set up routes
app.use('/auth', authRoutes);

app.get('/',(reg,res) => {
  res.render('home');
});

app.listen(8080, () => {
  console.log('Server is listening')
});
