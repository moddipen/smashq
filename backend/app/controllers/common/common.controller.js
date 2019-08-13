var mongoose = require("mongoose");

// Create and Save a New Record
exports.create = (req, res) => {
    var Model = mongoose.model(req.params.collection);

    // Validate request
    if (!req.body) {
        return res.send(send_response(null, true, 'content can not be empty'));
    }

    // Create a record
    const object = new Model(req.body);

    // Save Object in the database
    object.save()
        .then(data => {
            res.send(send_response(data, false, ''));
        }).catch(err => {
            res.send(send_response(null, true, 'Some error occurred while creating.'));
        });
};

// Retrieve and return all records from the collection.
exports.get = (req, res) => {
    var Model = mongoose.model(req.params.collection);
    Model.find()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving."
            });
        });
};

// Find a single record with a id
exports.getById = (req, res) => {
    var Model = mongoose.model(req.params.collection);
    Model.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Record not found with id " + req.params.id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Record not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving record with id " + req.params.id
            });
        });
};

// Update a record identified by the id in the request
exports.update = (req, res) => {
    var Model = mongoose.model(req.params.collection);

    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Record content can not be empty"
        });
    }
    let id;
    if (req.params.id) {
        id = req.params.id;
    }
    else {
        id = req.body._id || req.body.id;
    }

    // Find record and update it with the request body
    Model.findByIdAndUpdate(id, req.body, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Record not found with id " + req.params.id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Record not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating record with id " + req.params.id
            });
        });
};

// Delete a record with the specified id in the request
exports.destroy = (req, res) => {
    var Model = mongoose.model(req.params.collection);

    Model.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Record not found with id " + req.params.id
                });
            }
            res.send({ message: "Record deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Record not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete record with id " + req.params.id
            });
        });
};

exports.softdestroy = (req, res) => {
    var Model = mongoose.model(req.params.collection);
    var id = req.params.id;

    Model.findOneAndUpdate({ "_id": id }, { "is_deleted": true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Record not found with id " + req.params.id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Record not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete record with id " + req.params.id
            });
        });
};

exports.executeQuery = (req, res) => {
    var Model = mongoose.model(req.params.collection);
    var where = req.body.where;
    var populate = req.body.populate;
    var fields = req.body.fields;
    var sort = req.body.sort;
    var limit = req.body.limit;

    var query = Model.find({});

    if (where) {
        query = Model.find(where);
    }
    if (populate) {
        query = query.populate(populate);
    }
    if (fields) {
        query = query.select(fields);
    }
    if (sort) {
        query = query.sort(sort);
    }
    if (limit) {
        query = query.skip(limit.skip).limit(limit.limit);
    }
    if (count === true) {
        query = query.count();
    }

    query.exec()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving."
            });
        });

}