export default [
  {
    id: '1',
    type: 'question',
    reason: {
      countryRegion: 'Poland',
    },
    question: 'Które miasto jest obecną stolicą Polski',
    correct_answer: 'Warszawa',
    incorrect_answers: ['Gdańsk', 'Kraków', 'Mońki'],
  },
  {
    id: '2',
    type: 'question',
    reason: {
      countryRegion: 'United Kingdom',
    },
    question: 'Które miasto jest obecną stolicą Anglii',
    correct_answer: 'London',
    incorrect_answers: ['Gdańsk', 'Kraków', 'Mońki'],
  },
  {
    id: '3',
    type: 'question',
    reason: {
      adminDistrict: "Woj. Pomorskie",
    },
    question: 'Czy woj. Pomorskie jest województwem o największej liczbie jezior?',
    correct_answer: 'Tak',
    incorrect_answers: ['Nie', 'Wątpię'],
  },
  {
    id: '4',
    type: 'question',
    reason: {
      adminDistrict2: 'PL',
    },
    question: 'Które miasto jest obecną stolicą Polski',
    correct_answer: 'Warszawa',
    incorrect_answers: ['Gdańsk', 'Kraków', 'Mońki'],
  },
  {
    id: '5',
    type: 'question',
    reason: {
      adminDistrict: "England",
    },
    question: 'What is the highest peak in England?',
    correct_answer: 'Scafell Pike',
    incorrect_answers: ['Mount Suffolk', 'Ben Nevis'],
  },
];
