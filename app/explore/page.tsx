"use client"

import { useState } from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import {
  integrationCategories,
  turboIntegrations,
} from "@/data/turbo-integrations"
import { LuMenu } from "react-icons/lu"

import { menuDashboard } from "@/config/menu-dashboard"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import React, { useState, useCallback, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { 
  Lock,
  AtSign,
  Image as ImageIcon,
  Video,
  Download,
  Swords,
  Grid as GridIcon,
  List,
  MessageCircle,
  Share2,
  ThumbsUp,
  Wallet,
  Flag,
  Clock,
  Trophy
} from 'lucide-react';

// Components
import Notification from '../components/Notification';
import PostEngagement from '../components/PostEngagement';
import CommentSection from '../components/CommentSection';

// Styles
import styles from '../styles/Explore.module.css';

// Different challenge states
const challengePosts = {
  feed: [
    {
      id: 1,
      type: 'challenge',
      status: 'active',
      author: {
        username: "beiutyt",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=beiutyt",
        isVerified: true
      },
      target: {
        username: "bouy575",
        isVerified: false
      },
      prediction: "ETH will hit 100$ in 5 days",
      wager: {
        amount: 500,
        currency: "USDT"
      },
      endTime: "2024-01-20T15:00:00Z",
      timestamp: "2h ago"
    }
  ],
  
  active: [
    {
      id: 101,
      type: 'challenge',
      status: 'active',
      author: {
        username: "cryptoking",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cryptoking",
        isVerified: true
      },
      target: {
        username: "beiutyt",
        isVerified: true
      },
      prediction: "BTC will reach 50k before February",
      wager: {
        amount: 1000,
        currency: "USDT"
      }, 
      endTime: "2024-02-01T00:00:00Z",
      timestamp: "1d ago",
      participants: {
        yes: 156,
        no: 89
      }
    }
  ],
  
  awaiting: [
    {
      id: 201,
      type: 'challenge',
      status: 'awaiting',
      author: {
        username: "traderpro",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=traderpro",
        isVerified: false
      },
      target: {
        username: "beiutyt",
        isVerified: true
      },
      prediction: "SOL will flip BNB by market cap",
      wager: {
        amount: 300,
        currency: "USDT"
      },
      endTime: "2024-03-01T00:00:00Z",
      timestamp: "5h ago"
    }
  ],
  
  ended: [
    {
      id: 301,
      type: 'challenge',
      status: 'ended',
      author: {
        username: "whale_alert",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=whale_alert",
        isVerified: true
      },
      target: {
        username: "beiutyt",
        isVerified: true
      },
      prediction: "DOGE will hit $0.15 this week",
      wager: {
        amount: 200,
        currency: "USDT"
      },
      result: {
        winner: "whale_alert",
        finalValue: "$0.16"
      },
      timestamp: "ended 2d ago"
    }
  ]
};

// Add these helper functions for time handling
const getTimeRemaining = (endTime) => {
  const total = Date.parse(endTime) - Date.parse(new Date());
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);

  if (days > 0) return `${days}d ${hours}h left`;
  if (hours > 0) return `${hours}h ${minutes}m left`;
  return `${minutes}m left`;
};

const formatChallengeDuration = (duration) => {
  const now = new Date();
  const end = new Date(now);
  
  if (duration.includes('month')) {
    end.setMonth(end.getMonth() + parseInt(duration));
  } else if (duration.includes('week')) {
    end.setDate(end.getDate() + (parseInt(duration) * 7));
  } else if (duration.includes('day')) {
    end.setDate(end.getDate() + parseInt(duration));
  }
  
  return end.toISOString();
};

// Add helper function for username colors
const getUsernameColor = (username) => {
  const colors = [
    '#FF6B00', // orange
    '#4ADE80', // green
    '#8B5CF6', // purple
    '#3B82F6', // blue
    '#EC4899', // pink
    '#F59E0B', // amber
    '#10B981', // emerald
  ];
  const index = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[index % colors.length];
};

