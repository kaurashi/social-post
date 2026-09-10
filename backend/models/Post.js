const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },

        username:{
            type:String,
            required:true
        },

        text:{
            type:String
        },

        image:{
            type:String
        },

        likes:[{
            ref:"User",
            type:mongoose.Schema.Types.ObjectId
        }],

        comments:[
            {
                userId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"User",
                    required:true
                },

                username:{
                    type:String,
                    required:true
                },

                text:{
                    type:String,
                    required:true
                },

                createdAt:{
                    type:Date,
                    default:Date.now
                }
            }
        ]
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model("Post", postSchema)