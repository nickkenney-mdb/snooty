import React from 'react';
import PropTypes from 'prop-types';
import { NavigationProvider } from '../context/navigation-context';
import { VersionContextProvider } from '../context/version-context';
import { TocContextProvider } from '../context/toc-context';
import { HeaderContextProvider } from './Header/header-context';
import { SidenavContextProvider } from './Sidenav';
import { TabProvider } from './Tabs/tab-context';
import { ContentsProvider } from './Contents/contents-context';
import { SearchContextProvider } from './SearchResults/SearchContext';

// Check for feature flag here to make it easier to pass down for testing purposes
const SHOW_FACETS = process.env.GATSBY_FEATURE_FACETED_SEARCH === 'true';

const RootProvider = ({
  children,
  headingNodes,
  selectors,
  slug,
  repoBranches,
  associatedReposInfo,
  isAssociatedProduct,
  remoteMetadata,
  project,
}) => {
  let providers = (
    <TabProvider selectors={selectors}>
      <ContentsProvider headingNodes={headingNodes}>
        <HeaderContextProvider>
          <VersionContextProvider
            repoBranches={repoBranches}
            slug={slug}
            associatedReposInfo={associatedReposInfo}
            isAssociatedProduct={isAssociatedProduct}
          >
            <TocContextProvider remoteMetadata={remoteMetadata}>
              <SidenavContextProvider>
                <SearchContextProvider showFacets={SHOW_FACETS}>{children}</SearchContextProvider>
              </SidenavContextProvider>
            </TocContextProvider>
          </VersionContextProvider>
        </HeaderContextProvider>
      </ContentsProvider>
    </TabProvider>
  );

  if (project) {
    providers = <NavigationProvider project={project}>{providers}</NavigationProvider>;
  }

  return providers;
};

RootProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  headingNodes: PropTypes.arrayOf(PropTypes.object),
  selectors: PropTypes.object,
};

export default RootProvider;
