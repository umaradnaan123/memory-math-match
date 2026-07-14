export interface MathCard {
  id: string;
  type: 'expression' | 'value';
  content: string; // E.g. "8 × 6" or "48"
  matchValue: string; // The common string that matches both pairs (e.g. "48")
  color: string;
  icon: string;
}

export type Category =
  | 'addition' | 'subtraction' | 'multiplication' | 'division'
  | 'fractions' | 'decimals' | 'percentages' | 'ratio' | 'average'
  | 'algebra' | 'geometry' | 'trigonometry' | 'probability' | 'statistics'
  | 'calculus' | 'roman' | 'patterns' | 'prime' | 'factors' | 'multiples'
  | 'square' | 'cube' | 'mixed';

export type Difficulty = 'beginner' | 'easy' | 'medium' | 'hard' | 'expert';

// Procedural generation helper values
const RANDOM_ICONS = ['➕', '➖', '✖️', '➗', 'π', '√', '％', '📐', '📊', '✏️', '🧠', '⭕'];
const CARD_COLORS = [
  'from-blue-500/20 to-indigo-500/20 border-blue-400/30 text-blue-200',
  'from-purple-500/20 to-pink-500/20 border-purple-400/30 text-purple-200',
  'from-emerald-500/20 to-teal-500/20 border-emerald-400/30 text-emerald-200',
  'from-orange-500/20 to-amber-500/20 border-orange-400/30 text-orange-200',
  'from-cyan-500/20 to-blue-500/20 border-cyan-400/30 text-cyan-200',
];

// Helper to generate non-duplicate equations
export function generateMathPairs(
  difficulty: Difficulty,
  enabledCategories: Category[],
  pairCount: number
): MathCard[] {
  const pairs: { expr: string; val: string }[] = [];
  const usedValues = new Set<string>();

  // Ensure we fall back to 'addition' or 'mixed' if categories are empty
  const activeCategories = enabledCategories.length > 0 ? enabledCategories : ['mixed' as Category];

  let loopCount = 0;
  while (pairs.length < pairCount && loopCount < 1000) {
    loopCount++;
    const cat = activeCategories[Math.floor(Math.random() * activeCategories.length)];
    const generated = generateQuestion(cat, difficulty);

    if (generated && !usedValues.has(generated.val) && generated.val !== generated.expr) {
      pairs.push(generated);
      usedValues.add(generated.val);
    }
  }

  // Double-check if we couldn't generate enough pairs, add fallbacks
  if (pairs.length < pairCount) {
    let fallbackNum = 1;
    while (pairs.length < pairCount) {
      pairs.push({ expr: `${fallbackNum} + ${fallbackNum}`, val: `${fallbackNum * 2}` });
      fallbackNum++;
    }
  }

  // Construct Cards
  const cards: MathCard[] = [];
  pairs.forEach((p, idx) => {
    const cardColor = CARD_COLORS[idx % CARD_COLORS.length];
    const cardIcon = RANDOM_ICONS[idx % RANDOM_ICONS.length];

    // Card 1: The math expression card
    cards.push({
      id: `expr-${idx}-${Math.random()}`,
      type: 'expression',
      content: p.expr,
      matchValue: p.val,
      color: cardColor,
      icon: cardIcon,
    });

    // Card 2: The actual answer card
    cards.push({
      id: `val-${idx}-${Math.random()}`,
      type: 'value',
      content: p.val,
      matchValue: p.val,
      color: cardColor,
      icon: cardIcon,
    });
  });

  // Shuffle Cards using Fisher-Yates algorithm
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}

