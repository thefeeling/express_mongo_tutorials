/**
 * Created by dev on 2017. 2. 2..
 */
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

/**
 * Validator 추가(2017.02.06)
 */
const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['TODO', 'IN_PROGRESS', 'DONE']
    },
    context: {
        type: String,
        required: true,
        enum: ['NONE', 'WORK', 'HOME']
    },
    dueDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    doneAt: {
        type: Date
    }
});

// Instance Methods
todoSchema.methods.findTitleAndStatus = function (cb) {
    return this.model('todo').find({}, { title: 1, status: 1 }, cb);
};

todoSchema.methods.page = function (skip, limit) {
    return this.model('todo').find().skip(skip).limit(limit).exec();
};

// Static Methods
todoSchema.statics.findByStatus = function (status) {
    return this.find({ status });
};

// Query Helper
todoSchema.query.byStatus = function(status) {
    return this.find({ status });
};


/**
 * Virtual : Only Instance Use
 * 인스턴스 생성 후, 가상 프로퍼티로 사용.
 * 실제 디비에 저장되지 않음.
 */
todoSchema.virtual('titleAndStatus')
.get(function () {
    return `Title : ${this.title} Status: ${this.status}`
})
.set(function (value) {
    const valArr = value.split(' ');
    this.title = valArr[0];
    this.status = valArr[1];
});


module.exports = Mongoose.model('todo', todoSchema);