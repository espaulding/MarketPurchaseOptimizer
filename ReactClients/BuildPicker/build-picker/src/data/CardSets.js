const cardsets = [
  { 
      label: 'Card Sets', code: 'cards',
      items: [
          { // 0
              label: 'Lost Wind Cliff ', code: 'LWC',
              tooltip: '',
              impl: {
                  cr: (crit) => { return crit + .07; }
              }
          },             
    
      ]
  },
];

export default cardsets;