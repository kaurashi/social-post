import { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import "./Feed.css";

function Feed() {

    const [posts, setPosts] = useState([]);
    const [commentText, setCommentText] = useState({});
    const [showComment, setShowComment] = useState({});

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const getPosts = async () => {
        try {
            const response = await fetch(
                "https://social-post-c1bg.onrender.com/api/post"
            );

            const data = await response.json();

            setPosts(data);

        } catch (error) {
            console.log("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    const handleLike = async (postId) => {

        if (!user) {
            alert("Please login first");
            return;
        }

        try {
            const response = await fetch(
                `https://social-post-c1bg.onrender.com/api/post/${postId}/like`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId: user.userId
                    })
                }
            );

            if (response.ok) {
                getPosts();
            }

        } catch (error) {
            console.log("Error liking post:", error);
        }
    };

    const handleComment = async (postId) => {

        if (!user) {
            alert("Please login first");
            return;
        }

        const text = commentText[postId];

        if (!text || !text.trim()) {
            return;
        }

        try {
            const response = await fetch(
                `https://social-post-c1bg.onrender.com/api/post/${postId}/comment`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId: user.userId,
                        username: user.username,
                        text
                    })
                }
            );

            if (response.ok) {

                setCommentText({
                    ...commentText,
                    [postId]: ""
                });

                setShowComment({
                    ...showComment,
                    [postId]: false
                });

                getPosts();
            }

        } catch (error) {
            console.log("Error adding comment:", error);
        }
    };

    const toggleComment = (postId) => {

        setShowComment({
            ...showComment,
            [postId]: !showComment[postId]
        });
    };

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
    };


    return (
        <div className="feed-container">

            <div className="feed-header">

                <h1 className="feed-title">
                    Social Feed
                </h1>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

            <CreatePost
                onPostCreated={getPosts}
            />

            <div className="posts-container">

                {posts.map((post) => (

                    <div
                        className="post-card"
                        key={post._id}
                    >

                        <div className="post-header">

                            <div className="post-avatar">
                                {post.username
                                    ?.charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div className="post-header-info">

                                <h3 className="post-username">
                                    {post.username}
                                </h3>

                                <span className="post-meta">
                                    @{post.username?.toLowerCase()} ·{" "}
                                    {new Date(
                                        post.createdAt || Date.now()
                                    ).toLocaleDateString()}
                                </span>

                            </div>

                        </div>

                        {post.text && (

                            <p className="post-text">
                                {post.text}
                            </p>

                        )}

                        {post.image && (

                            <div className="post-image-wrapper">

                                <img
                                    className="post-image"
                                    src={post.image}
                                    alt="Post"
                                />

                            </div>

                        )}

                        <div className="post-info">

                            <button
                                onClick={() =>
                                    handleLike(post._id)
                                }
                                className="action-btn"
                            >
                                <span>❤️</span>

                                Like{" "}

                                {post.likes.length > 0 &&
                                    `(${post.likes.length}` +
                                    ")"}
                            </button>

                            <button
                                onClick={() =>
                                    toggleComment(post._id)
                                }
                                className="action-btn"
                            >
                                <span>💬</span>

                                Comment{" "}

                                {post.comments.length > 0 &&
                                    `(${post.comments.length})`}
                            </button>

                        </div>

                        {showComment[post._id] && (

                            <div className="comment-section">

                                <input
                                    type="text"
                                    placeholder="Write a comment..."
                                    value={
                                        commentText[post._id] || ""
                                    }
                                    onChange={(e) =>
                                        setCommentText({
                                            ...commentText,
                                            [post._id]:
                                                e.target.value
                                        })
                                    }
                                />

                                <button
                                    onClick={() =>
                                        handleComment(post._id)
                                    }
                                >
                                    Comment
                                </button>

                            </div>

                        )}

                        <div className="comments-list">

                            {post.comments.map(
                                (comment, index) => (

                                    <div
                                        className="comment"
                                        key={index}
                                    >

                                        <strong>
                                            {comment.username}
                                        </strong>

                                        <span>
                                            {comment.text}
                                        </span>

                                    </div>

                                )
                            )}

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Feed;