'use client';

import { memo } from 'react';
import Image from 'next/image';
import { css } from '_panda/css';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';

import { MediaQuery } from '@/components/MediaQuery';

export const Background = memo(function Background() {
  return (
    <>
      <MediaQuery
        desktop={
          <div className={floatingBackgroundDivCss}>
            <motion.div className={coinCss} variants={coinVariants} animate="floating">
              <Image width={188} height={191} src="/shop/coin.webp" alt="coin" />
            </motion.div>

            <motion.div className={carrotCss} variants={carrotVariants} animate="floating">
              <Image width={313} height={316} src="/shop/carrot.webp" alt="carrot" />
            </motion.div>
          </div>
        }
      />

      <MediaQuery
        desktop={
          <div className={backgroundDivCss}>
            <Image width={2802} height={354} src="/shop/land.webp" alt="land" />
            <Image width={2802} height={354} src="/shop/land.webp" alt="land" />
          </div>
        }
        mobile={
          <div className={backgroundDivCss}>
            <Image width={750} height={140} src="/shop/land-m.webp" alt="land" />
            <Image width={750} height={140} src="/shop/land-m.webp" alt="land" />
          </div>
        }
      />
    </>
  );
});

const floatingBackgroundDivCss = css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 'base',
});

const coinCss = css({
  position: 'absolute',
  width: 'fit-content',
  top: '860px',
  left: '80px',
});

const coinVariants: Variants = {
  floating: {
    x: [0, -2, 6, 2, 0],
    y: [0, -10, 12, -8, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

const carrotCss = css({
  position: 'absolute',
  width: 'fit-content',
  top: '300px',
  right: '86px',
});

const carrotVariants: Variants = {
  floating: {
    x: [0, 4, -5, 6, -3, 0],
    y: [0, 6, -12, 2, 8, 0],
    transition: {
      duration: 7,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

const backgroundDivCss = css({
  position: 'absolute',
  zIndex: 'base',
  bottom: 0,
  left: 0,
  w: '100%',
  h: '354px',
  overflow: 'hidden',

  _mobile: {
    h: '70px',
  },

  '& img': {
    position: 'absolute',
    maxWidth: 'unset',
    height: '100%',
    objectFit: 'contain',

    _mobile: {
      width: 'auto',
      height: '70px',
    },
  },

  '& img:first-of-type': {
    animation: `slide 60s linear infinite`,
  },

  '& img:last-of-type': {
    left: '454px', // NOTE: 2px은 깨지는 부분이 존재해 당김
    animation: `slide 60s linear infinite`,
  },
});
