import { PuzzleData } from '../types';

export function generateSudoku(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): PuzzleData {
  // Base solved 9x9 board with valid shift pattern
  const baseShift = [0, 3, 6, 1, 4, 7, 2, 5, 8];
  const solution: number[][] = [];
  
  // Random base row
  const baseNums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
  
  for (let r = 0; r < 9; r++) {
    const row: number[] = [];
    const shift = baseShift[r];
    for (let c = 0; c < 9; c++) {
      row.push(baseNums[(c + shift) % 9]);
    }
    solution.push(row);
  }

  // Determine clue counts based on difficulty
  const blanks = difficulty === 'easy' ? 32 : difficulty === 'medium' ? 44 : 52;
  
  const puzzleGrid: number[][] = solution.map(row => [...row]);
  let removed = 0;
  const positions: [number, number][] = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      positions.push([r, c]);
    }
  }
  positions.sort(() => Math.random() - 0.5);

  for (const [r, c] of positions) {
    if (removed >= blanks) break;
    puzzleGrid[r][c] = 0; // 0 represents blank cell
    removed++;
  }

  return {
    type: 'sudoku',
    difficulty,
    gridSize: 9,
    grid: puzzleGrid,
    solutionGrid: solution,
  };
}

export function generateWordSearch(
  wordList: string[] = ['AMAZON', 'AUTHOR', 'NOVEL', 'PUZZLE', 'COLORING', 'JOURNAL', 'CREATIVE', 'DESIGN'],
  size: number = 14,
  difficulty: 'easy' | 'medium' | 'hard' = 'medium'
): PuzzleData {
  const grid: string[][] = Array(size).fill(null).map(() => Array(size).fill(''));
  const solutionGrid: string[][] = Array(size).fill(null).map(() => Array(size).fill(' '));
  const placedWords: string[] = [];
  const wordPositions: { word: string; start: [number, number]; end: [number, number] }[] = [];

  const directions: [number, number][] = [
    [0, 1],   // horizontal right
    [1, 0],   // vertical down
    [1, 1],   // diagonal down-right
    [0, -1],  // horizontal left (for medium/hard)
    [-1, 0],  // vertical up (for medium/hard)
  ];
  const allowedDirs = difficulty === 'easy' ? directions.slice(0, 2) : directions;

  for (const rawWord of wordList) {
    const word = rawWord.toUpperCase().replace(/[^A-Z]/g, '');
    if (word.length > size || word.length < 3) continue;

    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 150) {
      attempts++;
      const [dr, dc] = allowedDirs[Math.floor(Math.random() * allowedDirs.length)];
      const startR = Math.floor(Math.random() * size);
      const startC = Math.floor(Math.random() * size);
      const endR = startR + dr * (word.length - 1);
      const endC = startC + dc * (word.length - 1);

      if (endR < 0 || endR >= size || endC < 0 || endC >= size) continue;

      let canPlace = true;
      for (let i = 0; i < word.length; i++) {
        const r = startR + dr * i;
        const c = startC + dc * i;
        if (grid[r][c] !== '' && grid[r][c] !== word[i]) {
          canPlace = false;
          break;
        }
      }

      if (canPlace) {
        for (let i = 0; i < word.length; i++) {
          const r = startR + dr * i;
          const c = startC + dc * i;
          grid[r][c] = word[i];
          solutionGrid[r][c] = word[i];
        }
        placedWords.push(word);
        wordPositions.push({ word, start: [startR, startC], end: [endR, endC] });
        placed = true;
      }
    }
  }

  // Fill random letters
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === '') {
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return {
    type: 'wordsearch',
    difficulty,
    gridSize: size,
    grid,
    words: placedWords,
    wordPositions,
    solutionGrid,
  };
}

