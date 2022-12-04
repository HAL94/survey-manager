import { Prisma, PrismaClient, QuestionType } from '@prisma/client';
import { SurveyAddBody } from './survey.model';
const prisma = new PrismaClient();

export async function findAllSurveys() {
  try {
    return await prisma.survey.findMany();
  } catch (error) {
    throw error;
  }
}

export async function findSurveyById(surveyId: number, includeObj = {}) {
  try {
    let conf: { include?: {}; where: { id: number } } = {
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
    return await prisma.survey.findUnique(conf);
  } catch (error) {
    throw error;
  }
}

export async function createSurveyQuestion(
  question: Prisma.QuestionCreateInput,
) {
  try {
    return await prisma.question.create({
      data: question,
    });
  } catch (error) {
    throw error;
  }
}

export async function createSurvey(surveyInput: SurveyAddBody) {
  try {
    const survey = await prisma.survey.create({
      data: {
        title: surveyInput.title,
        description: surveyInput.description,
      },
    });
    if (      
      typeof surveyInput.questions !== 'undefined' &&
      surveyInput.questions.length > 0
    ) {
      surveyInput.questions.forEach(async (q) => {
        const questionInput: Prisma.QuestionCreateInput = {
          isRequired: q.isRequired,
          title: q.title,
          type: q.type,
          Survey: {
            connect: {
              id: survey.id,
            },
          },
        };
        if (q.type === QuestionType.COMMENTQUESTION) {
          questionInput.CommentQuestion = {
            create: {
              comment: '',
            },
          };
        } else if (q.type === QuestionType.RADIOGROUP) {
          questionInput.RadioQuestion = {
            create: {
              choices: q.choices,
            },
          };
        }
        await createSurveyQuestion(questionInput);
      });
    }
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
