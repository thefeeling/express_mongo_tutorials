/**
 * Created by dev on 2017. 2. 6..
 */
const express = require('express');
const mongoose = require('mongoose');
const co = require('co');
const router = express.Router();


const ObjectId = mongoose.Types.ObjectId;



const Person = require('./models/population').Person;
const Story = require('./models/population').Story;

/**
 * Populate - DBRef-like behavior
 * : Population 샘플 코드.
 */
router.get('/', (req, res) => {

    // 1)
    // const users = [{ name: 'Indiana Jones', weapon: 389 }];
    // users.push({ name: 'Batman', weapon: 8921 });
    //
    // Story.populate(users, {path: 'users'}, function (err, users) {
    //     res.json(users);
    // });

    // 2)
    // Story.find({ title: '골든타임' })
    //     .populate('_creator')
    //     .exec(function (err, story) {
    //         if(err) {
    //             console.error(err);
    //         }
    //         res.json(story);
    //     });

    // 3)
    co(function* () {
        // const author = yield Person.find({ name: 'kschoi'}).exec();
        // const stories = yield Story.populate(author, { path: 'author'});
        // console.log(stories);

        const stories = yield Story.find({ title: '골든타임' })
            .populate('_creator', '_id name age')
            .exec();

        yield res.json({
            stories
        });
    });
    
    
    
    
    


});


router.post('/', (req, res) => {
    const newPerson = new Person({
        _id:  ObjectId(),
        name: req.body.name,
        age: req.body.age
    });

    newPerson.save(function (err) {
        if(err) {
            console.error(err);
        }

        const newStory = new Story({
            title: req.body.title,
            _creator: newPerson._id
        });

        newStory.save(function (err) {
            if(err) {
                console.error(err);
            }

            res.status(200).json({
                status: 'complete'
            });
        });
    });
});

module.exports = router;