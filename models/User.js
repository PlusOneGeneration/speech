module.exports = (mongoose) => {
    const Schema = mongoose.Schema;
    const userSchema = new Schema({
        name: String,
        email: String,
        googleId: String,
        date: {type: Date, default: Date.now()}
    });

    return mongoose.model('User', userSchema);
}