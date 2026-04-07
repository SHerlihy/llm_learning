import QueryControl from "@/features/flashcard/QueryControl"
import QueryModel from "@/features/flashcard/QueryModel"
import { catchError } from "@/lib/async"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"

const queryClient = new QueryClient()

const QUERY_URL = "https://yobowczw08.execute-api.eu-west-2.amazonaws.com/main/flashcard/"

const { postQuery, demarshall, abortQuery } = new QueryControl(QUERY_URL)

type Props = {
    keyword: string,
    definition: string
}

const FlashcardGrader = ({
    keyword,
    definition
} : Props) => {
    const [chat, setChat] = useState<string[]>([])
    const chatBoxRef = useRef<HTMLDivElement>(null)

    const handlePostQuery = async (query: string) => {
        const [error, response] = await catchError(postQuery({
            keyword: keyword,
            definition: definition,
            submission: query
        }))

        if (error) {
            throw error
        }

        const answer = await demarshall(response)

        setChat((prev) => [...prev, query, answer])
    }

    useEffect(() => {
        const chatBox = chatBoxRef.current

        if (!chatBox) { return }

        const answers = chatBox.children

        if (answers.length < 1) { return }

        const currentAnswer = answers.item(answers.length - 1)

        currentAnswer?.scrollIntoView()
    })

    return (
        <article className="h-full p-4 flex flex-col justify-between">
            <div
                className="flex-1 overflow-scroll p-4 scroll-p-20"
            >
                <div
                    ref={chatBoxRef}
                    className="min-h-full whitespace-pre-line flex flex-col justify-center align-center overflow-scroll">
                    {chat.map((utter, i) => <div key={i}>
                        &nbsp;
                        <hr />
                        &nbsp;
                        <p
                            className={`
                        ${i % 2 === 0 && "text-right"}
                    `}
                        >
                            {utter}
                        </p>
                    </div>
                    )}
                </div>
            </div>
            <div className="py-4">
                <hr className="pb-4" />
                <QueryClientProvider client={queryClient}>
                    <QueryModel
                        postQuery={handlePostQuery}
                        abortQuery={abortQuery}
                    />
                </QueryClientProvider>
            </div>
        </article>
    )
}

export default FlashcardGrader
