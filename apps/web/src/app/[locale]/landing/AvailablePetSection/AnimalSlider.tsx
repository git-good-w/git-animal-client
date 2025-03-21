'use client';

import { css, cx } from '_panda/css';

import { AnimalCard } from '@/components/AnimalCard';
import { MediaQuery } from '@/components/MediaQuery';
import { PerspectiveCenterSlider } from '@/components/Slider';
import { useGetAllPersona } from '@/hooks/query/render/useGetAllPersona';

import * as styles from './AnimalSlider.style';
import AnimalSliderContainerMobile from './AnimalSliderContainerMobile';

interface Animal {
  type: string;
  dropRate: string;
}

function shuffle(array: Animal[]): Animal[] {
  return array.sort(() => Math.random() - 0.5);
}

function AnimalSlider() {
  const { data } = useGetAllPersona({
    staleTime: 1000 * 60 * 60 * 24,
  });

  const ANIMAL_LIST = shuffle(data.personas);

  const animalList: Animal[][] = data.personas.reduce<Animal[][]>((acc, _, idx) => {
    if (idx % 12 === 0) {
      acc.push(ANIMAL_LIST.slice(idx, idx + 12));
    }
    return acc;
  }, []);

  // TODO: 화면 크기가 바뀌면 (breakpoint에 도달하면 slider 다시 렌더링)
  return (
    <div className={cx(containerStyle)}>
      <MediaQuery
        desktop={
          <PerspectiveCenterSlider>
            {animalList.map((animalList: Animal[], idx) => {
              return (
                <div key={idx}>
                  <div className={styles.cardContainer}>
                    {animalList.map((animal: Animal, index: number) => (
                      <AnimalCard key={index} type={animal.type} dropRate={animal.dropRate} />
                    ))}
                  </div>
                </div>
              );
            })}
          </PerspectiveCenterSlider>
        }
        mobile={
          <AnimalSliderContainerMobile>
            {data.personas.map((animalList: Animal, idx) => {
              return (
                <div key={idx} className={styles.cardContainerMobile}>
                  <AnimalCard type={animalList.type} dropRate={animalList.dropRate} />
                </div>
              );
            })}
          </AnimalSliderContainerMobile>
        }
      />
    </div>
  );
}

export default AnimalSlider;

const containerStyle = css({
  width: '1120px',
  height: '1024px',

  '@media (max-width: 1200px)': {
    width: '835px',
  },

  '@media (max-width: 900px)': {
    width: '530px',
  },
  '@media (max-width: 600px)': {
    width: 'calc(100vw - 40px)',
    height: '325px',
    position: 'relative',
  },
});
