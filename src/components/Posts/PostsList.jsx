import PostItem from "./PostItem";


const PostsList = (props) =>{

    const {
        posts,
        user,
    } = props

    if (!posts || posts.length === 0) {
        return <p className="text-gray-500 text-center mt-10">Постов пока нет...</p>;
    }

    return(
        <div className="flex flex-col gap-4">
            {posts.map(post => (
                <PostItem 
                    key={post.id} 
                    post={post} 
                    user={user} 
                />
            ))}
        </div>
    )
}

export default PostsList