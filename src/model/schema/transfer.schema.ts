import { Schema } from 'mongoose';
import { TransferDocument } from '../../utils/types.utils';

const transferSchema = new Schema<TransferDocument>({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['success', 'failed'],
        default: 'success'
    }
}, {
    versionKey: false,
    timestamps: true
});

export default transferSchema;
