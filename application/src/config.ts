// these API keys are to limit all public access (so not insecure)
const defaultFlashcardUrl = "https://424f85w112.execute-api.eu-west-2.amazonaws.com/prod/flashcard"
const defaultFlashcardApiKey = "86VWlSEmEq8S34L8Rcm8c3EHnRN3gYtI33IZ2fvb"

export const config = {
  flashcardUrl: import.meta.env.VITE_FLASHCARD_URL || defaultFlashcardUrl,
  flashcardApiKey: import.meta.env.VITE_FLASHCARD_API_KEY || defaultFlashcardApiKey,
};
