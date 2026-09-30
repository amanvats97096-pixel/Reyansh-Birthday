export interface PageRouteInfo {
  id: number;
  path: string;
  title: string;
  shortTitle: string;
  icon: string;
  description: string;
}

export const PAGES: PageRouteInfo[] = [
  { id: 1, path: '/', shortTitle: 'Welcome', title: 'Birthday Welcome', icon: 'Sparkles', description: 'The grand opening reveal' },
  { id: 2, path: '/countdown', shortTitle: 'Countdown', title: 'Birthday Countdown', icon: 'Clock', description: 'Counting down to 4 October 2026' },
  { id: 3, path: '/hello-two', shortTitle: 'Hello, Two!', title: 'Hello, Two!', icon: 'Heart', description: 'Celebrating two wonderful years' },
  { id: 4, path: '/sunshine', shortTitle: 'Sunshine', title: 'Our Little Sunshine', icon: 'Sun', description: 'Warm wishes & bright photos' },
  { id: 5, path: '/storybook', shortTitle: 'Storybook', title: 'The Photo Storybook', icon: 'BookOpen', description: 'Interactive page-turn album' },
  { id: 6, path: '/balloons', shortTitle: 'Balloons', title: 'A Sky Full of Balloons', icon: 'PartyPopper', description: 'Pop balloons to reveal wishes' },
  { id: 7, path: '/cake', shortTitle: 'Birthday Cake', title: 'Birthday Cake', icon: 'Cake', description: 'Blow out candles & make a wish' },
  { id: 8, path: '/gifts', shortTitle: 'Surprise Gifts', title: 'Surprise Gifts', icon: 'Gift', description: 'Open animated gift boxes' },
  { id: 9, path: '/superstar', shortTitle: 'Superstar', title: 'Our Little Superstar', icon: 'Star', description: 'Sparkling star interactive page' },
  { id: 10, path: '/teddy-party', shortTitle: 'Teddy Party', title: 'The Teddy Bear Party', icon: 'Smile', description: 'Playful teddy bear greeting' },
  { id: 11, path: '/letter', shortTitle: 'Letter', title: 'A Letter for Reyansh', icon: 'Mail', description: 'Envelope opening heartfelt wish' },
  { id: 12, path: '/gallery', shortTitle: 'Memory Gallery', title: 'The Memory Gallery', icon: 'Image', description: 'Full photo collection with lightbox' },
  { id: 13, path: '/dance-party', shortTitle: 'Dance Party', title: 'Birthday Dance Party', icon: 'PartyPopper', description: 'Joyful celebration & music' },
  { id: 14, path: '/grand-finale', shortTitle: 'Grand Finale', title: 'The Grand Finale', icon: 'Award', description: 'Celebratory final message' }
];

export function getPageIndex(path: string): number {
  const page = PAGES.find((p) => p.path === path);
  return page ? page.id : 1;
}
