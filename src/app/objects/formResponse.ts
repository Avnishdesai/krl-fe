import { Member } from './member';
import { Answer } from './answer';

export interface FormResponse {
    memberId: number
    date: Date
    answerIds: number[]
}