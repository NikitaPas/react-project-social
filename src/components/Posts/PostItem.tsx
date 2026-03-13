import { FC, useContext, useState } from "react";
import { PostContext } from "../../context/PostContext";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { IPost } from "../../types/IPost";
import PostComments from "./PostComments";

type PostItemProps = {
  post: IPost;
}

const PostItem: FC<PostItemProps> = ({
  post,
}) => {

  const {
    deletePost,
    toggleLike,
    addComment,
  } = useContext(PostContext)

  const {
    getUsernameById,
    user,
  } = useContext(UserContext)

  const [isCommentInputVisible, setIsCommentInputVisible] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");

  const isMyPost: boolean = post.userId === user?.id;
  const isLiked: boolean = user?.id ? post.likes.includes(user?.id) : false;
  const likesCount: number = post.likes.length || 0;
  const userName: string = getUsernameById(post.userId)

  const formattedDate = new Date(post.createdAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleAddComment = () => {
    if (commentText.trim().length === 0 || !user?.id) return;
    addComment(user.id, post.id, commentText)

  }


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
      <div className="pt-2 border-t border-gray-800">
        <div className="flex gap-10 items-center mb-4">
          {user && (<button
            className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
            onClick={() => setIsCommentInputVisible(!isCommentInputVisible)}
          >
            💬 {isCommentInputVisible ? 'Отмена' : 'Комментировать'}
          </button>)}

          <button
            onClick={() => user && toggleLike(post.id, user.id)}
            className={`text-sm font-medium flex items-center gap-1.5 transition-all active:scale-125 ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
          >
            <span className="text-lg">{isLiked ? '❤️' : '🤍'}</span>
            <span className={isLiked ? 'font-bold' : ''}>
              {likesCount > 0 && likesCount} Лайк
            </span>
          </button>

          {isMyPost && (
            <button onClick={() => deletePost(post.id)} className="text-sm font-medium text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
              Удалить
            </button>
          )}
        </div>
        {isCommentInputVisible && (
          <div className="mt-4 flex gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <input
              autoFocus
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Напишите комментарий..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <button
              onClick={() => {
                handleAddComment();
                setCommentText("");
                setIsCommentInputVisible(false);
              }}
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 active:scale-95 transition-all"
            >
              Отправить
            </button>
          </div>
        )}
        <PostComments post={post} />
      </div>

    </div>
  )
}

export default PostItem