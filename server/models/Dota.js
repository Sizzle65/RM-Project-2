const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let DotaModel = {};

const convertId = mongoose.Types.ObjectId;
const trimString = (name) => _.escape(name).trim();

const DotaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: trimString,
  },
  primaryAttribute: {
    type: String,
    required: true,
    trim: true,
    set: trimString,
  },
  strength: {
    type: Number,
    min: 0,
    required: true,
  },
  agility: {
    type: Number,
    min: 0,
    required: true,
  },
  intelligence: {
    type: Number,
    min: 0,
    required: true,
  },
  moveSpeed: {
    type: Number,
    min: 0,
    required: true,
  },
  armor: {
    type: Number,
    min: 0,
    required: true,
  },
  basicName1: {
    type: String,
    required: true,
    trim: true,
    set: trimString,
  },
  basicDesc1: {
    type: String,
    required: true,
    trim: true,
    set: trimString,
  },
  basicName2: {
    type: String,
    required: true,
    trim: true,
    set: trimString,
  },
  basicDesc2: {
    type: String,
    required: true,
    trim: true,
    set: trimString,
  },
  basicName3: {
    type: String,
    required: true,
    trim: true,
    set: trimString,
  },
  basicDesc3: {
    type: String,
    required: true,
    trim: true,
    set: trimString,
  },
  ultimateName: {
    type: String,
    required: true,
    trim: true,
    set: trimString,
  },
  ultimateDesc: {
    type: String,
    required: true,
    trim: true,
    set: trimString,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdData: {
    type: Date,
    default: Date.now,
  },
});

DotaSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  primaryAttribute: doc.primaryAttribute,
  strength: doc.strength,
  agility: doc.agility,
  intelligence: doc.intelligence,
  moveSpeed: doc.moveSpeed,
  armor: doc.armor,
  basicName1: doc.basicName1,
  basicDesc1: doc.basicDesc1,
  basicName2: doc.basicName2,
  basicDesc2: doc.basicDesc2,
  basicName3: doc.basicName3,
  basicDesc3: doc.basicDesc3,
  ultimateName: doc.ultimateName,
  ultimateDesc: doc.ultimateDesc,
});

DotaSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return DotaModel.find(search).select('name primaryAttribute strength agility ' +
   'intelligence moveSpeed armor basicName1 basicDesc1 basicName2 basicDesc2 ' +
   'basicName3 basicDesc3 ultimateName ultimateDesc').exec(callback);
};

DotaModel = mongoose.model('Dota', DotaSchema);

module.exports.DotaModel = DotaModel;
module.exports.DotaSchema = DotaSchema;
