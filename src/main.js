// Packages
const readDocumentPackage = require('../../read-document/index');

// Vendors
const fs = require('fs');

const update = (collectionsDirectory, collection, updateObject) => {
    return new Promise((resolve, reject) => {
        try {
            // Params verification: start
            if (!collectionsDirectory) {
                const result = {
                    message: 'Collections directory was not defined'
                };

                resolve(result);
            }

            if (!collection) {
                const result = {
                    message: 'Collection was not defined'
                };

                resolve(result);
            }

            if (!updateObject) {
                const result = {
                    message: 'Object to read query not defined'
                };

                resolve(result);
            }
            // Params verification: end
            
            readDocumentPackage.read(collectionsDirectory, collection, updateObject.conditions, updateObject.options)
                .then(res => {
                    const documents = [];
                    collection = collection.toLowerCase();

                    (collectionsDirectory.substr(-1) === '/') ? collectionsDirectory = collectionsDirectory : collectionsDirectory = collectionsDirectory + '/';
                    collectionsDirectory = collectionsDirectory + collection + '/';
                    if (res.length > 0) {
                        for (let i = 0; i < res.length; i++) {
                            const object = res[i];
                            const newObject = {
                                ...object,
                                ...updateObject.object
                            };
                            documents.push(newObject);
                            
                            fs.writeFileSync(collectionsDirectory + object._id, JSON.stringify(newObject));
                        }
                        
                        const result = documents;
    
                        resolve(result);
                    } else {
                        const result = {
                            message: 'No document found',
                            result: documents
                        }
    
                        resolve(result);
                    }
                })
                .catch(rej => {
                    reject(rej);
                })
        } catch (error) {
            reject(error);
        }
    })
}

const updateById = (collectionsDirectory, collection, id, updateObject) => {
    return new Promise((resolve, reject) => {
        try {
            // Params verification: start
            if (!collectionsDirectory) {
                const result = {
                    message: 'Collections directory was not defined'
                };

                resolve(result);
            }

            if (!collection) {
                const result = {
                    message: 'Collection was not defined'
                };

                resolve(result);
            }

            if (!id) {
                const result = {
                    message: 'Id not defined'
                };

                resolve(result);
            }
            // Params verification: end

            readDocumentPackage.readById(collectionsDirectory, collection, id, updateObject.options)
                .then(res => {
                    const documents = [];
                    collection = collection.toLowerCase();

                    (collectionsDirectory.substr(-1) === '/') ? collectionsDirectory = collectionsDirectory : collectionsDirectory = collectionsDirectory + '/';
                    collectionsDirectory = collectionsDirectory + collection + '/';
                    if (res && res.length > 0) {
                        for (let i = 0; i < res.length; i++) {
                            const object = res[i];
                            const newObject = {
                                ...object,
                                ...updateObject.object
                            };

                            documents.push(newObject);
                            
                            fs.writeFileSync(collectionsDirectory + object._id, JSON.stringify(newObject));
                        }
                        
                        const result = documents;
    
                        resolve(result);
                    }

                    const result = {
                        message: 'No document found',
                        result: documents
                    }

                    resolve(result);
                })
                .catch(rej => {
                    reject(rej);
                })
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    update,
    updateById
}