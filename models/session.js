import mongoose from 'mongoose';

const sessionSchema = mongoose.Schema({
        session: String,
        session_id: String,
        expire: { type: Date, required: true, default: Date.now, expires:"59d"},
    });

const Session = mongoose.model('Session', sessionSchema);

export default Session;

