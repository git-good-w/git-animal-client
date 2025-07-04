'use client';

import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { ChevronLeft } from 'lucide-react';

import { Link } from '@/i18n/routing';

import QuizCreateForm from './_components/QuizCreateForm';

function CreateQuizPage() {
  const t = useTranslations('Quiz');

  return (
    <div className={containerStyle}>
      <div className={headingStyle}>
        <h1 className={titleStyle}>
          <Link href="/quiz">
            <ChevronLeft className={headingPrevButtonStyle} size={24} color="white" />
          </Link>
          {t('create-quiz-card-title')}
        </h1>
      </div>
      <QuizCreateForm />
    </div>
  );
}

export default CreateQuizPage;

const containerStyle = css({
  width: '100%',
  height: '100vh',
  padding: '12px 16px',
  backgroundColor: 'gray.gray_050',
});

const headingStyle = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '44px',
});

const headingPrevButtonStyle = css({
  position: 'absolute',
  top: '10px',
  left: '0',
  cursor: 'pointer',
});

const titleStyle = css({
  textStyle: 'glyph18.bold',
  fontFamily: 'Product Sans',
  fontWeight: 700,
  color: 'white',
});
