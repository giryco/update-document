const updatePackage = require('../../index');

const collectionsDirectory = '/home/ofm/Projects/resources/collections/';
const collection = 'User';
const updateObject = {
    conditions: {
        email: 'maxhaviland2@gmail.com'
    },
    object: {
        email: 'maxhaviland@gmail.com'
    }
};

updatePackage.update(collectionsDirectory, collection, updateObject)
    .then(res => {
        console.log(res);
    })
    .catch(rej => {
        console.log(rej);
    })