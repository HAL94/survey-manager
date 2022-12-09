import {
  createQuestionOption,
  deleteQuestionOption,
  findAllQuestionOptions,
  findQuestionOptionById,
  updateQuestionOption,
} from './question-option.dal';
import { QuestionOptionInput } from './question-option.validation';

export async function addQuestionOption(input: QuestionOptionInput) {
  try {
    return await createQuestionOption(input);
  } catch (error) {
    throw error;
  }
}

export async function getQuestionOptionById(qoid: number) {
  try {
    return await findQuestionOptionById(qoid);
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

export async function removeQuestionOption(qoid: number) {
  try {
    return await deleteQuestionOption(qoid);
  } catch (error) {
    throw error;
  }
}

export async function updateQuestionOpt(qoid: number, value: string) {
  try {
    return await updateQuestionOption(qoid, value);
  } catch (error) {
    throw error;
  }
}
