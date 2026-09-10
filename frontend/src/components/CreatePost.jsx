import { useState } from "react";
import "./CreatePost.css";

function CreatePost({ onPostCreated }) {

    const [text, setText] = useState("");
    const [image, setImage] = useState("");

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const handlePost = async (e) => {
        e.preventDefault();

        if (!user) {
            alert("Please login first");
            return;
        }

        if (!text.trim() && !image.trim()) {
            alert("Please add text or image");
            return;
        }

        try {

            const response = await fetch(
                "https://social-post-c1bg.onrender.com/api/post",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId: user.userId,
                        username: user.username,
                        text,
                        image
                    })
                }
            );

            const data = await response.json();

            console.log(data);

            if (response.ok) {
                setText("");
                setImage("");

                onPostCreated();
            }

        } catch (error) {

            console.log(
                "Error creating post:",
                error
            );
        }
    };

    return (
        <div className="create-post">

            <div className="create-post-header">

                <div className="avatar">
                    {user?.username?.charAt(0).toUpperCase()}
                </div>

                <div className="user-info">

                    <h3 className="username">
                        {user?.username}
                    </h3>

                    <span className="handle">
                        @{user?.username?.toLowerCase()}
                    </span>

                </div>

                <button
                    type="button"
                    className="close-btn"
                    onClick={() =>
                        onPostCreated &&
                        onPostCreated()
                    }
                >
                    ✕
                </button>

            </div>


            <form onSubmit={handlePost}>

                <textarea
                    className="post-input"
                    placeholder="Tell others about yourself..."
                    value={text}
                    onChange={(e) =>
                        setText(e.target.value)
                    }
                />

                <input
                className="image-input"
                type="text"
                placeholder="Image URL (optional)"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                />

                <div className="create-post-footer">


                    <button
                        className="post-button"
                        type="submit"
                    >
                        Publish
                    </button>

                </div>

            </form>

        </div>
    );
}

export default CreatePost;