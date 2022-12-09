import {
  createQuestionType,
  findAllQuestionTypes,
  findQuestionTypeById,
} from './question-type.dal';
import { QuestionTypeInput } from './question-type.validation';

export async function addQuestionType(input: QuestionTypeInput) {
  try {
    return await createQuestionType(input);
  } catch (error) {
    throw error;
  }
}

export async function getQuestionTypeById(qtid: string) {
  try {
    return await findQuestionTypeById(qtid);
  } catch (error) {
    throw error;
  }
}

export async function getAllQuestionsTypes() {
  try {
    return await findAllQuestionTypes();
  } catch (error) {
    throw error;
  }
}
