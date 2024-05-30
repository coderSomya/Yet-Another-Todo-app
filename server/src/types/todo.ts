import mongoose from "mongoose";

export default interface iTodo extends mongoose.Document{
    title: String;
    completed: Boolean;
    tags: String[];
}