import { PrismaClient } from '@prisma/client';
import { SurveyInput } from './survey.validation';
const prisma = new PrismaClient();

export async function findAllSurveys() {
  try {
    return await prisma.survey.findMany();
  } catch (error) {
    throw error;
  }
}

export async function findSurveyById(surveyId: number, includeObj: any = {}) {
  try {
    let conf: { include?: any; where: { id: number } } = {
      where: { id: surveyId },
    };
    if (Object.keys(includeObj).length > 0) {
      conf = {
        ...conf,
        include: {
          ...includeObj,
        },
      };
    }
    const survey = await prisma.survey.findUnique(conf);
    if (!survey) {
      throw new Error(`Cannot find survey with id ${surveyId}`);
    }
    return survey;
  } catch (error) {
    throw error;
  }
}

export async function createSurvey(surveyInput: SurveyInput) {
  try {
    const survey = await prisma.survey.create({
      data: {
        title: surveyInput.title,
        description: surveyInput.description,
      },
    });
    // if (
    //   typeof surveyInput.questions !== 'undefined' &&
    //   surveyInput.questions.length > 0
    // ) {
    //   surveyInput.questions.forEach(async (q) => {
    //     const questionInput: Prisma.QuestionCreateInput = {
    //       isRequired: q.isRequired,
    //       title: q.title,
    //       type: q.type,
    //       Survey: {
    //         connect: {
    //           id: survey.id,
    //         },
    //       },
    //     };
    //     if (q.type === QuestionType.COMMENTQUESTION) {
    //       questionInput.CommentQuestion = {
    //         create: {
    //           comment: '',
    //         },
    //       };
    //     } else if (q.type === QuestionType.RADIOGROUP) {
    //       questionInput.RadioQuestion = {
    //         create: {
    //           choices: q.choices,
    //         },
    //       };
    //     }
    //     await createSurveyQuestion(questionInput);
    //   });
    // }
    return survey;
  } catch (error) {
    throw error;
  }
}

export async function deleteSurveyQuestion(questionId: string) {
  try {
    return await prisma.question.delete({
      where: {
        id: questionId,
      },
    });
  } catch (error) {
    throw error;
  }
}