export function generateMaze(width: number = 17, height: number = 17, difficulty: 'easy' | 'medium' | 'hard' = 'medium'): PuzzleData {
  // Odd numbers for grid size with walls
  const w = width % 2 === 0 ? width + 1 : width;
  const h = height % 2 === 0 ? height + 1 : height;
  
  // 1 = wall, 0 = path
  const maze: number[][] = Array(h).fill(null).map(() => Array(w).fill(1));
  
  // DFS maze generation
  const visited: boolean[][] = Array(h).fill(null).map(() => Array(w).fill(false));
  const stack: [number, number][] = [];
  
  const startX = 1;
  const startY = 1;
  maze[startY][startX] = 0;
  visited[startY][startX] = true;
  stack.push([startX, startY]);

  while (stack.length > 0) {
    const [cx, cy] = stack[stack.length - 1];
    const neighbors: [number, number, number, number][] = [];

    const dirs = [
      [0, -2, 0, -1], // Up
      [2, 0, 1, 0],   // Right
      [0, 2, 0, 1],   // Down
      [-2, 0, -1, 0], // Left
    ];

    for (const [dx, dy, wx, wy] of dirs) {
      const nx = cx + dx;
      const ny = cy + dy;
      if (nx > 0 && nx < w - 1 && ny > 0 && ny < h - 1 && !visited[ny][nx]) {
        neighbors.push([nx, ny, cx + wx, cy + wy]);
      }
    }

    if (neighbors.length > 0) {
      const [nx, ny, wx, wy] = neighbors[Math.floor(Math.random() * neighbors.length)];
      maze[wy][wx] = 0;
      maze[ny][nx] = 0;
      visited[ny][nx] = true;
      stack.push([nx, ny]);
    } else {
      stack.pop();
    }
  }

  // Open Start and End
  maze[0][1] = 0; // Start at top
  maze[h - 1][w - 2] = 0; // Exit at bottom

  // Generate clean vector SVG
  const cellSize = 20;
  const svgWidth = w * cellSize;
  const svgHeight = h * cellSize;
  let paths = '';

  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      if (maze[r][c] === 1) {
        paths += `<rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize}" height="${cellSize}" fill="#1e293b" />`;
      }
    }
  }

  const mazeSvg = `
    <svg viewBox="0 0 ${svgWidth} ${svgHeight}" class="w-full h-auto max-w-[420px] mx-auto bg-white border-2 border-slate-900 shadow-sm rounded-lg overflow-hidden" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      ${paths}
      <!-- Start and Exit Markers -->
      <circle cx="${1.5 * cellSize}" cy="${0.5 * cellSize}" r="${cellSize * 0.35}" fill="#10b981" />
      <text x="${1.5 * cellSize}" y="${0.5 * cellSize + 4}" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">IN</text>
      <circle cx="${(w - 1.5) * cellSize}" cy="${(h - 0.5) * cellSize}" r="${cellSize * 0.35}" fill="#ef4444" />
      <text x="${(w - 1.5) * cellSize}" y="${(h - 0.5) * cellSize + 4}" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">OUT</text>
    </svg>
  `;

  return {
    type: 'maze',
    difficulty,
    gridSize: w,
    grid: maze,
    mazeSvg,
  };
}

export function generateCrossword(): PuzzleData {
  const clues = {
    across: [
      { num: 1, clue: 'Amazon on-demand publishing portal (abbrev.)', answer: 'KDP' },
      { num: 3, clue: 'Black and white book for artistic mindfulness', answer: 'COLORING' },
      { num: 6, clue: 'The edge of the book where pages are bound', answer: 'SPINE' },
      { num: 7, clue: 'Daily log for thoughts, dreams, and reflections', answer: 'JOURNAL' },
    ],
    down: [
      { num: 1, clue: 'Search terms used by Amazon shoppers', answer: 'KEYWORDS' },
      { num: 2, clue: 'Targeted market segment or specialty topic', answer: 'NICHE' },
      { num: 4, clue: 'Mathematical 9x9 number grid game', answer: 'SUDOKU' },
      { num: 5, clue: 'Earnings per book copy sold', answer: 'ROYALTY' },
    ],
  };

  return {
    type: 'crossword',
    difficulty: 'medium',
    clues,
  };
}
