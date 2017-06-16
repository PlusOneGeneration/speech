const crypto = require('crypto');

module.exports = class RecordService {
    constructor(Record) {
        this.Record = Record;
    }

    save(data, user, file) {
        if(file){
            file.hash = crypto.createHash('sha1').update(JSON.stringify(file)).digest('hex');
        }

        let record = {
            title: data.title.substring(0, 20) + '...',
            speechType:  data.speechType,
            user: user.userId,
            transcription: data.transcription || '',
            file: file || null
        };
        
        return this.Record.create(record);
    }

    getByUserId(userId, options = {limit: 10, skip: 0}) {
        return this.Record
            .find({user: userId})
            .populate('user')
            .skip(parseInt(options.skip))
            .limit(parseInt(options.limit))
            .sort({date: -1})
            .exec();
    }

    getTotalByUserId(userId) {
        return this.Record
            .find({user: userId})
            .count();
    }

    getRecordFileByFileId(fileId){
        return this.Record
            .findOne({'file.hash': fileId})
            .exec();
    }
}