// Add this hook for live timer updates
const useCountdown =(endTime) => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(endTime));

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getTimeRemaining(endTime);
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return timeLeft;
};

// Enhanced timer display component
const TimerDisplay = ({ endTime }) => {
  const timeLeft = useCountdown(endTime);
  const [progress, setProgress] = useState(100);
  const [timerSound, setTimerSound] = useState(null);
  
  // Initialize audio on client side only
  useEffect(() => {
    setTimerSound(new Audio('/sounds/timer-beep.mp3'));
  }, []);
  
  useEffect(() => {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const percentage = (total / (1000 * 60 * 60 * 24)) * 100;
    setProgress(Math.max(0, Math.min(100, percentage)));

    // Play sound when less than 1 hour remains
    if (total <= 3600000 && total > 3595000 && timerSound) {
      timerSound.play().catch(err => console.log('Audio play failed:', err));
    }
  }, [timeLeft, timerSound]);

  return (
    <div className={styles.timerWrapper}>
      <div 
        className={styles.progressRing}
        style={{ 
          background: `conic-gradient(#ff6b00 ${progress}%, transparent ${progress}%)`
        }}
      >
        <Clock 
          className={`${styles.timerIcon} ${progress < 20 ? styles.urgent : ''}`} 
          size={14} 
        />
      </div>
      <span className={styles.timerText}>{timeLeft}</span>
    </div>
  );
};

const renderChallengeItem = (item) => {
  const authorColor = getUsernameColor(item.author.username);
  const targetColor = getUsernameColor(item.target.username);

  // Base item structure that's common to all states
  const baseItem = (
    <div className={styles.feedItem}>
      <div className={styles.leftSection}>
        <div className={styles.avatarGroup}>
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.author.username}`}
            alt="" 
            className={styles.groupAvatar} 
          />
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.target.username}`}
            alt="" 
            className={styles.groupAvatar} 
          />
        </div>
        
        <div className={styles.itemDetails}>
          <div className={styles.itemTitle}>
            {item.prediction}
            <span className={`${styles.variantTag} ${styles[item.status]}`}>
              {item.status}
            </span>
            {item.isHot && (
              <span className={`${styles.variantTag} ${styles.hot}`}>
                🔥 Hot
              </span>
            )}
          </div>
          
          <div className={styles.itemMeta}>
            {item.status === 'ended' ? (
              // Winner info for ended challenges
              <div className={styles.winnerInfo}>
                <Trophy size={14} className={styles.trophyIcon} />
                <span className={styles.username} style={{ color: item.result.winner === item.author.username ? authorColor : targetColor }}>
                  @{item.result.winner}
                </span>
                <span className={styles.wonLabel}>won</span>
                <span className={styles.winnings}>
                  {item.wager.amount * 2} {item.wager.currency}
                </span>
              </div>
            ) : (
              // Regular user info for active/awaiting challenges
              <div className={styles.usernameGroup}>
                <span className={styles.username} style={{ color: authorColor }}>
                  @{item.author.username}
                </span>
                <span className={styles.vsLabel}>vs</span>
                <span className={styles.username} style={{ color: targetColor }}>
                  @{item.target.username}
                </span>
              </div>
            )}
            <div className={styles.stockInfo}>
              <Clock size={14} />
              <span>{item.timestamp}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.priceSection}>
        <span className={styles.retailPrice}>
          {item.status === 'ended' && <Trophy size={14} className={styles.trophyIcon} />}
          {item.status === 'ended' ? `${item.wager.amount * 2} ${item.wager.currency}` : `${item.wager.amount} ${item.wager.currency}`}
        </span>
        <span className={styles.wholesalePrice}>
          {item.status === 'ended' ? `Initial: ${item.wager.amount} ${item.wager.currency}` : `Pool: ${item.wager.amount * 2} ${item.wager.currency}`}
        </span>
      </div>
    </div>
  );

  return baseItem;
};

