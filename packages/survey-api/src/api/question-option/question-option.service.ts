import { QType } from '@prisma/client';
import { getQuestionById } from '../questions/question.service';
import {
  createQuestionOption,
  deleteQuestionOption,
  findAllQuestionOptions,
  findQuestionOptionById,
  getManyQuestionOptionByQid,
  getQuestionOptionByQid,
  updateQuestionOption,
} from './question-option.dal';

import { QuestionOptionInput } from './question-option.validation';

export async function validateOptionInput(input: QuestionOptionInput) {
  try {
    const question = await getQuestionById(input.qid);
    const type = question.QuestionType.type;
    if (type.startsWith('TEXT') || type === QType.COMMENT) {
      const opt = await getQuestionOptionByQid(input.qid);
      if (opt !== null) {
        throw new Error('Cannot add a new option to a text or comment question');
      }
    } else if (type === QType.BOOLEAN) {
      const opts = await getManyQuestionOptionByQid(input.qid);
      if (opts.length === 2) {
        throw new Error('Cannot add a new option to boolean question');
      }
    }
  } catch (error) {
    throw error;
  }
}

export async function addQuestionOption(input: QuestionOptionInput) {
  try {
    await validateOptionInput(input);
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
