const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../models/User');


describe('Authentication', function () {
   const options = {
     useNewUrlParser: true,
     autoIndex: true,
     useUnifiedTopology: true,
   };
  
   mongoose.connect(
     'mongodb+srv://lennonpajar:password101@cluster0.rvcfx.mongodb.net/CCSCAIDB?retryWrites=true&w=majority',
     options
   );

    const email = 'admin@gmail.com';
    const password =
      'admin1234';
    it('Login', (done) => {
      User.findOne({ email })
        .select('+password')
        .then((result) => {
          result.matchPassword(password).then((matched) => {
            assert(matched === true);
            done();
          });
        })
        .catch((error) => {
          console.log(error);
          done();
        });
   });
    
});
