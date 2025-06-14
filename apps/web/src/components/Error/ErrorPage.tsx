import type { ReactNode } from 'react';
import { css } from '_panda/css';
import { Button } from '@gitanimals/ui-panda';

interface Props {
  heading: string;
  paragraph?: ReactNode;
  onClickButton?: () => void;
  /**
   * @default "Retry"
   */
  buttonText?: string;
  // TODO: Error page 다시
  secondButtonElement?: ReactNode;
}

export function ErrorPage({ heading, paragraph, onClickButton, buttonText = 'Retry', secondButtonElement }: Props) {
  return (
    <main className={mainCss}>
      <h1 className={h1Css}>{heading}</h1>
      {paragraph && <div className={pCss}>{paragraph}</div>}
      <div className={buttonCss}>
        {onClickButton && <Button onClick={onClickButton}>{buttonText}</Button>}
        {secondButtonElement}
      </div>
    </main>
  );
}

const buttonCss = css({
  display: 'flex',
  justifyContent: 'center',
  w: '100%',
  gap: '16px',
});

const mainCss = css({
  backgroundColor: 'white',
  w: '100dvw',
  h: '100dvh',
  textStyle: 'glyph16.regular',
  padding: '0 16px',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const h1Css = css({
  textStyle: 'glyph40.bold',
  marginBottom: '12px',
});

const pCss = css({
  marginBottom: '32px',
  '& a': {
    textDecoration: 'underline',
    color: 'blue',
  },
});
