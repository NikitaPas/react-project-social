import { FC, useState } from "react";
import { IPost } from "../../types/IPost"
import CommentItem from "./CommentItem";

type PostCommentsProps = {
    post: IPost;
}

const PostComments: FC<PostCommentsProps> = ({
    post,
}) => {

    const [showAll, setShowAll] = useState<boolean>(false);

    return (
        <div className="mt-4 space-y-3">
            {(showAll ? post.comments : post.comments?.slice(0, 3))?.map((comment, index) => (
                <CommentItem key={index} comment={comment}/>
            ))}

            {post.comments && post.comments.length > 3 && (
                <button className="text-xs font-medium text-gray-500 hover:text-indigo-400 transition-colors ml-1" onClick={() => setShowAll(!showAll)}>
                    {showAll ? 'Скрыть комментарии' : 'Показать все комментарии'} ({post.comments.length})
                </button>
            )}
        </div>
    )
}

export default PostComments;