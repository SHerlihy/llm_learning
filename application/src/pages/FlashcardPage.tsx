import { Button } from '@/components/ui/button'
import { nameToResource } from '@/content'
import { useSearch } from '@tanstack/react-router'
import { useState } from 'react'
import FlashcardGrader from './FlashcardGrader'

const FlashcardPage = () => {
    const { resourceName } = useSearch({ from: '/flashcard' })
    const resource = nameToResource[resourceName]

    const flashcards = resource.flashcards
    const flashcardsAmount = Object.entries(flashcards).length

    if (flashcardsAmount < 1) {
        return <p>Sorry, no flashcards for {resourceName}</p>
    }

    const flashcardsArr = Object.entries(flashcards)
        .sort(() => Math.random() - 0.5);

    return (
        <FlashcardSelection flashcardsArr={flashcardsArr} />
    )
}

type Props = {
    flashcardsArr: string[][],
}

const FlashcardSelection = ({
    flashcardsArr
}: Props) => {
    const [flashcardIdx, setFlashcardIdx] = useState(0)
    const [reveal, setReveal] = useState(false)

    const goBack = () => {
        setFlashcardIdx((prev) => {
            setReveal(false)
            if (prev < 1) {
                return flashcardsArr.length - 1
            }

            return prev - 1
        })
    }

    const goForward = () => {
        setFlashcardIdx((prev) => {
            setReveal(false)
            const nextIdx = prev + 1
            if (nextIdx > flashcardsArr.length - 1) {
                return 0
            }

            return nextIdx
        })
    }

    const toggleAnswer = () => {
        setReveal((prev) => !prev)
    }

    return (
        <article className='h-full w-full p-4 flex flex-col'>
            <section className='flex flex-col items-center'>
                <p>
                    The keyword is:
                </p>
                <h2>
                    {flashcardsArr[flashcardIdx][0]}
                </h2>
                <p
                    className={`
${reveal && 'visible'}
${!reveal && 'invisible'}
`}
                >
                    {flashcardsArr[flashcardIdx][1]}
                </p>
            </section>
            <hr/>
                <section className='grow'>

                    <FlashcardGrader
                        keyword={flashcardsArr[flashcardIdx][0]}
                        definition={flashcardsArr[flashcardIdx][1]}
                    />
                </section>
                <section
                    className='flex flex-col items-center'
                >
                    <div className='flex'>
                        <Button
                            onClick={goBack}
                        >
                            Back
                        </Button>
                        <Button
                            onClick={toggleAnswer}
                        >
                            {reveal ? 'hide' : 'show'}
                        </Button>
                        <Button
                            onClick={goForward}
                        >
                            Next
                        </Button>
                    </div>
                </section>
        </article>
    )
}

export default FlashcardPage
