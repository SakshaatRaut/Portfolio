// Life Beyond page. Drop photos into public/assets/life/ and list their paths in `images`
// (e.g. '/assets/life/hike-1.jpg'). Empty strings show an "Add photo" slot.
// The first photo in each list is the big one. Add layout: 'portrait' to show three tall photos side by side.
export const LIFE_INTRO =
  "When I'm not training models, I'm usually deep in an anime arc, chasing a shuttle with friends, out on a trail or on my bike. These are the things that keep me curious and recharged.";

export const HOBBIES = [
  {
    id: 'anime',
    title: 'Anime',
    tagline: 'Stories that hit harder than any loss curve.',
    text:
      'Anime is where I unwind. I love long arcs, big fights and characters who keep pushing past their limits, from pirate crews to demon slayers.',
    facts: [
      { label: 'All-time favourites', value: 'One Piece, Demon Slayer, Bleach, Black Clover' },
      { label: 'Why I watch', value: 'Long arcs and characters who never give up' },
    ],
    color: '#455CE9',
    layout: 'portrait',
    images: ['/assets/life/anime-one-piece.svg', '/assets/life/anime-bleach.svg', '/assets/life/anime-black-clover.svg'],
  },
  {
    id: 'badminton',
    title: 'Badminton',
    tagline: 'Casual with friends, competitive at heart.',
    text:
      "I play mostly with friends, but I'm competitive about it. I've played consistently for the last two years since moving to the US, and I made it to the semi-finals of my university tournament.",
    facts: [
      { label: 'Best result', value: 'University tournament semi-finalist' },
      { label: 'Playing', value: 'Consistently for 2 years in the US' },
    ],
    color: '#24A36B',
    images: ['', '', ''],
  },
  {
    id: 'hikes',
    title: 'Hikes',
    tagline: 'Long trails, good views, no Wi-Fi.',
    text:
      "Hiking is how I reset. I've explored trails across Virginia, Maryland, West Virginia and Pennsylvania, and the Loyalsock Trail is the one I'm proudest of.",
    facts: [
      { label: 'Proudest hike', value: 'Loyalsock Trail, Pennsylvania' },
      { label: 'Also hiked', value: "Shenandoah National Park, Billy Goat Trail, Point of Rocks, Rock Creek Park, Harpers Ferry" },
    ],
    color: '#C47A12',
    layout: 'portrait',
    images: ['/assets/life/hike-1.jpg', '/assets/life/hike-2.jpg', '/assets/life/hike-3.jpg'],
  },
  {
    id: 'bike-riding',
    title: 'Bike Riding',
    tagline: 'Two wheels, open road.',
    text:
      'When I want to get outside without planning a whole hike, I go for a ride. It clears my head and is a great way to explore somewhere new.',
    facts: [
      { label: 'Why I ride', value: 'Fresh air and a clear head' },
      { label: 'Best part', value: 'Finding new places along the way' },
    ],
    color: '#D9435F',
    images: ['', '', ''],
  },
];
