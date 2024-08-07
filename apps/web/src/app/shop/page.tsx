'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styled, { createGlobalStyle } from 'styled-components';

import DottedThreeBox from '@/components/DottedBox/DottedThreeBox';
import Header from '@/components/Layout/Header';

import GotchaSection from './GotchaSection';
import HistoryTable from './HistoryTable';
import { Point } from './Point';
import ProductTable from './ProductTable';
import Search from './Search';
import SellListSection from './SellListSection';
import SellSection from './SellSection';
import Tab from './Tab';

// TODO: 판다 이용한 방법으로 변경 필요
const TempGloablStyle = createGlobalStyle`
body {
  background-color: rgba(0, 0, 0, 0.75);
}`;

// TODO: 폴더정리 필요
function ShopPage() {
  const searchParam = useSearchParams();
  const tab = searchParam?.get('tab') || 'products';

  const [searchPersona, setSearchPersona] = useState<string>();

  const onSearch = (personaType?: string) => {
    setSearchPersona(personaType);
  };

  return (
    <>
      <TempGloablStyle />

      <HeaderStyled>
        <Header />
      </HeaderStyled>
      <Main>
        <DottedThreeBox width={1412} height={824} bgColor="#FFA109">
          <ShopMain>
            <TopSection>
              <Heading>Git Animals Auction</Heading>
            </TopSection>

            <TabSection>
              <TabInnerWrapper>
                <Tab selectedTab={tab} />
                {(tab === 'products' || tab === 'history') && <Search onSelect={onSearch} selected={searchPersona} />}
              </TabInnerWrapper>

              <Suspense>
                <Point />
              </Suspense>
            </TabSection>

            <GotchaSection />
            <section style={{ height: '655px' }}>
              {tab === 'products' && <ProductTable searchPersona={searchPersona} />}
              {tab === 'history' && <HistoryTable searchPersona={searchPersona} />}
              {tab === 'sell' && <SellSection />}
              {tab === 'sellList' && <SellListSection />}
            </section>
          </ShopMain>
        </DottedThreeBox>
      </Main>
    </>
  );
}

export default ShopPage;

const TabSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 24px;
`;

const TabInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const HeaderStyled = styled.div`
  height: 70px;
  .header {
    max-width: 1460px;
  }
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-width: fit-content;
  min-height: calc(100vh - 100px);
`;

const TopSection = styled.section`
  margin-bottom: 30px;
  display: flex;
  gap: 120px;
`;

const Heading = styled.h1`
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 44.8px */
  letter-spacing: -0.3px;
`;

const ShopMain = styled.main`
  padding: 40px 20px;
  display: grid;
  grid-template-columns: 384px 960px;
  grid-column-gap: 16px;
`;
