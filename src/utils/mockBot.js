const AI_SUGGESTIONS = [
  'I notice you selected {perfume}. Would you like to make it more floral, woody, or add a fresh citrus twist?',
  'Great choice! How about we adjust the intensity? Would you prefer it lighter for daytime or bolder for evening wear?',
  'I can add some {note} to complement the existing {existing}. This would make it perfect for {occasion}.',
  "Let's enhance the {layer} notes. We could increase the {note} for a more {mood} feeling.",
  'Would you like to explore adding seasonal touches? Perhaps some warm spices for winter or light florals for spring?',
];

const AVAILABLE_NOTES = {
  top: [
    'Bergamot',
    'Lemon',
    'Orange',
    'Lavender',
    'Mint',
    'Green Tea',
    'Pink Pepper',
  ],
  heart: ['Rose', 'Jasmine', 'Lily', 'Peony', 'Neroli', 'Geranium', 'Iris'],
  base: [
    'Sandalwood',
    'Cedarwood',
    'Vanilla',
    'Amber',
    'Musk',
    'Patchouli',
    'Tonka Bean',
  ],
};

export { AI_SUGGESTIONS, AVAILABLE_NOTES };
