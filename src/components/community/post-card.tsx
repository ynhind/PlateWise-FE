import React, { useState, useRef, useEffect } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Send,
  X,
  AtSign,
} from 'lucide-react';
import { Post } from '../../types/community.type';

interface PostCardProps {
  post: Post;
  onLike: (postId: number) => void;
  onComment: (postId: number, commentText: string) => void;
}

const FRIENDS_LIST = [
  { id: 'minh_nguyen', name: 'Minh Nguyen' },
  { id: 'tuan_le', name: 'Tuan Le' },
  { id: 'lan_pham', name: 'Lan Pham' },
  { id: 'hoa_tran', name: 'Hoa Tran' },
  { id: 'nam_vo', name: 'Nam Vo' },
  { id: 'thu_nguyen', name: 'Thu Nguyen' },
  { id: 'hai_pham', name: 'Hai Pham' },
];

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onComment,
}) => {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');
  const [isLiked, setIsLiked] = useState<boolean>(post.isLiked || false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(post.likes);

  const [showTagMenu, setShowTagMenu] = useState<boolean>(false);
  const [tagSearch, setTagSearch] = useState<string>('');
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const commentInputRef = useRef<HTMLInputElement>(null);

  const handleLike = (): void => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    onLike(post.id);
  };

  const handleCommentChange = (value: string): void => {
    setCommentText(value);

    const lastAtIndex = value.lastIndexOf('@');
    if (lastAtIndex !== -1) {
      const textAfterAt = value.slice(lastAtIndex + 1);
      if (!textAfterAt.includes(' ')) {
        setTagSearch(textAfterAt.toLowerCase());
        setShowTagMenu(true);
        return;
      }
    }
    setShowTagMenu(false);
  };

  const handleTagFriend = (friend: (typeof FRIENDS_LIST)[0]): void => {
    const lastAtIndex = commentText.lastIndexOf('@');
    const beforeAt = commentText.slice(0, lastAtIndex);
    const newText = `${beforeAt}@${friend.name} `;

    setCommentText(newText);
    setShowTagMenu(false);
    commentInputRef.current?.focus();
  };

  const filteredFriends = FRIENDS_LIST.filter((friend) =>
    friend.name.toLowerCase().includes(tagSearch),
  );

  const handleComment = (): void => {
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
      setShowTagMenu(false);
    }
  };

  const toggleComments = (): void => {
    setShowComments(!showComments);
  };

  return (
    <div className="card mb-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-semibold shadow-md">
            {post.author.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{post.author.name}</h4>
            <p className="text-sm text-gray-500">{post.timestamp}</p>
          </div>
        </div>
        {post.author.badge && (
          <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold rounded-full shadow-sm">
            {post.author.badge}
          </span>
        )}
      </div>

      <p className="text-gray-800 mb-4 leading-relaxed whitespace-pre-wrap">
        {post.content}
      </p>

      {post.image && (
        <div className="mb-4 overflow-hidden rounded-xl">
          <img
            src={post.image}
            alt="Post"
            className="w-full object-cover max-h-96 hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="flex items-center justify-between py-3 border-t border-b border-gray-100 mb-3">
        <button
          onClick={handleLike}
          className="text-sm text-gray-600 hover:text-red-600 transition-colors font-medium"
        >
          {likeCount} likes
        </button>
        <div className="flex gap-4 text-sm text-gray-600">
          <button
            onClick={toggleComments}
            className="hover:text-green-600 transition-colors font-medium"
          >
            {post.comments.length} comments
          </button>
          <span>{post.shares} shares</span>
        </div>
      </div>

      <div className="flex items-center justify-around mb-3">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            isLiked
              ? 'text-red-600 bg-red-50'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Heart
            size={20}
            fill={isLiked ? 'currentColor' : 'none'}
            className={isLiked ? 'animate-pulse' : ''}
          />
          <span className="font-medium">Like</span>
        </button>
        <button
          onClick={toggleComments}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            showComments
              ? 'text-green-600 bg-green-50'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <MessageCircle size={20} />
          <span className="font-medium">Comment</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-all">
          <Share2 size={20} />
          <span className="font-medium">Share</span>
        </button>
        <button
          onClick={() => setIsSaved(!isSaved)}
          className={`p-2 rounded-lg transition-all ${
            isSaved
              ? 'text-green-600 bg-green-50'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Bookmark size={20} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      {showComments && (
        <div className="pt-3 border-t border-gray-100 space-y-3 animate-fadeIn">
          {post.comments.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 animate-slideIn">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-gray-700 text-sm font-semibold flex-shrink-0 shadow-sm">
                    {comment.author.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-2xl px-4 py-2 hover:bg-gray-100 transition-colors">
                      <p className="font-semibold text-sm text-gray-900">
                        {comment.author}
                      </p>
                      <p className="text-gray-700 text-sm">{comment.text}</p>
                    </div>
                    <div className="flex gap-3 mt-1 px-2">
                      <button className="text-xs text-gray-500 hover:text-green-600 font-medium transition-colors">
                        Like
                      </button>
                      <button className="text-xs text-gray-500 hover:text-green-600 font-medium transition-colors">
                        Reply
                      </button>
                      <span className="text-xs text-gray-400">
                        {comment.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-400 text-sm">
              No comments yet. Be the first!
            </div>
          )}

          <div className="flex gap-3 pt-2 relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 shadow-md">
              B
            </div>
            <div className="flex-1 relative">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    ref={commentInputRef}
                    type="text"
                    value={commentText}
                    onChange={(e) => handleCommentChange(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                    placeholder="Write a comment... (use @ to tag friends)"
                    className="w-full px-4 py-2 pr-10 bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                  />
                  <button
                    onClick={() => {
                      setCommentText(commentText + '@');
                      setShowTagMenu(true);
                      commentInputRef.current?.focus();
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
                    title="Tag friends"
                  >
                    <AtSign size={18} />
                  </button>
                </div>
                <button
                  onClick={handleComment}
                  disabled={!commentText.trim()}
                  className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                >
                  <Send size={18} />
                </button>
              </div>

              {showTagMenu && filteredFriends.length > 0 && (
                <div className="absolute bottom-full left-0 mb-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-10 animate-slideUp">
                  <div className="p-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-600 flex items-center gap-1">
                      <AtSign size={14} />
                      Tag friends
                    </span>
                    <button
                      onClick={() => setShowTagMenu(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {filteredFriends.map((friend) => (
                      <button
                        key={friend.id}
                        onClick={() => handleTagFriend(friend)}
                        className="w-full px-4 py-2 text-left hover:bg-green-50 transition-colors flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-300 to-emerald-500 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                          {friend.name.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {friend.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
