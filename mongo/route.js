/**
 * Created by dev on 2017. 2. 6..
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;



const Person = require('./models/population').Person;
const Story = require('./models/population').Story;

/**
 * Populate - DBRef-like behavior
 * : Population 샘플 코드.
 */
router.get('/population', (req, res) => {
    Story.find({ title: '골든타임' })
        .populate('_creator')
        .exec(function (err, story) {
            if(err) {
                console.error(err);
            }
            res.json(story);
        });
});


router.post('/population', (req, res) => {
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


/**
 * Populate - DBRef-like behavior
 * : Population 샘플 코드.
 */
router.get('/aggregate', (req, res) => {
});


module.exports = router;