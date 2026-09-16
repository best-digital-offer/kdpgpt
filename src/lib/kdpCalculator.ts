import { TrimSize, PaperType } from '../types';

export interface TrimDimensions {
  width: number;
  height: number;
  label: string;
}

export const TRIM_DIMENSIONS: Record<TrimSize, TrimDimensions> = {
  '8.5x11': { width: 8.5, height: 11, label: '8.5" x 11" (Letter - Standard for Coloring, Puzzles, Workbooks)' },
  '6x9': { width: 6.0, height: 9.0, label: '6" x 9" (Standard Trade - Novels, Journals, Devotionals)' },
  '8.5x8.5': { width: 8.5, height: 8.5, label: '8.5" x 8.5" (Square - Children\'s Books, Art, Coloring)' },
  '5.5x8.5': { width: 5.5, height: 8.5, label: '5.5" x 8.5" (Compact - Pocket Planners, Small Journals)' },
  '7x10': { width: 7.0, height: 10.0, label: '7" x 10" (Midsize - Guided Journals, Workbooks)' },
};

export const PAPER_SPINE_MULTIPLIER: Record<PaperType, number> = {
  white: 0.002252, // Standard KDP B&W on 50# white paper
  cream: 0.002500, // Standard KDP B&W on 55# cream paper
  color: 0.002347, // Standard KDP Premium Color
};

export interface CoverCalculations {
  trimWidth: number;
  trimHeight: number;
  spineWidth: number;
  totalCoverWidth: number;
  totalCoverHeight: number;
  bleedMargin: number;
  safeMargin: number;
  barcodeBox: {
    width: number;
    height: number;
    fromRight: number;
    fromBottom: number;
  };
}

export function calculateKdpDimensions(
  trimSize: TrimSize,
  paperType: PaperType,
  pageCount: number,
  hasBleed: boolean = true
): CoverCalculations {
  const trim = TRIM_DIMENSIONS[trimSize] || TRIM_DIMENSIONS['8.5x11'];
  const multiplier = PAPER_SPINE_MULTIPLIER[paperType] || PAPER_SPINE_MULTIPLIER.white;
  
  // Amazon KDP spine formula
  const calculatedSpine = Math.max(0.0625, Number((pageCount * multiplier).toFixed(4)));
  
  const bleedMargin = 0.125; // 0.125" bleed per edge
  const safeMargin = 0.25;  // 0.25" safe text margin inside trim lines

  // Cover wrap dimensions: Back Cover (width) + Spine + Front Cover (width) + 2x Bleed
  const totalCoverWidth = Number((trim.width * 2 + calculatedSpine + (bleedMargin * 2)).toFixed(3));
  const totalCoverHeight = Number((trim.height + (bleedMargin * 2)).toFixed(3));

  return {
    trimWidth: trim.width,
    trimHeight: trim.height,
    spineWidth: calculatedSpine,
    totalCoverWidth,
    totalCoverHeight,
    bleedMargin,
    safeMargin,
    barcodeBox: {
      width: 2.0,
      height: 1.2,
      fromRight: 0.25,
      fromBottom: 0.25,
    },
  };
}

export function estimateKdpRoyalty(priceUSD: number, pageCount: number, paperType: PaperType) {
  // Amazon KDP 60% royalty formula for standard distribution
  // Printing cost = fixed cost ($1.00 or $0.85) + (pageCount * per_page_cost)
  const fixedCost = 1.00;
  const perPageCost = paperType === 'color' ? 0.07 : 0.012;
  const printingCost = fixedCost + (pageCount * perPageCost);
  const grossRoyalty = (priceUSD * 0.60) - printingCost;
  const netRoyalty = Math.max(0, Number(grossRoyalty.toFixed(2)));
  return {
    printingCost: Number(printingCost.toFixed(2)),
    netRoyalty,
    marginPercent: Number(((netRoyalty / Math.max(1, priceUSD)) * 100).toFixed(1)),
  };
}
