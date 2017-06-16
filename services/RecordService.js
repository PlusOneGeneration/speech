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

    getByUserId(userId) {
        return this.Record
            .find({user: userId})
            .populate('user')
            .sort({date: -1})
            .exec();
    }

    prepareFilePath(file) {
    }

    getRecordFileByFileId(fileId){
        return this.Record
            .findOne({'file.hash': fileId})
            .exec();
    }
}
