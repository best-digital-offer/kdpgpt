import { BookProject, UserProfile, NicheAnalysis, SupportTicket, PromptTemplate } from '../types';
import { generateSudoku, generateWordSearch, generateMaze } from './puzzleEngine';

export const INITIAL_USER: UserProfile = {
  id: 'usr_8823a9b',
  name: 'Alex Rivera',
  email: 'pamarthikrishnasayee@gmail.com',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  plan: 'free',
  dailyGenerationsLeft: 3,
  maxDailyGenerations: 3,
  totalBooksCreated: 14,
  memberSince: 'September 2024',
  affiliateCode: 'ALEX2026',
  affiliateEarningsUSD: 480.50,
};

export const INITIAL_PROJECTS: BookProject[] = [
  {
    id: 'proj_mandala_zen',
    title: 'Mindful Mandalas & Sacred Blooms',
    subtitle: '50 Relaxing Floral Geometric Patterns for Stress Relief and Anxiety Calm',
    authorName: 'Aura Bloom Publishing',
    bookType: 'coloring',
    targetNiche: 'Adult Coloring Book Stress Relief',
    targetAudience: 'Stressed professionals, seniors, art therapy enthusiasts',
    trimSize: '8.5x11',
    paperType: 'white',
    hasBleed: true,
    pageCount: 54,
    spineWidthInches: 0.1216,
    coverWidthInches: 17.371,
    coverHeightInches: 11.25,
    primaryColor: '#6366f1',
    accentColor: '#ec4899',
    coverImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    backCoverBlurb: 'Unwind your mind and restore inner balance with 50 intricately designed botanical mandalas. Carefully engineered for colored pencils, gel pens, and fine-line markers.',
    aboutAuthor: 'Aura Bloom specializes in research-backed art therapy and mindfulness publications on Amazon KDP.',
    createdAt: '2026-09-12',
    updatedAt: '2026-09-15',
    keywords: [
      'coloring book for adults relaxation',
      'mandala coloring books for anxiety',
      'stress relief coloring pages floral',
      'botanical mindfulness art therapy',
      'easy large print adult coloring book'
    ],
    amazonBackendKeywords: [
      'mindfulness meditation art therapy anti anxiety',
      'sacred geometry lotus flower botanical patterns',
      'relaxation gifts for women self care routine',
      'large print calming zen designs intricate lines',
      'colored pencil adult activities mental wellness',
      'stress relief hobbies creative outlet weekend',
      'gift for mom sister teacher birthday holiday'
    ],
    listing: {
      optimizedTitle: 'Mindful Mandalas & Sacred Blooms: 50 Relaxing Floral Geometric Patterns for Stress Relief and Anxiety Calm',
      optimizedSubtitle: 'Adult Coloring Book with Beautiful Botanical Designs for Mindfulness and Meditation',
      bulletPoints: [
        '50 UNIQUE HAND-CRAFTED DESIGNS: Gorgeous circular mandalas blending botanical blooms, sacred geometry, and soothing zen patterns.',
        'SINGLE-SIDED PRINTING: Every illustration is backed by a dark textured sheet to prevent marker bleed-through on Amazon paper.',
        'PERFECT 8.5 x 11" TRIM SIZE: Large canvas format ensures spacious, satisfying coloring whether using markers, pencils, or gel pens.',
        'PROVEN STRESS RELIEF: Promotes deep diaphragmatic breathing, lowers cortisol, and unlocks meditative creative focus.'
      ],
      htmlDescription: `<h2>Escape the Chaos and Awaken Your Inner Serenity</h2>
<p>Are you feeling overwhelmed by daily screens, deadlines, and anxiety? <b>Mindful Mandalas & Sacred Blooms</b> was specially designed to help you detach from digital fatigue and enter a tranquil state of meditative flow.</p>
<h3>Inside this Amazon Best-Selling Collection:</h3>
<ul>
  <li><b>50 Harmonious Patterns:</b> From gentle beginner mandalas to intricate floral labyrinths.</li>
  <li><b>Stress-Melting Geometric Symmetry:</b> Scientifically structured to center attention and dissolve stress.</li>
  <li><b>Thick Crisp Line Art:</b> Flawlessly formatted at 300 DPI for effortless coloring without gray borders.</li>
</ul>
<p><b>Scroll up and click 'Buy Now' to gift yourself or a loved one hours of pure relaxation!</b></p>`,
      suggestedCategories: [
        'Books > Crafts, Hobbies & Home > Coloring Books for Grown-Ups > Mandalas & Patterns',
        'Books > Health, Fitness & Dieting > Mental Health > Stress Management'
      ],
      suggestedPriceUSD: 9.99,
      estimatedRoyaltyUSD: 4.34,
      sevenBackendKeywords: [
        'mindfulness meditation art therapy anti anxiety',
        'sacred geometry lotus flower botanical patterns',
        'relaxation gifts for women self care routine',
        'large print calming zen designs intricate lines',
        'colored pencil adult activities mental wellness',
        'stress relief hobbies creative outlet weekend',
        'gift for mom sister teacher birthday holiday'
      ]
    },
    adsKeywords: [
      { keyword: 'adult coloring book', matchType: 'Broad', suggestedBidUSD: 0.45, searchVolume: 'High', relevanceScore: 98 },
      { keyword: 'mandala coloring book for adults', matchType: 'Phrase', suggestedBidUSD: 0.62, searchVolume: 'High', relevanceScore: 95 },
      { keyword: 'stress relief gifts for women', matchType: 'Broad', suggestedBidUSD: 0.38, searchVolume: 'Medium', relevanceScore: 88 },
      { keyword: 'anxiety relief coloring book', matchType: 'Exact', suggestedBidUSD: 0.75, searchVolume: 'Medium', relevanceScore: 92 },
      { keyword: 'mindfulness gifts under 10 dollars', matchType: 'Phrase', suggestedBidUSD: 0.32, searchVolume: 'Low', relevanceScore: 84 }
    ],
    aplusModules: [
      {
        id: 'aplus_1',
        type: 'header_image_text',
        headline: 'Find Your Peaceful Oasis in Every Page',
        bodyText: 'Designed in collaboration with wellness experts to provide maximum creative immersion and mental tranquility.',
      },
      {
        id: 'aplus_2',
        type: 'standard_3_images',
        headline: 'Why Colorists Love This Edition',
        bodyText: 'Crisp line art, bleed-resistant single-sided pages, and varied complexity levels suitable for beginners and seasoned colorists.',
        points: ['300 DPI Vector Inking', 'Zero Repeating Patterns', 'Optimal Marker Safe Margins']
      }
    ],
    pages: [
      {
        id: 'p1',
        pageNumber: 3,
        type: 'coloring',
        title: 'Blooming Lotus of Serenity',
        content: 'Focus your breath on the center circle. Color outward as you exhale tensions.'
      },
      {
        id: 'p2',
        pageNumber: 4,
        type: 'coloring',
        title: 'Sacred Sun Spiral Mandala',
        content: 'Embrace warming shades of gold, amber, and terracotta to ignite vitality.'
      },
      {
        id: 'p3',
        pageNumber: 5,
        type: 'coloring',
        title: 'Starlight Dahlia Symmetry',
        content: 'Precision petals designed for fine-point pens and relaxing contemplation.'
      }
    ]
  },
  {
    id: 'proj_wordsearch_90s',
    title: 'Ultimate 90s Nostalgia Word Search',
    subtitle: '100 Rad Puzzles Celebrating 90s Pop Culture, Cartoons, Grunge Music, and Retro Tech',
    authorName: 'Throwback Press',
    bookType: 'puzzle',
    targetNiche: 'Nostalgia Gift Puzzle Books',
    targetAudience: 'Millennials, 90s kids, Gen X, retro gaming fans',
    trimSize: '8.5x11',
    paperType: 'white',
    hasBleed: false,
    pageCount: 110,
    spineWidthInches: 0.2477,
    coverWidthInches: 17.498,
    coverHeightInches: 11.25,
    primaryColor: '#06b6d4',
    accentColor: '#f59e0b',
    coverImageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    backCoverBlurb: 'Rewind the tape and test your memory! Grab your neon gel pens and hunt down over 1,500 classic 90s slang terms, dial-up sounds, blockbuster movies, and Saturday morning cartoons.',
    aboutAuthor: 'Throwback Press crafts high-energy retro puzzle books for vintage culture lovers.',
    createdAt: '2026-09-10',
    updatedAt: '2026-09-14',
    keywords: [
      '90s trivia word search book',
      'nostalgia gifts for 90s kids',
      'retro word search for adults',
      'millennial gift ideas under 15',
      'large print puzzle books 1990s'
    ],
    amazonBackendKeywords: [
      'grunge rock hip hop boy bands pop culture cassette',
      'tamagotchi dial up internet beeper floppy disk tv',
      'saturday morning cartoons sitcoms blockbusters',
      'millennial 40th birthday gift nostalgia fun game',
      'large print easy to read puzzle book senior adult',
      'travel airplane activity book waiting room fun',
      'retro vintage aesthetic humor stocking stuffer'
    ],
    listing: {
      optimizedTitle: 'Ultimate 90s Nostalgia Word Search: 100 Rad Puzzles Celebrating 90s Pop Culture, Cartoons, Grunge Music, and Retro Tech',
      optimizedSubtitle: 'The Totally Awesome 1990s Activity Book & Trivia Gift for 90s Kids and Millennials',
      bulletPoints: [
        '100 NOSTALGIC THEMED PUZZLES: Relive the golden era of floppy disks, boy bands, VHS tapes, and slang.',
        'OVER 1,500 RETRO WORDS: Curated with deep-cut trivia for true 90s kids.',
        'LARGE PRINT COMFORT: High-contrast 16-point font prevents eye strain during long puzzle sessions.',
        'COMPLETE ANSWER KEYS: Full solutions located at the back for quick verification.'
      ],
      htmlDescription: `<h2>Take a Trip Down Memory Lane with the Most Nostalgic Puzzle Book on Amazon!</h2>
<p>Do you remember blowing into video game cartridges, waiting for dial-up internet to connect, or recording songs off the radio onto cassette tapes? <b>Ultimate 90s Nostalgia Word Search</b> is your time machine back to the greatest decade in history.</p>`,
      suggestedCategories: [
        'Books > Humor & Entertainment > Puzzles & Games > Word Search',
        'Books > History > United States > 20th Century'
      ],
      suggestedPriceUSD: 8.99,
      estimatedRoyaltyUSD: 3.07,
      sevenBackendKeywords: [
        'grunge rock hip hop boy bands pop culture cassette',
        'tamagotchi dial up internet beeper floppy disk tv',
        'saturday morning cartoons sitcoms blockbusters',
        'millennial 40th birthday gift nostalgia fun game',
        'large print easy to read puzzle book senior adult',
        'travel airplane activity book waiting room fun',
        'retro vintage aesthetic humor stocking stuffer'
      ]
    },
    adsKeywords: [
      { keyword: '90s nostalgia gifts', matchType: 'Broad', suggestedBidUSD: 0.55, searchVolume: 'High', relevanceScore: 94 },
      { keyword: 'word search puzzle book for adults', matchType: 'Phrase', suggestedBidUSD: 0.40, searchVolume: 'High', relevanceScore: 90 },
      { keyword: 'gifts for 90s kids', matchType: 'Broad', suggestedBidUSD: 0.48, searchVolume: 'Medium', relevanceScore: 86 }
    ],
    aplusModules: [],
    pages: [
      {
        id: 'ws_1',
        pageNumber: 3,
        type: 'wordsearch',
        title: 'Saturday Morning Cartoons',
        content: 'Find all your favorite animated classics from the 90s lineup.',
        puzzleData: generateWordSearch(['RUGRATS', 'ANIMANIACS', 'POKEMON', 'DOUG', 'GARGOYLES', 'ARTHUR', 'RECESS', 'SAILORMOON'], 14, 'medium')
      },
      {
        id: 'ws_2',
        pageNumber: 4,
        type: 'wordsearch',
        title: 'Dial-Up Internet & Tech',
        content: 'Celebrate the sounds and gadgets that started the digital revolution.',
        puzzleData: generateWordSearch(['MODEM', 'NETSCAPE', 'FLOPPY', 'PAGER', 'AIM', 'GEO CITIES', 'PENTIUM', 'WINAMP'], 14, 'medium')
      },
      {
        id: 'sud_1',
        pageNumber: 5,
        type: 'sudoku',
        title: 'Arcade Sudoku Break #1',
        content: 'A classic 9x9 brain teaser between retro word searches.',
        puzzleData: generateSudoku('medium')
      },
      {
        id: 'maze_1',
        pageNumber: 6,
        type: 'maze',
        title: 'Labyrinth of 90s Malls',
        content: 'Navigate from the Food Court to the CD Store exit.',
        puzzleData: generateMaze(17, 17, 'medium')
      }
    ]
  },
  {
    id: 'proj_gratitude_journal',
    title: 'Daily Grace & Gratitude Journal',
    subtitle: 'A 90-Day Guided Prayer & Reflection Journey with Daily Bible Verses',
    authorName: 'Grace & Truth Press',
    bookType: 'journal',
    targetNiche: 'Christian Prayer & Gratitude Journal',
    targetAudience: 'Christian women, church groups, morning devotional readers',
    trimSize: '6x9',
    paperType: 'cream',
    hasBleed: false,
    pageCount: 100,
    spineWidthInches: 0.25,
    coverWidthInches: 12.5,
    coverHeightInches: 9.25,
    primaryColor: '#10b981',
    accentColor: '#fbbf24',
    coverImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    backCoverBlurb: 'Start each morning anchored in peace. Features 90 curated scripture verses, prompt-guided gratitude journaling, and space for answered prayers.',
    aboutAuthor: 'Grace & Truth Press creates devotional planners supporting intentional Christian living.',
    createdAt: '2026-09-08',
    updatedAt: '2026-09-13',
    keywords: [
      'prayer journal for women daily scripture',
      'christian gratitude journal 90 days',
      'bible study journal notebook 6x9',
      'devotional gifts for mom church bible group',
      'morning prayer reflection notebook'
    ],
    amazonBackendKeywords: [
      'faith based inspirational gifts religious women',
      'guided prayer notebook scripture memory daily',
      'quiet time companion bible study small group',
      'mental health faith anxiety calm gratitude',
      'christian gift easter mother day christmas',
      'answered prayer tracker habit tracker daily',
      'cream paper gold aesthetic devotional notebook'
    ],
    listing: {
      optimizedTitle: 'Daily Grace & Gratitude Journal: A 90-Day Guided Prayer & Reflection Journey with Daily Bible Verses',
      optimizedSubtitle: 'Christian Devotional Notebook for Women with Scripture, Morning Gratitude, and Answered Prayer Tracker',
      bulletPoints: [
        '90 CURATED SCRIPTURE VERSES: Daily uplifting verses from Psalms, Proverbs, and Gospels.',
        'SIMPLE 5-MINUTE MORNING FORMAT: Easy to maintain even on your busiest days.',
        'WARM CREAM PAPER & 6x9" TRADE SIZE: Fits perfectly inside your bible bag or nightstand.',
        'MEANINGFUL CHRISTIAN GIFT: Beautiful keepsake for baptisms, Mother\'s Day, and birthdays.'
      ],
      htmlDescription: `<h2>Transform Your Daily Quiet Time into a Sanctuary of Peace</h2>
<p>Do you long for a deeper, more intentional prayer life? <b>Daily Grace & Gratitude Journal</b> provides an inspiring, structured path to start your mornings with thankfulness and scripture.</p>`,
      suggestedCategories: [
        'Books > Christian Books & Bibles > Christian Living > Devotionals',
        'Books > Self-Help > Journaling'
      ],
      suggestedPriceUSD: 11.99,
      estimatedRoyaltyUSD: 5.09,
      sevenBackendKeywords: [
        'faith based inspirational gifts religious women',
        'guided prayer notebook scripture memory daily',
        'quiet time companion bible study small group',
        'mental health faith anxiety calm gratitude',
        'christian gift easter mother day christmas',
        'answered prayer tracker habit tracker daily',
        'cream paper gold aesthetic devotional notebook'
      ]
    },
    adsKeywords: [
      { keyword: 'prayer journal for women', matchType: 'Phrase', suggestedBidUSD: 0.65, searchVolume: 'High', relevanceScore: 96 },
      { keyword: 'christian gratitude journal', matchType: 'Broad', suggestedBidUSD: 0.42, searchVolume: 'High', relevanceScore: 92 }
    ],
    aplusModules: [],
    pages: [
      {
        id: 'j1',
        pageNumber: 3,
        type: 'devotional',
        title: 'Day 1: Anchored in Peace',
        content: 'When worries mount, surrender the outcome. Write down what you release today.'
      },
      {
        id: 'j2',
        pageNumber: 4,
        type: 'journal_prompt',
        title: 'Morning Gratitude & Petitions',
        content: 'Record 3 blessings you observed in the past 24 hours.'
      }
    ]
  }
];