// Generate single question based on category and difficulty
function generateQuestion(cat: Category, diff: Difficulty): { expr: string; val: string } | null {
  const maxNum = diff === 'beginner' ? 10 : diff === 'easy' ? 20 : diff === 'medium' ? 50 : diff === 'hard' ? 100 : 200;

  switch (cat) {
    case 'addition': {
      const a = Math.floor(Math.random() * (maxNum - 1)) + 1;
      const b = Math.floor(Math.random() * (maxNum - 1)) + 1;
      return { expr: `${a} + ${b}`, val: `${a + b}` };
    }
    case 'subtraction': {
      const a = Math.floor(Math.random() * (maxNum - 1)) + 2;
      const b = Math.floor(Math.random() * (a - 1)) + 1; // Keep positive
      return { expr: `${a} - ${b}`, val: `${a - b}` };
    }
    case 'multiplication': {
      const scale = diff === 'beginner' ? 5 : diff === 'easy' ? 10 : diff === 'medium' ? 12 : 20;
      const a = Math.floor(Math.random() * scale) + 1;
      const b = Math.floor(Math.random() * scale) + 1;
      return { expr: `${a} × ${b}`, val: `${a * b}` };
    }
    case 'division': {
      const scale = diff === 'beginner' ? 5 : diff === 'easy' ? 10 : diff === 'medium' ? 12 : 20;
      const b = Math.floor(Math.random() * scale) + 1;
      const val = Math.floor(Math.random() * scale) + 1;
      const a = b * val; // Whole numbers
      return { expr: `${a} ÷ ${b}`, val: `${val}` };
    }
    case 'fractions': {
      const denom = Math.floor(Math.random() * 8) + 3; // 3 to 10
      const num = Math.floor(Math.random() * (denom - 1)) + 1;
      const factor = Math.floor(Math.random() * 3) + 2; // 2 to 4
      return { expr: `${num * factor}/${denom * factor} Simplify`, val: `${num}/${denom}` };
    }
    case 'decimals': {
      const a = (Math.floor(Math.random() * 90) + 10) / 10;
      const b = (Math.floor(Math.random() * 90) + 10) / 10;
      return { expr: `${a.toFixed(1)} + ${b.toFixed(1)}`, val: `${(a + b).toFixed(1)}` };
    }
    case 'percentages': {
      const percents = [10, 20, 25, 50, 75];
      const p = percents[Math.floor(Math.random() * percents.length)];
      const base = (Math.floor(Math.random() * 10) + 1) * 10; // E.g. 10 to 100
      return { expr: `${p}% of ${base}`, val: `${(p * base) / 100}` };
    }
    case 'ratio': {
      const x = Math.floor(Math.random() * 5) + 1;
      const y = Math.floor(Math.random() * 5) + 1;
      const factor = Math.floor(Math.random() * 5) + 2;
      return { expr: `${x * factor}:${y * factor} Simplify`, val: `${x}:${y}` };
    }
    case 'average': {
      const count = 3;
      const nums = Array.from({ length: count }, () => Math.floor(Math.random() * 15) + 1);
      const sum = nums.reduce((s, n) => s + n, 0);
      const avg = sum / count;
      if (Number.isInteger(avg)) {
        return { expr: `Avg of ${nums.join(', ')}`, val: `${avg}` };
      }
      return { expr: `Avg of 4, 8, 12`, val: `8` };
    }
    case 'algebra': {
      const x = Math.floor(Math.random() * 10) + 2;
      const offset = Math.floor(Math.random() * 8) + 1;
      const ops = ['+', '-'];
      const op = ops[Math.floor(Math.random() * ops.length)];
      if (op === '+') {
        return { expr: `x + ${offset} = ${x + offset}`, val: `x = ${x}` };
      } else {
        return { expr: `x - ${offset} = ${x - offset}`, val: `x = ${x}` };
      }
    }
    case 'geometry': {
      const types = ['rect', 'square', 'circle_radius'];
      const type = types[Math.floor(Math.random() * types.length)];
      if (type === 'rect') {
        const w = Math.floor(Math.random() * 8) + 2;
        const h = Math.floor(Math.random() * 8) + 2;
        return { expr: `Area of ${w}x${h} rectangle`, val: `${w * h}` };
      } else if (type === 'square') {
        const s = Math.floor(Math.random() * 10) + 2;
        return { expr: `Perimeter of square side ${s}`, val: `${s * 4}` };
      } else {
        return { expr: `Diameter of circle radius 7`, val: `14` };
      }
    }
    case 'trigonometry': {
      const trig = [
        { expr: 'sin(30°)', val: '1/2' },
        { expr: 'cos(60°)', val: '1/2' },
        { expr: 'tan(45°)', val: '1' },
        { expr: 'sin(90°)', val: '1' },
        { expr: 'cos(0°)', val: '1' },
      ];
      return trig[Math.floor(Math.random() * trig.length)];
    }
    case 'probability': {
      return { expr: 'Prob of rolling 4 on a 6-sided die', val: '1/6' };
    }
    case 'statistics': {
      return { expr: 'Median of 1, 3, 3, 6, 7, 8, 9', val: '6' };
    }
    case 'calculus': {
      const problems = [
        { expr: 'd/dx of x^2', val: '2x' },
        { expr: 'd/dx of 5x', val: '5' },
        { expr: 'd/dx of sin(x)', val: 'cos(x)' },
        { expr: 'Integral of 2x dx', val: 'x^2' },
      ];
      return problems[Math.floor(Math.random() * problems.length)];
    }
    case 'roman': {
      const roman = [
        { expr: 'XIV', val: '14' },
        { expr: 'XXIX', val: '29' },
        { expr: 'XL', val: '40' },
        { expr: 'LXXXVIII', val: '88' },
        { expr: 'XCVI', val: '96' },
      ];
      return roman[Math.floor(Math.random() * roman.length)];
    }
    case 'patterns': {
      const start = Math.floor(Math.random() * 5) + 1;
      const diffVal = Math.floor(Math.random() * 4) + 2;
      const sequence = [start, start + diffVal, start + diffVal * 2, start + diffVal * 3];
      return { expr: `${sequence.join(', ')}, ?`, val: `${start + diffVal * 4}` };
    }
    case 'prime': {
      const primes = ['2', '3', '5', '7', '11', '13', '17', '19', '23', '29'];
      const val = primes[Math.floor(Math.random() * primes.length)];
      return { expr: `Next prime after ${Number(val) - 1}`, val };
    }
    case 'factors': {
      return { expr: 'Greatest common factor of 12 & 18', val: '6' };
    }
    case 'multiples': {
      return { expr: 'Least common multiple of 4 & 6', val: '12' };
    }
    case 'square': {
      const n = Math.floor(Math.random() * 10) + 4; // 4 to 13
      const mode = Math.random() > 0.5;
      if (mode) {
        return { expr: `√${n * n}`, val: `${n}` };
      }
      return { expr: `${n}²`, val: `${n * n}` };
    }
    case 'cube': {
      const n = Math.floor(Math.random() * 5) + 2; // 2 to 6
      return { expr: `${n}³`, val: `${n * n * n}` };
    }
    case 'mixed':
    default: {
      // Pick a random category recursion
      const categories: Category[] = ['addition', 'subtraction', 'multiplication', 'division', 'square'];
      const randomCat = categories[Math.floor(Math.random() * categories.length)];
      return generateQuestion(randomCat, diff);
    }
  }
}
