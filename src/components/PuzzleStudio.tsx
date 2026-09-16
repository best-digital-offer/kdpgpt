import React, { useState } from 'react';
import { 
  Puzzle, 
  Grid, 
  Eye, 
  RefreshCw, 
  FileDown, 
  CheckCircle, 
  Settings, 
  Sliders, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { generateSudoku, generateWordSearch, generateMaze, generateCrossword } from '../lib/puzzleEngine';
import { PuzzleData } from '../types';

export const PuzzleStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wordsearch' | 'sudoku' | 'maze' | 'crossword'>('wordsearch');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [showSolution, setShowSolution] = useState(false);
  
  // Word Search state
  const [wordListInput, setWordListInput] = useState('AMAZON, KINDLE, NOVEL, PUZZLE, AUTHOR, ROYALTIES, DESIGN, BESTSELLER');
  const [wordSearchData, setWordSearchData] = useState<PuzzleData>(() => 
    generateWordSearch(wordListInput.split(',').map(s => s.trim()), 14, 'medium')
  );

  // Sudoku state
  const [sudokuData, setSudokuData] = useState<PuzzleData>(() => generateSudoku('medium'));

  // Maze state
  const [mazeData, setMazeData] = useState<PuzzleData>(() => generateMaze(17, 17, 'medium'));

  // Crossword state
  const [crosswordData, setCrosswordData] = useState<PuzzleData>(() => generateCrossword());

  const handleRegenerateWordSearch = () => {
    const list = wordListInput.split(',').map(s => s.trim()).filter(Boolean);
    setWordSearchData(generateWordSearch(list.length ? list : undefined, 14, difficulty));
  };

  const handleRegenerateSudoku = () => {
    setSudokuData(generateSudoku(difficulty));
  };

  const handleRegenerateMaze = () => {
    setMazeData(generateMaze(17, 17, difficulty));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Puzzle className="w-4 h-4" />
            <span>KDP Puzzle & Activity Engine</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">
            Puzzle Generator Studio
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Algorithmic generator for Word Searches, 9x9 Sudokus, Mazes, and Crosswords with instant answer keys.
          </p>
        </div>

        {/* Puzzle Type Selector */}
        <div className="flex items-center p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('wordsearch')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              activeTab === 'wordsearch' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Word Search
          </button>
          <button
            onClick={() => setActiveTab('sudoku')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              activeTab === 'sudoku' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Sudoku 9x9
          </button>
          <button
            onClick={() => setActiveTab('maze')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              activeTab === 'maze' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Labyrinth Maze
          </button>
          <button
            onClick={() => setActiveTab('crossword')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              activeTab === 'crossword' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Crossword
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Controls Column */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-indigo-500" />
            <span>Puzzle Configuration</span>
          </h3>

          {/* Difficulty setting */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Difficulty Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['easy', 'medium', 'hard'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setDifficulty(lvl)}
                  className={`py-2 rounded-xl text-xs font-bold capitalize border transition ${
                    difficulty === lvl
                      ? 'bg-indigo-600 text-white border-transparent'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Word search specific words input */}
          {activeTab === 'wordsearch' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Words to Hide (Comma Separated)
              </label>
              <textarea
                rows={4}
                value={wordListInput}
                onChange={(e) => setWordListInput(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Supports horizontal, vertical, and diagonal word embeddings.
              </p>
            </div>
          )}

          {/* Answer Key Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Show Solution Key</span>
            </div>
            <input
              type="checkbox"
              checked={showSolution}
              onChange={(e) => setShowSolution(e.target.checked)}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                if (activeTab === 'wordsearch') handleRegenerateWordSearch();
                if (activeTab === 'sudoku') handleRegenerateSudoku();
                if (activeTab === 'maze') handleRegenerateMaze();
              }}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerate New Puzzle</span>
            </button>
          </div>
        </div>

        {/* Puzzle Canvas Preview */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center min-h-[460px]">
          
          {/* WORD SEARCH PREVIEW */}
          {activeTab === 'wordsearch' && (
            <div className="w-full max-w-lg space-y-6">
              <div className="text-center">
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">Thematic Word Search</h3>
                <p className="text-xs text-slate-500 mt-0.5">Find all hidden words. Circle letters as you discover them.</p>
              </div>

              {/* Grid */}
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner flex flex-col items-center">
                <div 
                  className="grid gap-1 font-mono-code font-bold text-xs select-none"
                  style={{ gridTemplateColumns: `repeat(${wordSearchData.gridSize || 14}, minmax(0, 1fr))` }}
                >
                  {((showSolution ? wordSearchData.solutionGrid : wordSearchData.grid) as string[][])?.map((row, r) =>
                    row.map((cell, c) => (
                      <div
                        key={`${r}-${c}`}
                        className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded text-[11px] sm:text-xs transition ${
                          showSolution && cell !== ' '
                            ? 'bg-emerald-500 text-white font-black'
                            : 'text-slate-800 dark:text-slate-200 hover:bg-indigo-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {cell}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Word bank */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 text-center">Word Bank</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {wordSearchData.words?.map((w, i) => (
                    <span key={i} className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600">
                      [ ] {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUDOKU PREVIEW */}
          {activeTab === 'sudoku' && (
            <div className="w-full max-w-md space-y-6">
              <div className="text-center">
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">9x9 Classic Sudoku</h3>
                <p className="text-xs text-slate-500 mt-0.5">Difficulty: <span className="font-bold capitalize text-indigo-600">{sudokuData.difficulty}</span></p>
              </div>

              <div className="bg-slate-900 p-2 rounded-2xl shadow-xl flex justify-center">
                <div className="grid grid-cols-9 bg-slate-900 border-2 border-slate-900">
                  {((showSolution ? sudokuData.solutionGrid : sudokuData.grid) as number[][])?.map((row, r) =>
                    row.map((val, c) => {
                      const borderBottom = (r + 1) % 3 === 0 && r !== 8 ? 'border-b-2 border-b-slate-900' : 'border-b border-b-slate-300';
                      const borderRight = (c + 1) % 3 === 0 && c !== 8 ? 'border-r-2 border-r-slate-900' : 'border-r border-r-slate-300';
                      return (
                        <div
                          key={`${r}-${c}`}
                          className={`w-8 h-8 sm:w-10 sm:h-10 bg-white flex items-center justify-center font-bold text-sm sm:text-base font-mono ${borderBottom} ${borderRight} ${
                            val === 0 ? 'text-transparent' : showSolution ? 'text-emerald-700' : 'text-slate-900'
                          }`}
                        >
                          {val === 0 ? '' : val}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}

          {/* MAZE PREVIEW */}
          {activeTab === 'maze' && (
            <div className="w-full max-w-md space-y-4 text-center">
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">Algorithmic Maze</h3>
              <p className="text-xs text-slate-500">Navigate from the green IN circle to the red OUT exit.</p>
              <div 
                className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 flex justify-center"
                dangerouslySetInnerHTML={{ __html: mazeData.mazeSvg || '' }}
              />
            </div>
          )}

          {/* CROSSWORD PREVIEW */}
          {activeTab === 'crossword' && (
            <div className="w-full max-w-lg space-y-6">
              <div className="text-center">
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">Mini Publishing Crossword</h3>
                <p className="text-xs text-slate-500">Test your KDP knowledge with clues below.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
                  <h4 className="font-bold text-indigo-600 uppercase tracking-wider">Across</h4>
                  {crosswordData.clues?.across.map(clue => (
                    <div key={clue.num} className="text-slate-700 dark:text-slate-300">
                      <b>{clue.num}.</b> {clue.clue} {showSolution && <span className="text-emerald-600 font-mono">({clue.answer})</span>}
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
                  <h4 className="font-bold text-indigo-600 uppercase tracking-wider">Down</h4>
                  {crosswordData.clues?.down.map(clue => (
                    <div key={clue.num} className="text-slate-700 dark:text-slate-300">
                      <b>{clue.num}.</b> {clue.clue} {showSolution && <span className="text-emerald-600 font-mono">({clue.answer})</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
