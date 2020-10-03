const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
    name: String,
    uuid: { type: String, index: true },
});

const SiteModel = mongoose.model('Site', siteSchema);

module.exports = SiteModel;
