import { getQuestionOptionById } from '../question-option/question-option.service';
import {
  createQuestionAnswer,
  deleteQuestionAnswer,
  findAllQuestionOptions,
  findQuestionAnswerById,
  updateQuestionAnswer,
} from './question-answer.dal';
import { QuestionAnswerInput } from './question-answer.validation';

export async function addQuestionAnswer(input: QuestionAnswerInput) {
  try {
    const option = await getQuestionOptionById(input.qoid);
    if (option.value !== input.answer) {
      throw new Error(`Answer passed: "${input.answer}" is not equal to option value: "${option.value}"`);
    }
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

export async function getAllQuestionsOptions(qid: string) {
  try {
    return await findAllQuestionOptions(qid);
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