export const INITIAL_NICHES: NicheAnalysis[] = [
  {
    niche: 'Adult Coloring Book Stress Relief & Animals',
    bsrScore: 8450,
    estimatedMonthlySales: 620,
    competitionScore: 54,
    demandScore: 92,
    profitPotential: 'Very High',
    averagePriceUSD: 9.99,
    suggestedSubNiches: [
      'Gothic Dark Fantasy Fairies Coloring Book',
      'Cute Spooky Kawaii Coloring for Teens',
      'Botanical Herb Garden & Tea Cup Mandalas',
      'Stained Glass Country Cabins & Landscapes'
    ],
    targetBuyerPersonas: [
      'Self-care gift buyers for mothers, daughters, and friends',
      'Adults dealing with insomnia or high workplace stress',
      'Seniors looking for calming dexterity exercises'
    ],
    topSearchTerms: [
      'coloring books for adults relaxation',
      'easy large print adult coloring book',
      'anxiety relief coloring books for women'
    ],
    seasonality: 'Peaks during Q4 holiday gifting (Nov-Jan) and Mother\'s Day (May)',
    adviceNotes: 'Single-sided printing with dark back pages is mandatory to prevent reviews complaining about bleed-through. Target at least 45 unique interior illustrations.'
  },
  {
    niche: 'Large Print Word Search & Brain Games for Seniors',
    bsrScore: 4200,
    estimatedMonthlySales: 1150,
    competitionScore: 62,
    demandScore: 95,
    profitPotential: 'Very High',
    averagePriceUSD: 8.99,
    suggestedSubNiches: [
      'Decade Themed (50s, 60s, 70s, 80s, 90s) Word Search',
      'Bible Verse Scripture Memory Word Search',
      'State-by-State Road Trip & US National Parks Word Search',
      'Large Print Crossword & Sudoku Combo Pack'
    ],
    targetBuyerPersonas: [
      'Adult children purchasing cognitive gifts for aging parents',
      'Retirees enjoying morning coffee routines',
      'Rehabilitation and nursing home activities directors'
    ],
    topSearchTerms: [
      'large print word search for seniors',
      'dementia activities for seniors games',
      'word search books for adults large print'
    ],
    seasonality: 'Consistent sales year-round with massive December stocking-stuffer spike',
    adviceNotes: 'Ensure minimum 16pt font size. Always include clean answer keys in back. Standard 8.5x11 inch trim is preferred.'
  },
  {
    niche: 'Guided Self-Love & Shadow Work Journal for Women',
    bsrScore: 11200,
    estimatedMonthlySales: 410,
    competitionScore: 48,
    demandScore: 86,
    profitPotential: 'High',
    averagePriceUSD: 12.99,
    suggestedSubNiches: [
      'Inner Child Healing Prompt Workbook',
      'Nervous System Reset & Somatic Journal',
      'Manifestation & Scripting 369 Method Journal',
      'Burnout Recovery Planner for Healthcare Workers'
    ],
    targetBuyerPersonas: [
      'Women aged 22-38 interested in therapy, journaling, and wellness',
      'TikTok and Instagram mental health community followers'
    ],
    topSearchTerms: [
      'shadow work journal with prompts',
      'self love workbook for women',
      'guided mental health journal'
    ],
    seasonality: 'Surges sharply in January (New Year resolutions) and back-to-school (September)',
    adviceNotes: 'High perceived value allows pricing at $11.99 - $14.99. Provide structured daily or weekly exercise prompts.'
  }
];

