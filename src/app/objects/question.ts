import {Answer} from "./answer"
import {Round} from "./round"

export interface Question{
    id: number
    description: string
    round: Round
    answers: Answer[]
}