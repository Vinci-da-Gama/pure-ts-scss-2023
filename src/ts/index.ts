import '../style/style.scss'; // you must import .scss or .css file to .ts or .tsx file, otherwise, webpack will ignore .scss or .css files.

export enum RecipeActionTypes {
  SET_RECIPES = '[companyName]/recipes-SET_RECIPES',
  FETCH_RECIPES = '[companyName]/recipes-FETCH_RECIPES',
  STORE_RECIPES = '[companyName]/recipes-STORE_RECIPES',
  ADD_RECIPE = '[companyName]/recipes-ADD_RECIPE',
  UPDATE_RECIPE = '[companyName]/recipes-UPDATE_RECIPE',
  DELETE_RECIPE = '[companyName]/recipes-DELETE_RECIPE',
}

console.log(
  '13 -- RecipeActionTypes: ',
  RecipeActionTypes.DELETE_RECIPE,
  typeof RecipeActionTypes.DELETE_RECIPE,
);
console.log(
  '18 -- RecipeActionTypes: ',
  RecipeActionTypes.DELETE_RECIPE.valueOf(),
  typeof RecipeActionTypes.DELETE_RECIPE.valueOf(),
);

////////////// presentation_question
const n = 4;
const scheduleStart = [1, 1, 2, 3];
const scheduleEnd = [2, 3, 3, 4];

function maxPresentations(n, scheduleStart, scheduleEnd) {
  // Combine the start and end times into an array of time slots
  /* const timeSlots = [];
  for (let i = 0; i < n; i++) {
    timeSlots.push({ start: scheduleStart[i], end: scheduleEnd[i] });
  } */
  const timeSlots = scheduleStart.map((start, i) => ({ start, end: scheduleEnd[i] }));

  // Sort the time slots by their end times
  timeSlots.sort((a, b) => a.end - b.end);

  let maxPresentations = 0;
  let lastEndTime = 0;
  console.log('18 -- maxPresentations -- timeSlots: ', timeSlots);

  // Iterate through the sorted time slots and count the number of non-overlapping presentations
  for (let i = 0; i < n; i++) {
    const { start, end } = timeSlots[i];
    if (start >= lastEndTime) {
      maxPresentations++;
      lastEndTime = end;
    }
  }

  return maxPresentations;
}

const maxPresentationsAttended = maxPresentations(n, scheduleStart, scheduleEnd);
console.log('56 -- result: ', maxPresentationsAttended);
////////////// END presentation_question
