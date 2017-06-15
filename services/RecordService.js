module.exports = class RecordService {
    constructor(Record) {
        this.Record = Record;
    }

    save(data) {
        return this.Record.create(data);
    }

    getByUserId(userId) {
        return this.Record
            .find({user: userId})
            .populate('user')
            .exec();
    }

    prepareFilePath(file) {
    }
}
