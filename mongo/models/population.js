
/**
 * Population 예제 모델, 스키마
 */

const mongoose = require('mongoose')
    , Schema = mongoose.Schema;


const personSchema = Schema({
    name    : String,
    age     : Number,
    stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});


const storySchema = Schema({
    _creator : { type: Schema.Types.ObjectId, ref: 'Person' },
    title    : String,
    fans     : [{ type: Number, ref: 'Person' }]
});

const Person = mongoose.model('Person', personSchema);
const Story  = mongoose.model('Story', storySchema);

module.exports = {
    Story,
    Person
};

