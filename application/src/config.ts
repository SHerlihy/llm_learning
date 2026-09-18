// these API keys are to limit all public access (so not insecure)
const defaultFlashcardUrl = "https://g1lqz6n0al.execute-api.eu-west-2.amazonaws.com/prod/flashcard"
const defaultFlashcardApiKey = "9UqGEm7eMU5n0KUWdbAFo5H9uwlIkt7Z8856Vusc"

export const config = {
  flashcardUrl: import.meta.env.VITE_FLASHCARD_URL || defaultFlashcardUrl,
  flashcardApiKey: import.meta.env.VITE_FLASHCARD_API_KEY || defaultFlashcardApiKey,
};
