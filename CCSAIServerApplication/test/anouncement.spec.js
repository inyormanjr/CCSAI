const assert = require('assert');
const mongoose = require('mongoose');
const Anouncement = require('../models/Anouncement');
var ObjectId = require('mongoose').Types.ObjectId;


after((done) => {
  Anouncement.collection.drop(() => {
  done();
  });
})
//describe test
describe('Anouncement Schema', function () {
  const options = {
    useNewUrlParser: true,
    autoIndex: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(
    'mongodb+srv://lennonpajar:password101@cluster0.rvcfx.mongodb.net/CCSCAIDB?retryWrites=true&w=majority',
    options
  );

  var creatorId = new ObjectId('62c14b33f3d170d494a8226f');
  var newAnouncement = new Anouncement({
      title: 'test anouncement',
      description: 'test description',
      createAt: Date.now,
      createdBy: creatorId,
    });
    it('Create New', function (done) {
      
        newAnouncement.save(done);
    });
  
    it('Update By Id', async () => {
      newAnouncement.title = 'Updated Title';
      var result = Anouncement.updateOne(newAnouncement);
      assert.equal(result._update.title, 'Updated Title');
    });
    
    it('Get All', async   () => {
    var result = await Anouncement.find();
    assert(result.length > 0);
    });
  
    
    it('Get By Id', async () => {
    var result = await Anouncement.findById(newAnouncement._id); 
    assert(result !== null);
    });
    
    it('Delete By Id', async () => {
      var result = await Anouncement.deleteOne(newAnouncement._id);
      assert.ok(result.acknowledged === true);
    });
});
