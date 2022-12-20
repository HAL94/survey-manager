import { QType } from '@prisma/client';
import { ANSWER_VALIDATION } from '../../utils/question-types';

import { getQuestionById } from '../questions/question.service';

import {
  createQuestionAnswer,
  deleteQuestionAnswer,
  findQuestionAnswerById,
  getQuestionAnswerByQid,
  updateQuestionAnswer,
} from './question-answer.dal';
import { QuestionAnswerInput } from './question-answer.validation';

export async function validateAnswerInput(input: QuestionAnswerInput) {
  try {
    console.log('validating input w/ val:', input.answer);
    const question = await getQuestionById(input.qid);
    const type = question.QuestionType.type;
    if (
      type.startsWith('TEXT') ||
      type === QType.COMMENT ||
      type === QType.RADIO ||
      type === QType.DROPDOWN ||
      type === QType.BOOLEAN
    ) {
      const opt = await getQuestionAnswerByQid(input.qid);
      if (opt !== null) {
        throw new Error(
          'Cannot add a new answer to any of the following types: \n["COMMENT", "RADIO", "DROPDOWN", "BOOLEAN", "TEXT", "TEXT_EMAIL", "TEXT_URL", "TEXT_PASSWORD", "TEXT_DATE", "TEXT_NUMBER","TEXT_TEL"]',
        );
      }
    }

    await ANSWER_VALIDATION[type.toString()].parseAsync(input.answer);
  } catch (error) {
    throw error;
  }
}

export async function addQuestionAnswer(input: QuestionAnswerInput) {
  try {
    await validateAnswerInput(input);
    return await createQuestionAnswer({
      qid: input.qid,
      qoid: +input.qoid,
      answer: input.answer,
    });
  } catch (error) {
    throw error;
  }
}

export async function getQuestionAnswerById(qaid: number) {
  try {
    return await findQuestionAnswerById(qaid);
  } catch (error) {
    throw error;
  }
}

export async function getAllQuestionsAnswers(qid: string) {
  try {
    return await getQuestionAnswerByQid(qid, 'findMany');
  } catch (error) {
    throw error;
  }
}

export async function removeQuestionAnswer(qaid: number) {
  try {
    return await deleteQuestionAnswer(qaid);
  } catch (error) {
    throw error;
  }
}

export async function updateQuestionAns(qaid: number, answer: string) {
  try {
    return await updateQuestionAnswer(qaid, answer);
  } catch (error) {
    throw error;
  }
}
