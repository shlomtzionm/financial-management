import  { Document, Schema, model } from 'mongoose';

// Define the Category Interface
export interface ICategoryModel extends Document {
    name: string;
}

// Define the Category Schema
const CategorySchema = new Schema<ICategoryModel>({
    name: {
        type: String,
        required: [true, "missing name"],
        maxlength: [20, "name too long"],
        minlength: [1, "name too short"]
    }
}, {
    versionKey: false
});

// Create and export the Category Model
export const CategoryModel = model<ICategoryModel>("CategoryModel", CategorySchema, "Categories");
