import { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';

import useSaveChangedGroupsData from '@/views/List/hooks/useSaveChangedGroupedData';
import useSaveChangedStocksData from '@/views/List/hooks/useSaveChangedStocksData';
import useSaveChangedSoldsData from '@/views/List/hooks/useSaveChangedSoldData';
import useSaveChangedNotesData from '@/views/Note/hooks/useSaveChangedNotesData';

import Navbar from './NavBar/Navbar';
import Footer from './Footer';
import { useCheckMe } from './useCheckMe';
import useSyncUserData from './useSyncUserData';
import MainModal from './MainModal';
import Loading from './Loading';

interface GeneralLayoutProps {
  children: React.ReactNode;
}

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
  const [firstLoad, setFirstLoad] = useState(true);
  useCheckMe();
  useSyncUserData();

  useSaveChangedGroupsData(firstLoad);
  useSaveChangedStocksData(firstLoad);
  useSaveChangedSoldsData(firstLoad);
  useSaveChangedNotesData(firstLoad);

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  return (
    <StyledGeneralLayout>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <StyledMainLayout>{children}</StyledMainLayout>
      </Suspense>
      <MainModal />
      <Footer />
    </StyledGeneralLayout>
  );
};

export default GeneralLayout;

const StyledGeneralLayout = styled('div')`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 350px;
  max-width: 1800px;
  margin: auto;
`;

const StyledMainLayout = styled('main')`
  flex: 1 0 fit-content;
`;
