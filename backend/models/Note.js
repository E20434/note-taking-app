import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(

    {

        title: { type: String, required: true, trim: true },
        content: { type: String, default: '' },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        collabarators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

    },
    { timestamps: true }



);

noteSchema.index({ title: 'text', content: 'text' });

export default mongoose.model('Note', noteSchema);