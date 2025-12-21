import React, { useRef, useState, useEffect } from 'react';
import { Image, Smile, X } from 'lucide-react';
import { User, NewPostData } from '../../types/community.type';
import { EmojiPicker } from './emoji-picker';

interface CreatePostCardProps {
  onCreatePost: (data: NewPostData) => void;
  currentUser: User;
}

export const CreatePostCard: React.FC<CreatePostCardProps> = ({
  onCreatePost,
  currentUser,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [postContent, setPostContent] = useState<string>('');
  const [postImage, setPostImage] = useState<string>('');
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file!');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must not exceed 5MB!');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPostImage(base64String);
    };
    reader.onerror = () => {
      alert('Error reading file!');
    };
    reader.readAsDataURL(file);

    e.target.value = '';
  };

  const handleClearImage = () => {
    setPostImage('');
  };

  const handleEmojiSelect = (emoji: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText =
        postContent.slice(0, start) + emoji + postContent.slice(end);
      setPostContent(newText);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
        textarea.focus();
      }, 0);
    } else {
      setPostContent(postContent + emoji);
    }
  };

  const handleSubmit = (): void => {
    if (!postContent.trim()) return;

    onCreatePost({
      content: postContent,
      image: postImage || undefined,
    });

    setPostContent('');
    handleClearImage();
    setIsExpanded(false);
    setShowEmojiPicker(false);
  };

  const handleCancel = () => {
    setIsExpanded(false);
    setPostContent('');
    handleClearImage();
    setShowEmojiPicker(false);
  };

  return (
    <div className="card mb-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-semibold flex-shrink-0 shadow-md">
          {currentUser.name.charAt(0)}
        </div>

        <div className="flex-1">
          {!isExpanded ? (
            <button
              onClick={() => setIsExpanded(true)}
              className="w-full text-left px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full text-gray-500 hover:from-gray-100 hover:to-gray-200 transition-all shadow-sm"
            >
              Sharing is caring! What&apos;s on your mind?
            </button>
          ) : (
            <div className="space-y-3">
              <textarea
                ref={textareaRef}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Bạn đang nghĩ gì?"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all"
                rows={4}
                autoFocus
              />

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              {postImage && (
                <div className="relative group">
                  <img
                    src={postImage}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-xl" />
                  <button
                    onClick={handleClearImage}
                    className="absolute top-2 right-2 p-1.5 bg-gray-900 bg-opacity-70 rounded-full text-white hover:bg-opacity-90 transition-all shadow-lg"
                    type="button"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex gap-2 relative">
                  <button
                    type="button"
                    onClick={handlePickImage}
                    className="p-2.5 hover:bg-green-50 rounded-xl transition-colors group"
                    title="Chọn ảnh"
                  >
                    <Image
                      size={22}
                      className="text-green-600 group-hover:scale-110 transition-transform"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-2.5 hover:bg-yellow-50 rounded-xl transition-colors group relative"
                    title="Chọn emoji"
                  >
                    <Smile
                      size={22}
                      className="text-yellow-500 group-hover:scale-110 transition-transform"
                    />
                  </button>
                  <div className="absolute top-full left-0 mt-1">
                    {showEmojiPicker && (
                      <EmojiPicker
                        onSelectEmoji={handleEmojiSelect}
                        onClose={() => setShowEmojiPicker(false)}
                      />
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    className="px-5 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all font-medium"
                    type="button"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSubmit}
                    disabled={!postContent.trim()}
                    className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-md hover:shadow-lg"
                    type="button"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
