const {Datastore} = require('@google-cloud/datastore');

const datastore = new Datastore();

const fromDatastore = (obj) => {
    obj.id = parseInt(obj[Datastore.KEY].id, 10);

    return obj;
};

const create = async (kind, data) => {
    
    const key = datastore.key(kind);

    return datastore.save({key: key, data: data}).then(() => {
        return key;
    });
};

const read = async (kind, id) => {

    const key = datastore.key([kind, id]);

    return datastore.get(key).then(entity => {
        if (entity[0] == undefined || entity[0] == null) {
            return null;
        } else {
            return entity[0];
        }
    });
};

const list = async (kind) => {
    
    let q = datastore.createQuery(kind);

    return datastore.runQuery(q).then(entities => {
        
        const list = {
            "results": entities[0].map(fromDatastore)
        };

        return list;
    });
};

const update = async (kind, id, data) => {

    const key = datastore.key([kind, id]);

    return datastore.get(key).then(entity => {
        if (entity[0] == undefined || entity[0] == null) {
            return null;
        } else {
            return datastore.save({key: key, data: data}).then(() => {
                return data;
            });
        }
    });
};

const _delete = async (kind, id) => {
    
    const key = datastore.key([kind, id]);

    return datastore.delete(key).then(err => {
        if (err[0].indexUpdates != 0) {
            return 1;
        } else {
            return null;
        }
    });
};

module.exports = {
    create,
    read,
    list,
    update,
    delete: _delete
};