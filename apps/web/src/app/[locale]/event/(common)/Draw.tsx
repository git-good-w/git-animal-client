'use client';

import { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { CustomException } from '@gitanimals/exception';
import { useOutsideClick } from '@gitanimals/react';
import { couponQueries, renderQueries, useUsingCoupon } from '@gitanimals/react-query';
import { Button } from '@gitanimals/ui-panda';
import { wrap } from '@suspensive/react';
import { useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import type { Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';

import { sendMessageToErrorChannel } from '@/apis/slack/sendMessage';
import { login } from '@/components/AuthButton';
import { GIT_ANIMALS_MAIN_URL } from '@/constants/outlink';
import { Link, useRouter } from '@/i18n/routing';
import { trackEvent } from '@/lib/analytics';

interface DrawProps {
  renderCard: (type: string) => React.ReactNode;
  bonusEventCode: string;
  baseEventCode: string;
}

export const Draw = wrap.Suspense().on(({ renderCard, bonusEventCode, baseEventCode }: DrawProps) => {
  const queryClient = useQueryClient();
  const t = useTranslations('Event.Halloween');

  const { eventCode } = useParams();

  if (Array.isArray(eventCode)) {
    throw new CustomException('UNKNOWN_ERROR', 'eventCode is not string');
  }

  const { data: session } = useSession();
  const { mutate: usingCoupon, isPending } = useUsingCoupon();

  const [drawedPet, setDrawedPet] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const isStarBonusEvent = eventCode === bonusEventCode;
  const upperCaseEventCode = eventCode.toUpperCase();

  const onClickOutside = () => {
    setDrawedPet(null);
  };

  useOutsideClick(modalRef, onClickOutside);

  const { data: usedCoupons, isLoading: isLoadingUsedCoupons } = useQuery({
    ...couponQueries.usedCouponsOptions(),
    enabled: Boolean(session),
  });

  const isUsedCoupon = usedCoupons?.coupons.some((coupon) => coupon.code === upperCaseEventCode);

  const onClickDraw = () => {
    if (!session) {
      login(`/event/${baseEventCode}`);
      trackEvent(baseEventCode, {
        type: 'not-signed-in',
        coupon: upperCaseEventCode,
      });

      return;
    }

    usingCoupon(
      { code: upperCaseEventCode },
      {
        onSuccess: (res) => {
          trackEvent(baseEventCode, {
            type: 'success',
            pet: res.result,
            coupon: upperCaseEventCode,
          });
          setDrawedPet(res.result);
          queryClient.invalidateQueries({ queryKey: couponQueries.usedCouponsKey() });
        },
        onError: (error) => {
          toast.error(t('draw-error'));
          sendMessageToErrorChannel(
            `이벤트 실패, 이벤트 코드: ${upperCaseEventCode}, 사용자: ${session.user?.name}\n${error.message} ${error.name}`,
          );
          trackEvent(baseEventCode, {
            type: 'error',
            coupon: upperCaseEventCode,
          });
        },
      },
    );
  };

  const drawButtonText = (() => {
    if (!session) {
      return t('draw-button-not-signed-in');
    }

    if (isStarBonusEvent) {
      return t('draw-more-button');
    }

    return t('draw-button');
  })();

  return (
    <>
      <Button
        disabled={isPending || isLoadingUsedCoupons || isUsedCoupon}
        className={buttonStyle}
        onClick={onClickDraw}
      >
        {drawButtonText}
      </Button>

      <AnimatePresence mode="wait">
        {drawedPet && (
          <div className={fixedStyle} ref={modalRef}>
            <motion.div className={modalStyle} variants={modalVariants} initial="initial" animate="animate" exit="exit">
              <span className={resultTitleStyle}>{t('result-title')}</span>
              {renderCard(drawedPet)}

              <Link href="/mypage" className={resultAnchorStyle}>
                {t('result-apply')}
              </Link>

              <StarAnchor bonusEventCode={bonusEventCode} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
});

const modalVariants: Variants = {
  initial: { opacity: 0, scale: 0.1 },
  animate: {
    opacity: [0, 1, 1],
    scale: [0.1, 0.2, 1.15, 1],
    transition: {
      scale: {
        duration: 1.2,
        times: [0, 0.3, 0.6, 1],
        ease: ['easeOut', 'easeOut', 'easeInOut'],
      },
    },
  },
  exit: { opacity: 0, scale: 0.9 },
};

const buttonStyle = css({ width: '230px', height: '76px', margin: '63px auto 0', textStyle: 'glyph28.bold' });

const fixedStyle = css({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 'drawer',
});

const modalStyle = css({
  padding: '24px',
  backgroundColor: 'gray.gray_150',
  borderRadius: '16px',
  color: 'white',

  minWidth: '400px',
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const resultTitleStyle = css({ textStyle: 'glyph28.bold', marginBottom: '20px' });

const resultAnchorStyle = css({
  textStyle: 'glyph16.bold',
  marginTop: '24px',
  marginBottom: '12px',
  cursor: 'pointer',
  textDecoration: 'underline',
});

const StarAnchor = wrap
  .ErrorBoundary({ fallback: null })
  .Suspense()
  .on(({ bonusEventCode }: { bonusEventCode: string }) => {
    const t = useTranslations('Event.Halloween');
    const router = useRouter();

    const { data: session } = useSession();
    const { eventCode } = useParams();

    if (!session?.user.name) {
      throw new CustomException('UNKNOWN_ERROR', 'session.user.name is undefined');
    }

    const {
      data: { isPressStar },
    } = useSuspenseQuery(renderQueries.isPressStar({ login: session.user.name }));

    const isStarBonusEvent = eventCode === bonusEventCode;

    const onClickFirstEvent = () => {
      router.replace(`/event/${bonusEventCode}`);
    };

    if (isStarBonusEvent) {
      return null;
    }

    if (isPressStar) {
      return (
        <Button>
          <Link href={`/event/${bonusEventCode}`}>{t('result-already-star')}</Link>
        </Button>
      );
    }

    return (
      <Button>
        <a href={GIT_ANIMALS_MAIN_URL} target="_blank" onClick={onClickFirstEvent}>
          {t('result-star-again')}
        </a>
      </Button>
    );
  });