// Add new post types to the feed
const feedPosts = {
  feed: [
    // Regular user post
    {
      id: 1,
      type: 'post',
      author: {
        username: "cryptowhale",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cryptowhale",
        isVerified: true
      },
      content: "Just loaded up on more $ETH! This dip is a gift 🎁",
      timestamp: "10m ago",
      engagement: {
        likes: 234,
        comments: 45,
        shares: 12
      }
    },
    // Challenge post
    {
      id: 2,
      type: 'challenge',
      status: 'active',
      isHot: true,
      author: {
        username: "traderpro",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=traderpro",
        isVerified: true
      },
      target: {
        username: "cryptoninja",
        isVerified: false
      },
      prediction: "ETH will flip BTC in 2024",
      wager: { amount: 5000, currency: "USDT" },
      endTime: "2024-12-31T23:59:59Z",
      timestamp: "15m ago"
    },
    // Regular user post
    {
      id: 3,
      type: 'post',
      author: {
        username: "defiexpert",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=defiexpert",
        isVerified: true
      },
      content: "New DEX just dropped! Testing out the liquidity pools. APY looking juicy 🔥",
      timestamp: "30m ago",
      engagement: {
        likes: 156,
        comments: 23,
        shares: 8
      }
    },
    // Add more mixed content...
  ],
  active: [ /* existing active challenges */ ],
  awaiting: [ /* existing awaiting challenges */ ],
  ended: [ /* existing ended challenges */ ]
};

