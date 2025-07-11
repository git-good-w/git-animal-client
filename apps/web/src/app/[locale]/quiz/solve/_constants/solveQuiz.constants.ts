export const QUIZ_STATUS = {
  NOT_STARTED: 'NOT_STARTED',
  SOLVING: 'SOLVING',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
  DONE: 'DONE',
} as const;

export type QuizStatus = (typeof QUIZ_STATUS)[keyof typeof QUIZ_STATUS];

export const QUIZ_ANSWER = {
  YES: 'YES',
  NO: 'NO',
} as const;

export type QuizAnswer = (typeof QUIZ_ANSWER)[keyof typeof QUIZ_ANSWER];
