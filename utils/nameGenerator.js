// @flow
const sampleName = [
  'John',
  'Joe',
  'Jeff',
  'Hi',
  'So',
  'To',
  'Wo',
  'Bo',
  'Random',
  'Sounds',
  'Coming',
  'Up',
  'With',
  'Names',
  'You',
  'Tell',
  'Me',
  'What',
  'Is',
  'A',
  'Good',
  'Name',
  'I',
  'Am',
  'Just',
  'Trying',
  'To',
  'Add',
  'Some',
  'Variety',
];

function getName(id: number) {
  // ID is zero based, so log(0) is -inf
  // Add one to start at one
  let currentIndex = id;
  let nameParts = [];

  if (id === 0) {
    return sampleName[0];
  }

  while (currentIndex >= 1) {
    nameParts.push(sampleName[currentIndex % sampleName.length]);
    currentIndex = Math.floor(currentIndex / sampleName.length);
  }

  return nameParts.join(' ');
}

export {getName};
