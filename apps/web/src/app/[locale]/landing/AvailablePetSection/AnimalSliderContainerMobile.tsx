'use client';

import React, { Children, useState } from 'react';
import { useRef } from 'react';
import Image from 'next/image';
import { css, cx } from '_panda/css';
import { Fade, Perspective } from '@egjs/flicking-plugins';
import type { ChangedEvent, FlickingOptions, FlickingProps } from '@egjs/react-flicking';
import Flicking from '@egjs/react-flicking';

import { sliderContainer } from '../MainSection/MainSlider.style';

function AnimalSliderContainerMobile({ children }: { children: React.ReactNode }) {
  const flicking = useRef<Flicking | null>(null);

  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);

  const isFirstPanel = currentPanelIndex === 0;
  const isLastPanel = Children.count(children) - 1 === currentPanelIndex;

  // TODO: arrow plugin을 사용
  const moveToNextPanel = async () => {
    if (!flicking.current) return;
    if (isLastPanel) return;
    if (flicking.current.animating) return;

    try {
      flicking.current.next();
    } catch (error) {}
  };

  const moveToPrevPanel = async () => {
    if (!flicking.current) return;
    if (isFirstPanel) return;
    if (flicking.current.animating) return;

    try {
      flicking.current.prev();
    } catch (error) {}
  };
  const onPanelChanged = (e: ChangedEvent<Flicking>) => {
    setCurrentPanelIndex(e.index);
  };
  const _plugins = [new Perspective({ rotate: 0.5, scale: 0.2 }), new Fade()];

  const sliderOptions: Partial<FlickingProps & FlickingOptions> = {
    onChanged: onPanelChanged,
    align: 'center',
    plugins: _plugins,
  };

  return (
    <div>
      <div className={cx(sliderContainer, 'slider-container')}>
        <ArrowButton onClick={moveToPrevPanel} direction="prev" disabled={isFirstPanel} />
        <ArrowButton onClick={moveToNextPanel} direction="next" disabled={isLastPanel} />
        <Flicking ref={flicking} {...sliderOptions}>
          {children}
        </Flicking>
      </div>
    </div>
  );
}

export default AnimalSliderContainerMobile;

function ArrowButton({
  onClick,
  direction,
  disabled,
}: {
  onClick: () => void;
  direction: 'prev' | 'next';
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        direction === 'prev' ? prevArrowStyle : nextArrowStyle,
        css({
          rotate: direction === 'prev' ? '180deg' : '0deg',
          cursor: disabled ? 'not-allowed' : 'pointer',
          width: disabled ? '36px' : '40px',
          height: disabled ? '36px' : '40px',
          _mobile: {
            width: disabled ? '24px' : '26px',
            height: disabled ? '24px' : '26px',
          },
        }),
      )}
    >
      {disabled ? (
        <Image src="/icon/circle-arrow-disable.svg" alt="arrow" width={36} height={36} />
      ) : (
        <Image src="/icon/circle-arrow.svg" alt="arrow" width={40} height={40} />
      )}
    </button>
  );
}

const arrowStyle = css({
  position: 'absolute',
  top: '0',
  bottom: '0',
  margin: 'auto',
  zIndex: 'floating',

  '& img': {
    width: '100%',
    height: '100%',
  },

  _mobile: {
    bottom: '0',
  },
});

const prevArrowStyle = cx(
  arrowStyle,
  css({
    left: '-62px',
    _mobile: {
      left: '8px',
    },
  }),
);

const nextArrowStyle = cx(
  arrowStyle,
  css({
    right: '-62px',
    _mobile: {
      right: '8px',
    },
  }),
);
