import { jsPDF } from 'jspdf';
import { BookProject } from '../types';
import { TRIM_DIMENSIONS } from './kdpCalculator';

export async function exportKdpPdf(book: BookProject, options: { includeCropMarks?: boolean } = {}) {
  const trim = TRIM_DIMENSIONS[book.trimSize] || { width: 8.5, height: 11 };
  
  // Points: 72 points per inch
  const pageWidthPt = trim.width * 72;
  const pageHeightPt = trim.height * 72;
  
  const doc = new jsPDF({
    orientation: trim.width > trim.height ? 'landscape' : 'portrait',
    unit: 'pt',
    format: [pageWidthPt, pageHeightPt],
  });

  const margin = 36; // 0.5 inch margin
  const contentWidth = pageWidthPt - (margin * 2);

  // Helper to add footer page number
  const addPageNumber = (pageNum: number) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text(`${pageNum}`, pageWidthPt / 2, pageHeightPt - 24, { align: 'center' });
  };

  // 1. Title Page (Page 1)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(20, 20, 20);
  
  // Center title vertically in upper half
  const titleY = pageHeightPt * 0.35;
  const splitTitle = doc.splitTextToSize(book.title, contentWidth - 40);
  doc.text(splitTitle, pageWidthPt / 2, titleY, { align: 'center' });

  if (book.subtitle) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(70, 70, 70);
    const splitSubtitle = doc.splitTextToSize(book.subtitle, contentWidth - 60);
    doc.text(splitSubtitle, pageWidthPt / 2, titleY + (splitTitle.length * 30) + 10, { align: 'center' });
  }

  // Author
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(90, 90, 90);
  doc.text(`By ${book.authorName || 'Independent Author'}`, pageWidthPt / 2, pageHeightPt * 0.75, { align: 'center' });

  // 2. Copyright Page (Page 2)
  doc.addPage([pageWidthPt, pageHeightPt]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(60, 60, 60);

  const copyrightText = [
    `${book.title}`,
    `Copyright © ${new Date().getFullYear()} by ${book.authorName || 'Publisher'}. All rights reserved.`,
    '',
    'No part of this publication may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without prior written permission of the publisher, except in the case of brief quotations embodied in critical reviews.',
    '',
    'Published independently via Kindle Direct Publishing (KDP).',
    'Printed in the United States of America.',
    `Edition: First Edition (${new Date().getFullYear()})`,
    'Disclaimer: This book is designed solely for entertainment, relaxation, and educational enjoyment. The author and publisher assume no responsibility for errors or omissions.',
  ];

  let cY = pageHeightPt * 0.65;
  for (const line of copyrightText) {
    const wrapped = doc.splitTextToSize(line, contentWidth);
    doc.text(wrapped, margin, cY);
    cY += (wrapped.length * 12) + 2;
  }

  // 3. Interior Pages
  let curPageNum = 3;
  for (const page of book.pages) {
    doc.addPage([pageWidthPt, pageHeightPt]);
    
    // Page Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(25, 30, 36);
    doc.text(page.title || `Page ${curPageNum}`, margin, margin + 18);

    doc.setDrawColor(220, 225, 230);
    doc.setLineWidth(1);
    doc.line(margin, margin + 26, pageWidthPt - margin, margin + 26);

    // Render based on page type
    if (page.type === 'wordsearch' && page.puzzleData) {
      renderWordSearchPdf(doc, page.puzzleData, margin, margin + 45, contentWidth, pageHeightPt - 80);
    } else if (page.type === 'sudoku' && page.puzzleData) {
      renderSudokuPdf(doc, page.puzzleData, margin, margin + 50, contentWidth, pageHeightPt - 90);
    } else if (page.type === 'coloring') {
      renderColoringPlaceholderPdf(doc, page, margin, margin + 45, contentWidth, pageHeightPt - 90);
    } else if (page.type === 'journal_prompt' || page.type === 'planner_daily') {
      renderJournalLinesPdf(doc, page, margin, margin + 45, contentWidth, pageHeightPt - 90);
    } else if (page.type === 'devotional') {
      renderDevotionalPdf(doc, page, margin, margin + 45, contentWidth, pageHeightPt - 90);
    } else {
      // General text or activity
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(40, 40, 40);
      const splitContent = doc.splitTextToSize(page.content || 'Enjoy this activity page.', contentWidth);
      doc.text(splitContent, margin, margin + 50);
    }

    addPageNumber(curPageNum);
    curPageNum++;
  }

  // Save the PDF
  const filename = `${book.title.replace(/[^a-zA-Z0-9]/g, '_')}_KDP_${book.trimSize}.pdf`;
  doc.save(filename);
  return filename;
}

