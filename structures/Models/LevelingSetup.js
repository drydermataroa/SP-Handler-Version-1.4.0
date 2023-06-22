const mongoose = require('mongoose')
const { Schema } = mongoose

const reqString = {
    type: String,
    required: true,
}

const schema = new Schema({
    guildId: reqString,
    rankCard: Boolean
})

const name = 'setupSchema'

module.exports = mongoose.models[name] || mongoose.model(name, schema)