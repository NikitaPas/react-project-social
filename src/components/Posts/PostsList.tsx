import { FC } from "react";
import PostItem from "./PostItem";
import { IPost } from "../../types/IPost";

type PostsListProps = {
    posts: IPost[];
}

const PostsList: FC<PostsListProps> = ({
    posts,
}) => {

    if (!posts || posts.length === 0) {
        return <p className="text-gray-500 text-center mt-10">Постов пока нет...</p>;
    }

    return (
        <div className="flex flex-col gap-4">
            {posts.map(post => (
                <PostItem
                    key={post.id}
                    post={post}
                />
            ))}
        </div>
    )
}

export default PostsList