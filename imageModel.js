const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    imageUrl: {
        type:String
    },
    
});

module.exports = mongoose.model('EmageM', imageSchema);