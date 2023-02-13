import { ServiceForm } from "./ServiceForm.js"
import { Requests, Completions } from "./Requests.js"

export const SinkRepair = () => {
    return `
        <h1>Maude and Merle's Sink Repair</h1>
        <section class="serviceForm">
            ${ServiceForm()}
        </section>

        <section class="serviceRequests">
            <h2>Service Requests</h2>
            <table class="serviceRequests__list">
                <thead class="serviceRequests__header">
                    <tr>
                        <th scope="col" class="description">Description</th>
                        <th scope="col" class="completedBy">Completed by</th>
                        <th scope="col" class="deleteButton"></th>
                    </tr>
                </thead>
                <tbody class="serviceRequests__list-body">
                    ${Requests()}
                </tbody>
            </table>
        </section>
    `
}
