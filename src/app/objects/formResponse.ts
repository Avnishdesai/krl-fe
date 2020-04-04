import { Member } from './member';
import { Answer } from './answer';

export interface formResponse {
    member: Member
    date: Date
    answers: Answer[]
}