import React from 'react';
import { TrendingUp, Users } from 'lucide-react';
import { TrendingTopic } from '../../types/community.type';

interface SidebarProps {
  trending: TrendingTopic[];
}

export const Sidebar: React.FC<SidebarProps> = ({ trending }) => {
  const suggestedGroups: string[] = [
    'Healthy Eating VN',
    'Fitness Lovers',
    'Meal Prep Tips',
  ];

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={20} className="text-green-600" />
          <h3 className="font-bold text-gray-900">Trends</h3>
        </div>
        <div className="space-y-3">
          {trending.map((topic, index) => (
            <div
              key={index}
              className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">
                    #{topic.tag}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {topic.posts} posts
                  </p>
                </div>
                <span className="text-xl">{topic.icon}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Users size={20} className="text-green-600" />
          <h3 className="font-bold text-gray-900">Suggested Groups</h3>
        </div>
        <div className="space-y-3">
          {suggestedGroups.map((group, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary"></div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{group}</p>
                  <p className="text-xs text-gray-500">1.2k members</p>
                </div>
              </div>
              <button className="btn-primary py-1 px-3 text-sm">Join</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