export default function ExplorePage() {
  const { isConnected, address } = useAccount();
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const [activeTab, setActiveTab] = useState('feed');
  const [showUserSuggestions, setShowUserSuggestions] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [notification, setNotification] = useState(null);
  const [posts, setPosts] = useState(feedPosts);

  // Mock user data
  const mockUsers = [
    { username: 'vitalik', name: 'Vitalik Buterin', isVerified: true },
    { username: 'CHILLSNT', name: 'CryptoWhale', isVerified: true },
    { username: 'sol_sage', name: 'SolanaSage', isVerified: true },
  ];

  const isChallenge = (text) => {
    const commandPattern = /^(\/|\/pepe|\/pepebot|@pepe|@pepebot)/i;
    return commandPattern.test(text.trim());
  };

  const getButtonText = () => {
    if (isLoading) {
      return isChallenge(content) ? "Creating Challenge..." : "Posting...";
    }
    return isChallenge(content) ? "Challenge" : "Post event";
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);

    // Check for user suggestions after challenge command
    const isChallengeCommand = /^(\/|\/pepe|\/pepebot|@pepe|@pepebot)\s+challenge\s+@/i.test(newContent);
    if (isChallengeCommand) {
      const lastAtSymbolIndex = newContent.lastIndexOf('@');
      if (lastAtSymbolIndex !== -1) {
        const query = newContent.slice(lastAtSymbolIndex + 1).split(/[\s:]/, 1)[0];
        setUserQuery(query);
        setShowUserSuggestions(true);
      }
    } else {
      setShowUserSuggestions(false);
    }
  };

  const handleUserSelect = (username) => {
    const beforeAt = content.slice(0, content.lastIndexOf('@'));
    const challengeTemplate = `${beforeAt}@${username}:
Event: 
Wager: ETH`;
    setContent(challengeTemplate);
    setShowUserSuggestions(false);
  };

  const handleCreateChallenge = async () => {
    if (!isConnected) {
      setNotification({
        type: 'warning',
        message: 'Please connect your wallet to post'
      });
      return;
    }

    setIsLoading(true);
    try {
      const isChallengePrediction = isChallenge(content);
      
      const newPost = {
        id: Date.now(),
        type: isChallengePrediction ? 'challenge' : 'post',
        author: {
          username: address?.slice(0, 6) + '...' + address?.slice(-4),
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${address}`,
          isVerified: true,
          address: address
        },
        timestamp: "just now"
      };

      if (isChallengePrediction) {
        // Parse challenge content
        const challengeDetails = parseChallenge(content);
        Object.assign(newPost, {
          status: 'awaiting',
          target: {
            username: challengeDetails.target,
            isVerified: false
          },
          prediction: challengeDetails.event,
          wager: {
            amount: challengeDetails.amount,
            currency: challengeDetails.currency
          }
        });
      } else {
        // Regular post
        Object.assign(newPost, {
          content: content,
          engagement: {
            likes: 0,
            comments: 0,
            shares: 0
          }
        });
      }

      // Add to feed
      feedPosts.feed.unshift(newPost);
      
      // Show success notification
      setNotification({
        type: 'success',
        message: isChallengePrediction ? 'Challenge created successfully!' : 'Post shared successfully!'
      });

      // Clear input
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
      setNotification({
        type: 'error',
        message: 'Failed to create post. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add helper function to parse challenge content
  const parseChallenge = (content) => {
    // Basic parsing - you might want to make this more robust
    const lines = content.split('\n');
    return {
      target: lines[0].split('@')[2]?.split(':')[0] || '',
      event: lines.find(l => l.startsWith('Event:'))?.replace('Event:', '').trim() || '',
      amount: parseInt(lines.find(l => l.startsWith('Wager:'))?.split(' ')[1] || '0'),
      currency: lines.find(l => l.startsWith('Wager:'))?.split(' ')[2] || 'ETH'
    };
  };

  const handlePostLike = useCallback(async ({ postId, address, action }) => {
    if (!isConnected) {
      setNotification({
        type: 'warning',
        message: 'Please connect your wallet to like posts'
      });
      return;
    }

    try {
      setPosts(prevPosts => ({
        ...prevPosts,
        feed: prevPosts.feed.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              engagement: {
                ...post.engagement,
                likes: action === 'like' 
                  ? (post.engagement?.likes || 0) + 1 
                  : (post.engagement?.likes || 0) - 1
              }
            };
          }
          return post;
        })
      }));
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to update like. Please try again.'
      });
    }
  }, [isConnected, setNotification]);

  const handlePostShare = useCallback(async ({ postId, platform, address }) => {
    if (!isConnected) {
      setNotification({
        type: 'warning',
        message: 'Please connect your wallet to share posts'
      });
      return;
    }

    try {
      setPosts(prevPosts => ({
        ...prevPosts,
        feed: prevPosts.feed.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              engagement: {
                ...post.engagement,
                shares: (post.engagement?.shares || 0) + 1
              }
            };
          }
          return post;
        })
      }));
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to share post. Please try again.'
      });
    }
  }, [isConnected, setNotification]);

  const handleAddComment = async (postId, comment) => {
    if (!isConnected) {
      setNotification({
        type: 'warning',
        message: 'Please connect your wallet to comment'
      });
      return;
    }

    try {
      const newComment = {
        id: Date.now(),
        content: comment,
        author: {
          username: address.slice(0, 6) + '...' + address.slice(-4),
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${address}`,
          isVerified: false
        },
        timestamp: 'Just now'
      };

      setPosts(prevPosts => ({
        ...prevPosts,
        feed: prevPosts.feed.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [newComment, ...(post.comments || [])]
            };
          }
          return post;
        })
      }));

      setNotification({
        type: 'success',
        message: 'Comment added successfully'
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to add comment'
      });
    }
  };

  const renderPost = useCallback((post) => {
    const authorColor = getUsernameColor(post.author.username);
    
    return (
      <div className={styles.feedItem}>
        <div className={styles.postWrapper}>
          <div className={styles.avatarColumn}>
            <img 
              src={post.author.avatar}
              alt=""
              className={styles.avatar}
            />
          </div>
          
          <div className={styles.contentColumn}>
            <div className={styles.postHeader}>
              <span className={styles.author} style={{ color: authorColor }}>
                @{post.author.username}
              </span>
              <span className={styles.dot}>·</span>
              <span className={styles.timestamp}>{post.timestamp}</span>
            </div>
            
            <div className={styles.postContent}>
              {post.content}
            </div>
            
            <div className={styles.postActions}>
              <button className={styles.actionButton}>
                <MessageCircle size={18} className={styles.actionIcon} />
                <span className={styles.actionCount}>{post.comments?.length || 0}</span>
              </button>

              <button className={styles.actionButton} onClick={() => handlePostShare({ postId: post.id })}>
                <Share2 size={18} className={styles.actionIcon} />
                <span className={styles.actionCount}>{post.engagement?.shares || 0}</span>
              </button>

              <button 
                className={`${styles.actionButton} ${post.liked ? styles.liked : ''}`}
                onClick={() => handlePostLike({ postId: post.id, action: 'like' })}
              >
                <ThumbsUp size={18} className={styles.actionIcon} />
                <span className={styles.actionCount}>{post.engagement?.likes || 0}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }, [handlePostLike, handlePostShare]);

  return (
    <div className={styles.explorePage}>
      {/* Compose Section */}
      <div className={styles.composeSection}>
        <div className={styles.composeContent}>
          <img 
            src={isConnected 
              ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${address}`
              : `https://api.dicebear.com/7.x/avataaars/svg?seed=guest`}
            alt="Avatar"
            className={styles.avatar}
          />
          
          <div className={styles.inputWrapper}>
            <textarea
              placeholder={`
Use "/challenge @username" to create a new challenge`}
              value={content}
              onChange={handleContentChange}
              className={styles.challengeInput}
              rows={1}
            />

            {showUserSuggestions && (
              <div className={styles.userSuggestions}>
                {mockUsers
                  .filter(user => user.username.toLowerCase().includes(userQuery.toLowerCase()))
                  .map(user => (
                    <button
                      key={user.username}
                      className={styles.userSuggestion}
                      onClick={() => handleUserSelect(user.username)}
                    >
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                        alt={user.username}
                        className={styles.suggestionAvatar}
                      />
                      <div className={styles.userInfo}>
                        <span className={styles.userName}>{user.name}</span>
                        <span className={styles.userHandle}>@{user.username}</span>
                      </div>
                    </button>
                  ))}
              </div>
            )}

            <div className={styles.composeActions}>
              <div className={styles.actionButtons}>
                <button className={styles.actionButton}>
                  <AtSign size={20} />
                </button>
                <button className={styles.actionButton}>
                  <ImageIcon size={20} />
                </button>
              </div>
              <button 
                className={styles.challengeButton}
                onClick={handleCreateChallenge}
                disabled={!content.trim() || isLoading}
              >
                <Swords size={18} />
                <span>{getButtonText()}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed Section */}
      <div className={styles.feedSection}>
        <div className={styles.feedHeader}>
          <div className={styles.feedTabs}>
            <button 
              className={`${styles.feedTab} ${activeTab === 'feed' ? styles.active : ''}`}
              onClick={() => setActiveTab('feed')}
            >
              <Swords className={styles.tabIcon} />
              <span>Feed</span>
              <span className={styles.tabCount}>29</span>
            </button>
            <button 
              className={`${styles.feedTab} ${activeTab === 'active' ? styles.active : ''}`}
              onClick={() => setActiveTab('active')}
            >
              <Swords className={styles.tabIcon} />
              <span>Active</span>
              <span className={styles.tabCount}>10</span>
            </button>
            <button 
              className={`${styles.feedTab} ${activeTab === 'awaiting' ? styles.active : ''}`}
              onClick={() => setActiveTab('awaiting')}
            >
              <Wallet className={styles.tabIcon} />
              <span>Awaiting</span>
              <span className={styles.tabCount}>8</span>
            </button>
            <button 
              className={`${styles.feedTab} ${activeTab === 'ended' ? styles.active : ''}`}
              onClick={() => setActiveTab('ended')}
            >
              <Flag className={styles.tabIcon} />
              <span>Ended</span>
              <span className={styles.tabCount}>15</span>
            </button>
          </div>
          
          <div className={styles.viewToggle}>
            <button 
              className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <GridIcon size={20} />
            </button>
            <button 
              className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        <div className={`${styles.feedContent} ${styles[viewMode]}`}>
          {activeTab === 'feed' 
            ? posts.feed.map(item => (
                <div key={item.id}>
                  {renderPost(item)}
                </div>
              ))
            : challengePosts[activeTab]?.map(item => renderChallengeItem(item))
          }
        </div>
      </div>

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
} 