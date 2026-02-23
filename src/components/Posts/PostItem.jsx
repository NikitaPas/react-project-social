import { useContext } from "react";
import { PostContext } from "../../context/PostContext";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

const PostItem = (props) =>{
    const {
        post,
    } = props

    const {
      deletePost,
      toggleLike,
      } = useContext(PostContext)

    const {
      getUsernameById,
      user,
    } = useContext(UserContext)


    const isMyPost = post.userId === user?.id;
    const isLiked = post.likes?.includes(user?.id);
    const likesCount = post.likes?.length || 0;
    const userName = getUsernameById(post.userId)

    const formattedDate = new Date(post.createdAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });


    return (
        <div className="w-full mt-5 max-w-[100] bg-gray-900 border-gray-800 rounded-[20px] p-6 shadow-sm">
      {/* Шапка поста */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Аватар пользователя */}
          <div className="w-10 h-10 rounded-full bg-[#0003cc] flex items-center justify-center text-white font-bold text-lg">
            {userName.charAt(0).toUpperCase()}
          </div>
          {/* Логин */}
          <Link to={`/profile/${post.userId}`}><span className="font-bold text-[#ffffff] text-base">
            @{userName}
          </span> 
          </Link> 
          
        </div>
        {/* Дата */}
        <span className="text-gray-400 text-sm">
          {formattedDate}
        </span>
      </div>

      {/* Текст поста */}
      <div className="text-[#ffffff] text-base mb-6 leading-relaxed">
        {post.text}
      </div>

      {/* Футер поста */}
      <div className="flex gap-10 items-center pt-2">
         <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors hover: cursor-pointer">
              💬 Комментировать
            </button>
            <button 
                    onClick={() => toggleLike(post.id, user.id)}
                    className={`text-sm font-medium flex items-center gap-1.5 transition-all active:scale-125 ${
                        isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
                    }`}
                >
                    <span className="text-lg">{isLiked ? '❤️' : '🤍'}</span>
                    <span className={isLiked ? 'font-bold' : ''}>
                        {likesCount > 0 && likesCount} Лайк
                    </span>
                </button>
            {isMyPost && (
            <button onClick={() => deletePost(post.id)} className="text-sm font-medium text-gray-400 hover:text-red-500 transition-colors hover: cursor-pointer">
              Удалить
            </button>
          )}
      </div>
    </div>
    )
}

export default PostItem