function renderWordSearchPdf(
  doc: jsPDF,
  puzzle: any,
  startX: number,
  startY: number,
  availWidth: number,
  availHeight: number
) {
  const grid = puzzle.grid as string[][];
  if (!grid || !grid.length) return;

  const size = grid.length;
  const maxGridWidth = Math.min(availWidth - 40, 360);
  const cellSize = maxGridWidth / size;
  const gridOffsetX = startX + (availWidth - maxGridWidth) / 2;
  const gridOffsetY = startY + 10;

  doc.setFont('courier', 'bold');
  doc.setFontSize(Math.max(9, Math.min(14, cellSize * 0.7)));
  doc.setTextColor(20, 20, 20);

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const letter = grid[r][c];
      const cx = gridOffsetX + c * cellSize + cellSize / 2;
      const cy = gridOffsetY + r * cellSize + cellSize * 0.72;
      doc.text(letter, cx, cy, { align: 'center' });
    }
  }

  // Word Bank below grid
  const words = puzzle.words || [];
  const bankY = gridOffsetY + size * cellSize + 24;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(40, 50, 60);
  doc.text('WORD BANK TO FIND:', startX, bankY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(50, 50, 50);

  const wordsPerRow = 4;
  const colWidth = availWidth / wordsPerRow;
  for (let i = 0; i < words.length; i++) {
    const row = Math.floor(i / wordsPerRow);
    const col = i % wordsPerRow;
    const wx = startX + col * colWidth;
    const wy = bankY + 18 + row * 16;
    doc.text(`[ ] ${words[i]}`, wx, wy);
  }
}

function renderSudokuPdf(
  doc: jsPDF,
  puzzle: any,
  startX: number,
  startY: number,
  availWidth: number,
  availHeight: number
) {
  const grid = puzzle.grid as number[][];
  if (!grid || !grid.length) return;

  const boardSize = Math.min(availWidth - 40, 340);
  const cellSize = boardSize / 9;
  const boardX = startX + (availWidth - boardSize) / 2;
  const boardY = startY + 15;

  // Grid lines
  for (let i = 0; i <= 9; i++) {
    const isMajor = i % 3 === 0;
    doc.setLineWidth(isMajor ? 2.5 : 0.8);
    doc.setDrawColor(isMajor ? 20 : 150);

    // Horizontal
    doc.line(boardX, boardY + i * cellSize, boardX + boardSize, boardY + i * cellSize);
    // Vertical
    doc.line(boardX + i * cellSize, boardY, boardX + i * cellSize, boardY + boardSize);
  }

  // Numbers
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(cellSize * 0.6);
  doc.setTextColor(15, 23, 42);

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = grid[r][c];
      if (val !== 0) {
        const cx = boardX + c * cellSize + cellSize / 2;
        const cy = boardY + r * cellSize + cellSize * 0.72;
        doc.text(`${val}`, cx, cy, { align: 'center' });
      }
    }
  }

  // Instructions
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(`Difficulty: ${puzzle.difficulty.toUpperCase()} • Fill numbers 1 through 9 with no duplicates per row, column, or 3x3 block.`, startX + availWidth / 2, boardY + boardSize + 28, { align: 'center' });
}

