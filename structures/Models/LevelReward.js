const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const levelrewardSchema = new mongoose.Schema({
    guildId: String,
    level: Number,
    role: String
})

const name = 'levelreward'
module.exports = mongoose.models[name] || mongoose.model(name, levelrewardSchema, name)