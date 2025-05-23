import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { css } from '_panda/css';

import GNB from '@/components/GNB/GNB';

import { ChoosePetSection } from './landing/ChoosePetSection';
import { Footer } from './landing/Footer';
import { RankingServerSide } from './landing/RankingSection/RankingServerSide';
import { AvailablePetSection, HavePetWaySection, MainSection } from './landing';

import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/react-flicking/dist/flicking-inline.css';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('page');

  return {
    title: t('main'),
  };
}

export default function HomePage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <div>
      <GNB />
      <MainSection />
      <RankingServerSide searchParams={searchParams} />
      <AvailablePetSection />
      <HavePetWaySection />
      <ChoosePetSection />
      <div className={css({ bg: 'black' })}>
        <Footer />
      </div>
    </div>
  );
}