function renderColoringPlaceholderPdf(
  doc: jsPDF,
  page: any,
  startX: number,
  startY: number,
  availWidth: number,
  availHeight: number
) {
  // Border box for coloring
  const boxHeight = availHeight - 40;
  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(2);
  doc.roundedRect(startX, startY, availWidth, boxHeight, 10, 10);

  // Decorative inner frame
  doc.setDrawColor(180, 185, 195);
  doc.setLineWidth(0.8);
  doc.roundedRect(startX + 8, startY + 8, availWidth - 16, boxHeight - 16, 6, 6);

  // Prompt / Title banner inside
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(30, 40, 50);
  doc.text(page.title, startX + availWidth / 2, startY + 36, { align: 'center' });

  // Center vector illustration description / mindfulness text
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(100, 110, 120);
  doc.text('High-resolution printable coloring canvas ready for colored pencils, markers, or ink.', startX + availWidth / 2, startY + 54, { align: 'center' });

  // Draw intricate geometric floral mandala in PDF vector paths
  const cx = startX + availWidth / 2;
  const cy = startY + boxHeight / 2 + 10;
  const r = Math.min(availWidth, boxHeight) * 0.35;

  doc.setDrawColor(40, 40, 40);
  doc.setLineWidth(1.8);
  doc.circle(cx, cy, r);
  doc.circle(cx, cy, r * 0.7);
  doc.circle(cx, cy, r * 0.4);
  doc.circle(cx, cy, r * 0.15);

  // 12 spokes & Petal arcs
  for (let a = 0; a < 360; a += 30) {
    const rad = (a * Math.PI) / 180;
    const x1 = cx + Math.cos(rad) * (r * 0.15);
    const y1 = cy + Math.sin(rad) * (r * 0.15);
    const x2 = cx + Math.cos(rad) * r;
    const y2 = cy + Math.sin(rad) * r;
    doc.line(x1, y1, x2, y2);
  }
}

function renderJournalLinesPdf(
  doc: jsPDF,
  page: any,
  startX: number,
  startY: number,
  availWidth: number,
  availHeight: number
) {
  // Top date & reflection box
  doc.setDrawColor(200, 205, 215);
  doc.setLineWidth(1);
  doc.rect(startX, startY, availWidth, 36);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(60, 60, 60);
  doc.text('DATE: __________________     TODAY\'S INTENTION / AFFIRMATION: ________________________________', startX + 10, startY + 22);

  // Ruled lines for writing
  const lineSpacing = 22;
  const linesStartY = startY + 55;
  const numLines = Math.floor((availHeight - 80) / lineSpacing);

  doc.setDrawColor(215, 220, 230);
  doc.setLineWidth(0.75);

  for (let i = 0; i < numLines; i++) {
    const y = linesStartY + i * lineSpacing;
    doc.line(startX, y, startX + availWidth, y);
  }

  // Bottom 3 gratitude bullet points
  const bottomY = linesStartY + numLines * lineSpacing + 15;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(80, 90, 100);
  doc.text('3 THINGS I AM GRATEFUL FOR TODAY:', startX, bottomY);
  doc.setFont('helvetica', 'normal');
  doc.text('1. _________________________________   2. _________________________________   3. _________________________________', startX, bottomY + 16);
}

function renderDevotionalPdf(
  doc: jsPDF,
  page: any,
  startX: number,
  startY: number,
  availWidth: number,
  availHeight: number
) {
  // Scripture verse callout box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(1);
  doc.roundedRect(startX, startY, availWidth, 75, 4, 4, 'FD');

  doc.setFont('helvetica', 'bolditalic');
  doc.setFontSize(10.5);
  doc.setTextColor(30, 41, 59);
  const scripture = '"Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth." — Psalm 46:10';
  const splitVerse = doc.splitTextToSize(scripture, availWidth - 24);
  doc.text(splitVerse, startX + 12, startY + 28);

  // Devotional Reflection text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  const reflection = page.content || 'Take a quiet moment this morning to rest your mind and acknowledge divine peace over your circumstances. Notice the simple blessings surrounding your day.';
  const splitReflection = doc.splitTextToSize(reflection, availWidth);
  doc.text(splitReflection, startX, startY + 105);

  // Prayer prompt
  const prayerY = startY + 105 + (splitReflection.length * 15) + 20;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('PERSONAL PRAYER & CONTEMPLATION:', startX, prayerY);

  // Guided lines for written prayer
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.8);
  for (let i = 0; i < 7; i++) {
    const ly = prayerY + 22 + i * 22;
    if (ly < startY + availHeight) {
      doc.line(startX, ly, startX + availWidth, ly);
    }
  }
}
