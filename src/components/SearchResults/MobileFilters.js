import React, { useContext, useCallback } from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import Icon from '@leafygreen-ui/icon';
import { palette } from '@leafygreen-ui/palette';
import useStickyTopValues from '../../hooks/useStickyTopValues';
import { theme } from '../../theme/docsTheme';
import SearchContext from './SearchContext';
import SearchFilters from './SearchFilters';
import { Facets } from './Facets';

// Temporarily apply this css rule to prevent body scrolling only while
// this component is mounted.
const disableBodyScroll = css`
  body {
    overflow: hidden;
  }
`;

const Container = styled('div')`
  background-color: ${palette.white};
  position: fixed;
  left: 0;
  top: ${({ topValue }) => topValue};
  height: calc(100vh - ${({ topValue }) => topValue});
  overflow-y: scroll;
  right: 0;
  bottom: 0;
  width: 100%;
  padding: ${theme.size.large} ${theme.size.medium};
  z-index: 1;
`;

const BackButton = styled('div')`
  align-items: center;
  color: ${palette.gray.dark1};
  cursor: pointer;
  display: flex;
  gap: 0 ${theme.size.small};
`;

const Label = styled('div')`
  font-size: 18px;
  font-weight: 500;
  margin: ${theme.size.small} 0 ${theme.size.medium} 0;
`;

const MobileFilters = () => {
  const { topSmall } = useStickyTopValues();
  const { setShowMobileFilters, showFacets } = useContext(SearchContext);

  const closeMobileFilters = useCallback(() => {
    setShowMobileFilters(false);
  }, [setShowMobileFilters]);

  return (
    <>
      <Global styles={disableBodyScroll} />
      <Container topValue={topSmall}>
        <BackButton onClick={closeMobileFilters}>
          <Icon glyph="ArrowLeft" />
          Back to search results
        </BackButton>
        <Label>Refine your search</Label>
        {showFacets ? <Facets /> : <SearchFilters manuallyApplyFilters={true} onApplyFilters={closeMobileFilters} />}
      </Container>
    </>
  );
};

export default MobileFilters;
