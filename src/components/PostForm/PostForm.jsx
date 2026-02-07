import { useState, useContext } from "react";
import { PostContext } from "../../context/PostContext";
import Button from "../Button/Button"


const PostForm = () => {
    const [text, setText] = useState('');
    const { createPost } = useContext(PostContext);

    const clearPostText = text.trim();
    const isPostTextIsEmpty = clearPostText.length === 0;

    const onSubmit = (e) => {
        e.preventDefault();

        if (!isPostTextIsEmpty) {
            createPost(clearPostText)
            setText('')
        }
    };
    return (
        <form onSubmit={onSubmit} className="bg-gray-900 p-5 mt-4 rounded-xl border border-gray-800">
            <textarea
                className="w-full bg-transparent min-h-[50px]  text-white placeholder-gray-500 outline-none p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Что у вас нового?"
                value={text}
                onInput={(e) => setText(e.target.value)}
            />
            <div className="flex justify-end mt-2 border-t border-gray-800 pt-2">
                <Button isDisabled={isPostTextIsEmpty}>Опубликовать</Button>
            </div>
        </form>
    )
}

export default PostForm