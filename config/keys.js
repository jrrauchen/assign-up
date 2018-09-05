//add files to .gitignore, secret keys

module.exports = {
  google: {
    clientID:"31462726607-l66r0qds698dv8l3b601n1lseq6eksue.apps.googleusercontent.com",
    clientSecret: "yag0intVstvS6xd9ja5Y_-Fd"
  },
  mongodb:{
    //dbURI:'mongodb://jrau:jolteded1@ds029224.mlab.com:29224/oauth'
    dbURI:'mongodb://admin:password1@ds143932.mlab.com:43932/assignup'
  },
  session:{
    cookieKey:'jrausuperfly'
  }
};