export const INITIAL_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'tkt_101',
    userEmail: 'sarah.author@gmail.com',
    subject: 'KDP Cover PDF spine measurement check',
    category: 'KDP Export',
    status: 'Resolved',
    date: '2026-09-14',
    message: 'The spine width calculator gave me 0.248 inches for 110 pages on white paper. Uploaded to Amazon KDP and passed print check without warnings!'
  },
  {
    id: 'tkt_102',
    userEmail: 'marcus.kdp@outlook.com',
    subject: 'Request for Crossword puzzle grid export',
    category: 'Feature Request',
    status: 'In Progress',
    date: '2026-09-15',
    message: 'Can you add custom crossword grid sizes for compact travel books (6x9 trim)?'
  },
  {
    id: 'tkt_103',
    userEmail: 'elena.books@yahoo.com',
    subject: 'Billing upgrade from Pro to Agency',
    category: 'Billing',
    status: 'Resolved',
    date: '2026-09-15',
    message: 'Seamlessly prorated. Thanks for the quick support!'
  }
];

export const INITIAL_PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'tmpl_1',
    category: 'coloring',
    name: 'Mandala Line-Art Vector Generator',
    prompt: 'Generate an intricate black and white mandala line art illustration suitable for adult coloring book. Crisp vector lines, high contrast, pure white background, no grayscale, no shading.',
    model: 'flux',
    active: true
  },
  {
    id: 'tmpl_2',
    category: 'puzzle',
    name: 'KDP Word Search Clue Crafter',
    prompt: 'Create 15 clever thematic words related to the chosen sub-niche, ensuring no duplicate words, lengths between 4 and 10 letters, suitable for Amazon puzzle books.',
    model: 'gemini',
    active: true
  },
  {
    id: 'tmpl_3',
    category: 'journal',
    name: 'Daily Reflective Prompt Synthesizer',
    prompt: 'Write an inspiring 5-part reflective journal prompt centered on gratitude, emotional regulation, and daily forward progress.',
    model: 'gemini',
    active: true
  }
];
