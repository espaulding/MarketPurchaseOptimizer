const engravings = [
  { 
      label: 'Pet Buffs', code: 'pets',
      items: [
          { // 0
              label: 'HP', code: 'HP',
              tooltip: '',
              impl: {
                hp: (h) => { return h * 1.05; },
              }
          },             
    
      ]
  },
];

export default cardsets;