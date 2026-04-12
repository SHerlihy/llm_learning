type QueryResponse = Response
type FlashcardRequestVariables = {
    keyword: string,
    definition: string,
    submission: string
    version?: string
}

interface IQueryControl {
    postQuery: (requestVariables: FlashcardRequestVariables) => Promise<QueryResponse>
    demarshall: (res: QueryResponse) => Promise<string>
    abortQuery: (reason?: any) => void
}

class QueryControl implements IQueryControl {
    controller = new AbortController()

    postUrl: string;

    constructor(postUrl: string) {
        this.postUrl = postUrl
    }

    postQuery = async (requestVariables: FlashcardRequestVariables): Promise<QueryResponse> => {

        this.controller = new AbortController()

        const response = await this.queryRequest(requestVariables)

        if (response.status !== 200) {
            throw Error(`Query status: ${response.status}`)
        }

        return response
    }

    demarshall = async (queryRes: QueryResponse) => {
        return await queryRes.text()
    }

    abortQuery = (reason?: any) => {
        this.controller.abort(reason)
    }

    queryRequest = async (requestVariables: FlashcardRequestVariables) => {
        const body = JSON.stringify(requestVariables)

        return await fetch(this.postUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "cors",
            signal: this.controller.signal,
            body: body
        })
    }
}

export default QueryControl
