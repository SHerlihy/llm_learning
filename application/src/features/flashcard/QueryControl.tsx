import { z } from 'zod';

import { config } from "@/config";

const AnswerSchema = z.object({
  answer: z.string()
});

const ApiResponseSchema = z.instanceof(Response)

type ApiResponse = z.infer<typeof ApiResponseSchema>

const QUERY_URL = new URL(config.flashcardUrl);

type FlashcardRequestVariables = {
    keyword: string,
    definition: string,
    submission: string
    version?: string
}

interface IQueryControl {
    postQuery: (requestVariables: FlashcardRequestVariables) => Promise<string>
    abortQuery: (reason?: any) => void
}

class QueryControl implements IQueryControl {
    controller = new AbortController()

    constructor() {}

    postQuery = async (requestVariables: FlashcardRequestVariables): Promise<string> => {
        let response: ApiResponse;

        this.controller = new AbortController()

        try {

        const body = JSON.stringify(requestVariables)

        response = await fetch(QUERY_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "X-API-Key": config.flashcardApiKey,
            },
            mode: "cors",
            signal: this.controller.signal,
            body: body
        })

        ApiResponseSchema.parse(response)
        } catch (err) {
          throw err
        }

        if (response.status !== 200) {
            throw Error(`Query status: ${response.status}`)
        }

        let answer: string;
        try{
          const body = await response.json()
          AnswerSchema.parse(body)
          answer = body.answer
        } catch(err){
          throw err
        }

        return answer
    }

    abortQuery = (reason?: any) => {
        this.controller.abort(reason)
    }
}

export default QueryControl
