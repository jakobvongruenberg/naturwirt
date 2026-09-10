export const measuresData = [
  {
    id: 'mock_measure1',
    title: 'Diverse crops in arable farming',
    created: '1 year ago',
    updated: '2 weeks ago',
    effort: 'Low',
    setting: 'Arable land in Brandenburg',
    duration: '1 year',
    situation: 'Operational',
    applyBy: '16 Jun 2024',
    price: 60,
    priceUnit: '€/ha',
    involved:
      'Cultivation of at least 5 crops including 10% legumes on the entire farm',
    requirements: {
      cultivationConditions: [
        '5 main crops',
        'min. 10%; max. 30% of the total area per crop',
        'min. 10 % of the total area must be legumes',
        'max. 65% grain (excl. maize & millet)',
        'Winter and summer crops of the same genus are considered two crops',
        'If more than 5 crops are cultivated, crops can be summarised for the calculation of the minimum seed shares',
        'The main crop is considered to be the crop grown between 01.06 - 15.07',
      ],
      plantProtectionMeasures: 'No specific plant protection requirements',
      fertiliser: 'No specific fertiliser requirements',
      areaDetermination: {
        maximumArea: 'No restrictions',
        minimumArea: '> 0.25 ha (at 15 m at the widest point)',
        form: 'Strips / area',
      },
    },
    benefits: [
      'Nitrogen fixation: Legumes bind nitrogen from the air and make it available in the soil, which reduces the need for nitrogen fertilizers and contributes to soil fertility.',
      'Improving soil health: Crop diversity and crop rotation balance different nutrients in the soil, improving soil structure and promoting soil health.',
      'Pest and disease control: A diverse crop rotation can reduce the incidence of pests and diseases by making it more difficult for them to multiply and favouring natural enemies.',
    ],
    keyDates: 'No specific time restrictions',
    supplements: [],
    contact: [
      {
        name: 'Sebastian Meyer',
        email: 'example@email.com',
        phone: '(0) 1522 343 3333',
      },
      {
        name: 'Anja Schmidt',
        email: 'example@email.com',
        phone: '(0) 1522 343 3333',
      },
    ],
    combinations: {
      available: [],
      unavailable: [],
    },
  },
  {
    id: 'mock_measure2',
    title: 'Extensive cereal/grain cultivation',
    created: '1 year ago',
    updated: '2 weeks ago',
    effort: 'Low',
    setting: 'Arable land in Brandenburg',
    duration: '6 years',
    situation: 'Rotating',
    applyBy: '18 May 2024',
    price: 1088,
    priceUnit: '€/ha',
    involved:
      'Annual cultivation of cereals, cereal legumes and grain mixtures with extensive production',
    requirements: {
      cultivationConditions: [
        'Double seed row spacing',
        'Obligatory documentation in the field catalogue',
        'No irrigation',
      ],
      plantProtectionMeasures: 'No specific measures required',
      fertiliser:
        'No chemical/synthetic fertilisation, 50% organic fertilisation of N requirement',
      areaDetermination: {
        maximumArea: '10 ha',
        minimumArea: '> 0.25 ha (at 15 m at the widest point)',
        form: 'Strips / area',
      },
    },
    benefits: [
      'Conservation and promotion of habitats for insects and birds',
      'Promotion of breeding opportunities',
      'Reducing the impact of pesticides on soil organisms',
      'Protection of rare wild field herbs',
    ],
    keyDates: [
      {
        period: 'Jan - Mar',
        activities: ['No tasks'],
      },
      {
        period: 'Apr - Jun',
        activities: [
          'Spring sowing until 15 Apr',
          'Driving prohibited after 15 Apr',
        ],
      },
      {
        period: 'Jul - Sep',
        activities: ['Harvest from 8 Aug', 'Tillage from 16 Sep'],
      },
      {
        period: 'Oct - Dec',
        activities: ['Autumn sowing until Oct 30th'],
      },
    ],
    supplements: [
      {
        id: 'A',
        title: 'Flowering undersow',
        price: 450,
        description: 'Annual undersowing of at least 4 species (list)',
      },
      {
        id: 'B',
        title: 'Larch window',
        price: 30,
        description:
          '2 windows of at least 40 m2 each, at least 20 m to the boundary, 2 m to the driveway',
      },
      {
        id: 'C',
        title: 'Stubble fallow',
        price: 30,
        description:
          'Size min. 0.25 ha / max. 1.5 ha, self-vegetation, at least 20m to the field boundary, 2m to the lane',
      },
      {
        id: 'D',
        title: 'Legumes',
        price: 960,
        description:
          'Size min. 0.25 ha / max. 1.5 ha, legume sowing 1.10, rest period until 15.8. at least 20m to the field boundary, 2m to the tramline',
      },
    ],
    contact: [
      {
        name: 'Sebastian Meyer',
        email: 'example@email.com',
        phone: '(0) 1522 343 3333',
      },
      {
        name: 'Anja Schmidt',
        email: 'example@email.com',
        phone: '(0) 1522 343 3333',
      },
    ],
    combinations: {
      available: ['Agroforestry', 'Nature 2000'],
      unavailable: ['No use of pesticides', '100% N-fix'],
    },
  },
]
