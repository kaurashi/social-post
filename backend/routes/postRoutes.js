const Post = require("../models/Post");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
    try {

        const { userId, username, text, image } = req.body;

        if (!text && !image) {
            return res.status(400).json({
                message: "Post must contain text or image"
            });
        }

        const post = new Post({
            userId,
            username,
            text,
            image
        });

        await post.save();

        res.status(201).json({
            message: "Post created successfully",
            post
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "server error"
        });
    }
});

router.get("/", async (req, res) => {
    try {

        const posts = await Post.find()
            .sort({ createdAt: -1 });

        res.status(200).json(posts);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "server error"
        });
    }
});

router.put("/:id/like", async (req, res) => {
    try {

        const { userId } = req.body;

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const alreadyLiked = post.likes.some(
            id => id.toString() === userId
        );

        if (alreadyLiked) {

            post.likes = post.likes.filter(
                id => id.toString() !== userId
            );

            await post.save();

            return res.json({
                message: "Post unliked",
                likes: post.likes.length
            });
        }

        post.likes.push(userId);

        await post.save();

        res.json({
            message: "Post liked",
            likes: post.likes.length
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "server error"
        });
    }
});

router.post("/:id/comment", async (req, res) => {
    try {

        const { userId, username, text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                message: "Comment cannot be empty"
            });
        }

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        post.comments.push({
            userId,
            username,
            text
        });

        await post.save();

        res.status(201).json({
            message: "Comment added successfully",
            comments: post.comments
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "server error"
        });
    }
});

module.exports = router;