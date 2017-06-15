module.exports = (mongoose) => {
    const Schema = mongoose.Schema;
    const recordSchema = new Schema({
        title: String,
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        transcription: String,
        filePath: String,
        speechType: String,
        date: {type: Date, default: Date.now()}
    });

    return mongoose.model('Record', recordSchema);
}