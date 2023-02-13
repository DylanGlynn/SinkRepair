import { getRequests, deleteRequest, getPlumbers, saveCompletion, getCompletions, updateRequest } from "./dataAccess.js"

const convertRequestToListElement = (request) => {
    let completedRequest = ``
    let visibility = ``
    const completions = getCompletions()
    completions.map(completion => {
        if (request.id === completion.requestId) {
            completedRequest = `class="completedRequest"`
            visibility = `id="visibilityHidden"`
        }
    })
    return `<tr ${completedRequest} id="requestTable__row" value="${request.id}">
                <td class="description">${request.description}</td>
                <td class="completedBy" ${visibility}>${convertPlumbersToInputSelect(request)}</td>
                <td class="deleteButton">
                    <button class="request__delete" id="request--${request.id}">
                        Delete
                    </button>
                </td>
            </tr>
`
}

export const Requests = () => {
    let requests = getRequests()
    let html = requests.map(convertRequestToListElement).sort().join("")
    return html
}

const mainContainer = document.querySelector(".container")

const convertPlumbersToInputSelect = (request) => {
    let html = ``
    html = `<select class="plumbers" id="plumbers"><option value="">Choose</option>`
    getPlumbers().map(plumber => {
        html += `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
    }).join("")
    html += `</select>`
    return html
}

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = { "requestId": parseInt(requestId), "plumberId": parseInt(plumberId), "timestamp": Date.now() }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completion)
        }
    })

const convertCompletionsToListElement = (completion) => {
    const plumbers = getPlumbers()
    const requests = getRequests()
    let plumberCompleted = null
    let requestCompleted = null
    for (const plumber of plumbers) {
        if (parseInt(completion.plumberId) === plumber.id) {
            plumberCompleted = plumber.name
        }
        for (const request of requests) {
            if (parseInt(completion.requestId) === request.id) {
                requestCompleted = request.description
            }
        }
    }
    return `<li>Request ${completion.requestId} (${requestCompleted}) has been completed by ${plumberCompleted}.</li>`
}

export const Completions = () => {
    const completions = getCompletions()
    let html = `<ul>${completions.map(convertCompletionsToListElement).join("")}</ul>`
    return html
}
