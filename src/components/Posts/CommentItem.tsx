import { FC, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Comment } from "../../types/IPost";

type CommentItemProps = {
    comment: Comment;
}

const CommentItem: FC<CommentItemProps> = ({ comment }) => {

    const { getUsernameById } = useContext(UserContext)

    return (
        <div className="flex gap-3 items-start bg-gray-800/40 p-3 rounded-xl border border-gray-800">
            <div className="w-7 h-7 rounded-full bg-indigo-900 flex-shrink-0 flex items-center justify-center text-[10px] text-white font-bold">
                {getUsernameById(comment.userId).charAt(0).toUpperCase()}
            </div>

            <div className="flex flex-col">
                <span className="text-xs font-bold text-indigo-400">
                    @{getUsernameById(comment.userId)}
                </span>
                <p className="text-sm text-gray-200 leading-snug">
                    {comment.text}
                </p>
            </div>
        </div>
    )
}

export default CommentItem