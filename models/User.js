module.exports = (mongoose) => {
    const Schema = mongoose.Schema;
    const userSchema = new Schema({
        name: String,
        email: String,
        emails: Object,
        googleId: String,
        facebookId: String,
        profileUrl: String,
        date: {type: Date, default: Date.now()},
        facebookData: Object,
        googleData: Object
    });

    return mongoose.model('User', userSchema);
}