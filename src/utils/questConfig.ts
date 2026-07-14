import { Category, Difficulty } from './mathEngine';

export interface World {
  id: number;
  name: string;
  levelRange: [number, number];
  categories: Category[];
  color: string;
  theme: string;
}

export const WORLDS: World[] = [
  { id: 1, name: 'Number Adventure', levelRange: [1, 50], categories: ['addition'], color: 'from-green-500 to-emerald-600', theme: 'emerald' },
  { id: 2, name: 'Addition Kingdom', levelRange: [51, 100], categories: ['addition'], color: 'from-blue-500 to-indigo-600', theme: 'blue' },
  { id: 3, name: 'Subtraction Valley', levelRange: [101, 150], categories: ['subtraction'], color: 'from-sky-500 to-cyan-600', theme: 'cyan' },
  { id: 4, name: 'Multiplication Mountain', levelRange: [151, 200], categories: ['multiplication'], color: 'from-orange-500 to-amber-600', theme: 'amber' },
  { id: 5, name: 'Division Desert', levelRange: [201, 250], categories: ['division'], color: 'from-yellow-600 to-amber-700', theme: 'yellow' },
  { id: 6, name: 'Fraction Forest', levelRange: [251, 300], categories: ['fractions'], color: 'from-emerald-600 to-teal-700', theme: 'teal' },
  { id: 7, name: 'Decimal Ocean', levelRange: [301, 350], categories: ['decimals'], color: 'from-cyan-500 to-blue-600', theme: 'cyan' },
  { id: 8, name: 'Percentage Island', levelRange: [351, 400], categories: ['percentages'], color: 'from-red-500 to-orange-600', theme: 'red' },
  { id: 9, name: 'Ratio City', levelRange: [401, 450], categories: ['ratio'], color: 'from-purple-500 to-indigo-600', theme: 'purple' },
  { id: 10, name: 'Algebra Academy', levelRange: [451, 500], categories: ['algebra'], color: 'from-violet-500 to-fuchsia-600', theme: 'violet' },
  { id: 11, name: 'Geometry Garden', levelRange: [501, 550], categories: ['geometry'], color: 'from-pink-500 to-rose-600', theme: 'pink' },
  { id: 12, name: 'Trigonometry Temple', levelRange: [551, 600], categories: ['trigonometry'], color: 'from-red-600 to-rose-700', theme: 'red' },
  { id: 13, name: 'Statistics Station', levelRange: [601, 650], categories: ['statistics'], color: 'from-teal-500 to-emerald-600', theme: 'teal' },
  { id: 14, name: 'Probability Planet', levelRange: [651, 700], categories: ['probability'], color: 'from-blue-600 to-cyan-700', theme: 'blue' },
  { id: 15, name: 'Exponents Empire', levelRange: [701, 750], categories: ['square'], color: 'from-amber-500 to-orange-600', theme: 'amber' },
  { id: 16, name: 'Logic Labyrinth', levelRange: [751, 800], categories: ['patterns'], color: 'from-indigo-500 to-purple-600', theme: 'indigo' },
  { id: 17, name: 'Advanced Algebra', levelRange: [801, 850], categories: ['algebra'], color: 'from-purple-600 to-fuchsia-700', theme: 'purple' },
  { id: 18, name: 'Calculus Gateway', levelRange: [851, 900], categories: ['calculus'], color: 'from-teal-600 to-cyan-700', theme: 'teal' },
  { id: 19, name: 'Grand Math Challenge', levelRange: [901, 950], categories: ['mixed'], color: 'from-indigo-600 to-pink-600', theme: 'indigo' },
  { id: 20, name: 'Memory Master Arena', levelRange: [951, 1000], categories: ['mixed'], color: 'from-rose-600 to-red-800', theme: 'rose' },
];

export interface QuestLevel {
  levelNumber: number;
  worldId: number;
  difficulty: Difficulty;
  pairCount: number;
  timeLimit: number;
  starsEarned: number;
  highScore: number;
  isUnlocked: boolean;
  isChallenge: boolean;
  isBoss: boolean;
  isWorldFinal: boolean;
  isGrandChamp: boolean;
  badge?: string;
}

export function generateQuestMapData(unlockedLevel: number): QuestLevel[] {
  const levels: QuestLevel[] = [];

  for (let i = 1; i <= 1000; i++) {
    const world = WORLDS.find((w) => i >= w.levelRange[0] && i <= w.levelRange[1]) || WORLDS[0];

    // Progression scales difficulty
    let diff: Difficulty = 'beginner';
    if (i > 50) diff = 'easy';
    if (i > 250) diff = 'medium';
    if (i > 500) diff = 'hard';
    if (i > 800) diff = 'expert';

    let pairCount = 6 + Math.min(Math.floor(i / 100), 10); // scaling pairs
    if (i % 25 === 0) pairCount += 4; // Boss levels have larger boards

    const timeLimit = Math.max(300 - Math.floor(i / 5), 45); // scaling timer limit

    levels.push({
      levelNumber: i,
      worldId: world.id,
      difficulty: diff,
      pairCount,
      timeLimit,
      starsEarned: 0,
      highScore: 0,
      isUnlocked: i <= unlockedLevel,
      isChallenge: i % 10 === 0 && i % 50 !== 0 && i % 100 !== 0,
      isBoss: i % 25 === 0 && i % 50 !== 0 && i % 100 !== 0,
      isWorldFinal: i % 50 === 0 && i % 100 !== 0,
      isGrandChamp: i % 100 === 0,
      badge: i % 100 === 0 ? '👑' : i % 50 === 0 ? '🏆' : i % 25 === 0 ? '👹' : undefined,
    });
  }

  return levels;
}
