const { Schema, model } = require("mongoose");
const moment = require('moment');


const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: [true, 'User email address required'],
      validate: {
        validator: function (v) {
      
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
    },
},
thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought'
}],
friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
}]
}, {
toJSON: {
    virtuals: true,
    getters: true
},
id: false
});

UserSchema.virtual('friendCount').get(function () {
return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;