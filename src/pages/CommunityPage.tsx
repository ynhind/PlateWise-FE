import React, { useState, useEffect } from 'react';
import { Search, Award } from 'lucide-react';
import { CreatePostCard } from '../components/community/create-post';
import { PostCard } from '../components/community/post-card';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  Post,
  User,
  TrendingTopic,
  NewPostData,
} from '../types/community.type';

type FilterType = 'all' | 'trending' | 'recent';

interface FilterOption {
  id: FilterType;
  label: string;
  icon: string;
}

const CommunityPage: React.FC = () => {
  const initialPosts: Post[] = [
    {
      id: 1,
      author: { name: 'Minh Nguyen', id: 'minh_nguyen', badge: 'Pro Member' },
      content:
        'Hôm nay mình đã thử món salad cá hồi mới, cực kỳ ngon và bổ dưỡng! Ai muốn công thức không? 🥗💪',
      image:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
      timestamp: '2 giờ trước',
      likes: 234,
      comments: [
        {
          id: 1,
          author: 'Lan Pham',
          text: 'Trông ngon quá! Share công thức với mình nhé!',
          time: '1 giờ trước',
        },
      ],
      shares: 12,
      isLiked: false,
    },
    {
      id: 2,
      author: { name: 'Tuan Le', id: 'tuan_le', badge: 'Expert' },
      content:
        'Chia sẻ với mọi người kế hoạch ăn uống 7 ngày của mình. Đã giảm được 3kg trong tháng vừa rồi! 🎯',
      timestamp: '5 giờ trước',
      likes: 567,
      comments: [
        {
          id: 1,
          author: 'Hoa Tran',
          text: 'Chúc mừng bạn! Quyết tâm quá!',
          time: '3 giờ trước',
        },
        {
          id: 2,
          author: 'Nam Vo',
          text: 'Mình cũng đang cần kế hoạch như vậy',
          time: '2 giờ trước',
        },
      ],
      shares: 45,
      isLiked: false,
    },
  ];

  const [posts, setPosts] = useLocalStorage<Post[]>(
    'community_posts',
    initialPosts,
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('recent');

  const currentUser: User = { name: 'Bạn', id: 'current_user' };

  const trending: TrendingTopic[] = [
    { tag: 'HealthyEating', posts: '1.2k', icon: '🥗' },
    { tag: 'FitnessGoals', posts: '856', icon: '💪' },
    { tag: 'MealPrep', posts: '645', icon: '🍱' },
    { tag: 'WeightLoss', posts: '523', icon: '⚖️' },
  ];

  const filterOptions: FilterOption[] = [
    { id: 'all', label: 'All', icon: '📱' },
    { id: 'trending', label: 'Trending', icon: '🔥' },
    { id: 'recent', label: 'Recent', icon: '⏰' },
  ];

  useEffect(() => {
    let filtered = [...posts];

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (post) =>
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.author.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (activeFilter === 'trending') {
      filtered = filtered.sort((a, b) => b.likes - a.likes);
    } else if (activeFilter === 'recent') {
      filtered = filtered.sort((a, b) => b.id - a.id);
    } else {
      filtered = filtered.sort((a, b) => b.id - a.id);
    }

    setFilteredPosts(filtered);
  }, [searchQuery, posts, activeFilter]);

  const handleCreatePost = (postData: NewPostData): void => {
    const newPost: Post = {
      id: Date.now(),
      author: { name: currentUser.name, id: currentUser.id, badge: '' },
      content: postData.content,
      image: postData.image,
      timestamp: 'Just now',
      likes: 0,
      comments: [],
      shares: 0,
      isLiked: false,
    };
    setPosts([newPost, ...posts]);
  };

  const handleLike = (postId: number): void => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      }),
    );
  };

  const handleComment = (postId: number, commentText: string): void => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: Date.now(),
                author: currentUser.name,
                text: commentText,
                time: 'Just now',
              },
            ],
          };
        }
        return post;
      }),
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gradient"></h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Searching in Community..."
                  className="pl-10 pr-4 py-2 w-80 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="card">
              <h3 className="font-bold text-gray-900 mb-4">Filter</h3>
              <div className="space-y-2">
                {filterOptions.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeFilter === filter.id
                        ? 'bg-gradient-primary text-white shadow-glow'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className="text-xl">{filter.icon}</span>
                    <span className="font-medium">{filter.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="card bg-gradient-primary text-white">
              <div className="flex items-center gap-3 mb-3">
                <Award size={24} />
                <h3 className="font-bold">Your Achievements</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Posts</span>
                  <span className="font-bold">
                    {posts.filter((p) => p.author.id === currentUser.id).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Likes</span>
                  <span className="font-bold">
                    {posts
                      .filter((p) => p.author.id === currentUser.id)
                      .reduce((sum, p) => sum + p.likes, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Followers</span>
                  <span className="font-bold">567</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <CreatePostCard
              onCreatePost={handleCreatePost}
              currentUser={currentUser}
            />

            {filteredPosts.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-gray-500">No posts found</p>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onComment={handleComment}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
