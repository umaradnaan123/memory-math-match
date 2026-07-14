// Game storage data configurations

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  highestScore: number;
  bestTime: number; // in seconds
  averageAccuracy: number;
  fastestMatch: number; // in seconds
  currentStreak: number;
  longestStreak: number;
  perfectGames: number;
  coins: number;
  xp: number;
  stars: number;
  diamonds: number;
  unlockedLevel: number;
  unlockedThemes: string[];
  unlockedAvatars: string[];
  unlockedCardStyles: string[];
  unlockedBackgrounds: string[];
  accuracyByTopic: Record<string, { correct: number; total: number }>;
}

export interface Achievement {
  id: string;
  title: string;
  desc: string;
  badge: string; // Emoji
  target: number;
  current: number;
  unlocked: boolean;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  time: number;
  accuracy: number;
  date: string;
}

const DEFAULT_STATS: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  highestScore: 0,
  bestTime: 9999,
  averageAccuracy: 0,
  fastestMatch: 999,
  currentStreak: 0,
  longestStreak: 0,
  perfectGames: 0,
  coins: 50,
  xp: 0,
  stars: 0,
  diamonds: 5,
  unlockedLevel: 1,
  unlockedThemes: ['classic'],
  unlockedAvatars: ['avatar1'],
  unlockedCardStyles: ['neon'],
  unlockedBackgrounds: ['space'],
  accuracyByTopic: {},
};

export const ACHIEVEMENTS_LIST: Omit<Achievement, 'current' | 'unlocked'>[] = [
  { id: 'first_win', title: 'First Win', desc: 'Complete your first math match challenge!', badge: '🏆', target: 1 },
  { id: 'win_10', title: 'Math Squire', desc: 'Win 10 math challenges.', badge: '🛡️', target: 10 },
  { id: 'win_100', title: 'Math Wizard', desc: 'Win 100 math challenges.', badge: '🧙‍♂️', target: 100 },
  { id: 'perfect', title: 'Perfect Mind', desc: 'Complete a level with 100% accuracy.', badge: '🧠', target: 1 },
  { id: 'genius', title: 'Math Genius', desc: 'Complete an Expert level.', badge: '👑', target: 1 },
  { id: 'fast_thinker', title: 'Speed Demon', desc: 'Make a match in under 1.5 seconds.', badge: '⚡', target: 1 },
  { id: 'combo_king', title: 'Combo King', desc: 'Reach a 5x matching combo.', badge: '🔥', target: 5 },
  { id: 'streak_10', title: 'Unstoppable', desc: 'Maintain a 10-day streak.', badge: '📆', target: 10 },
];

export function getLocalStats(): GameStats {
  if (typeof window === 'undefined') return DEFAULT_STATS;
  const data = localStorage.getItem('mmm_stats');
  return data ? JSON.parse(data) : DEFAULT_STATS;
}

export function saveLocalStats(stats: GameStats) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('mmm_stats', JSON.stringify(stats));
}

export function getLocalAchievements(stats: GameStats): Achievement[] {
  return ACHIEVEMENTS_LIST.map((ach) => {
    let current = 0;
    switch (ach.id) {
      case 'first_win':
        current = stats.gamesWon >= 1 ? 1 : 0;
        break;
      case 'win_10':
        current = stats.gamesWon;
        break;
      case 'win_100':
        current = stats.gamesWon;
        break;
      case 'perfect':
        current = stats.perfectGames >= 1 ? 1 : 0;
        break;
      case 'genius':
        current = stats.highestScore > 1000 ? 1 : 0; // Simulated threshold or expert tag
        break;
      case 'fast_thinker':
        current = stats.fastestMatch < 1.5 ? 1 : 0;
        break;
      case 'combo_king':
        current = stats.longestStreak; // Use combo/streak mapping
        break;
      case 'streak_10':
        current = stats.longestStreak;
        break;
    }
    return {
      ...ach,
      current: Math.min(current, ach.target),
      unlocked: current >= ach.target,
    };
  });
}

export function getLeaderboards(): Record<'daily' | 'weekly' | 'allTime', LeaderboardEntry[]> {
  if (typeof window === 'undefined') return { daily: [], weekly: [], allTime: [] };
  const daily = localStorage.getItem('mmm_lb_daily');
  const weekly = localStorage.getItem('mmm_lb_weekly');
  const allTime = localStorage.getItem('mmm_lb_allTime');

  return {
    daily: daily ? JSON.parse(daily) : [],
    weekly: weekly ? JSON.parse(weekly) : [],
    allTime: allTime ? JSON.parse(allTime) : [],
  };
}

export function addLeaderboardEntry(entry: LeaderboardEntry) {
  if (typeof window === 'undefined') return;
  const lbs = getLeaderboards();

  const addAndLimit = (list: LeaderboardEntry[]) => {
    const updated = [...list, entry].sort((a, b) => b.score - a.score);
    return updated.slice(0, 10);
  };

  localStorage.setItem('mmm_lb_daily', JSON.stringify(addAndLimit(lbs.daily)));
  localStorage.setItem('mmm_lb_weekly', JSON.stringify(addAndLimit(lbs.weekly)));
  localStorage.setItem('mmm_lb_allTime', JSON.stringify(addAndLimit(lbs.allTime)));
}

export function updateTopicAccuracy(topic: string, isCorrect: boolean) {
  const stats = getLocalStats();
  if (!stats.accuracyByTopic) stats.accuracyByTopic = {};
  if (!stats.accuracyByTopic[topic]) {
    stats.accuracyByTopic[topic] = { correct: 0, total: 0 };
  }
  stats.accuracyByTopic[topic].total += 1;
  if (isCorrect) {
    stats.accuracyByTopic[topic].correct += 1;
  }
  saveLocalStats(stats);
}
