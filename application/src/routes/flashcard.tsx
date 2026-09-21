import FlashcardPage from '@/pages/FlashcardPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/flashcard')({
    component: FlashcardPage,
  validateSearch: (search: Record<string, unknown>): { selected: number } => {
    if (search.selected === undefined) {
      search.selected = 0;
    }
    // validate and parse the search params into a typed state
    if (
      typeof search.selected !== "string" &&
      typeof search.selected !== "number"
    ) {
      throw new TypeError("Search parameter needs to be string or number");
    }

    let selected = search.selected;

    if (typeof selected === "string") {
      selected = parseInt(selected);
    }

    return {
      selected: selected,
    };
  },
});
