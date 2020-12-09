import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { NAMEAPP } from '../config/Constants';

function LayoutConfig(props) {
  const { children, title } = props;

  return (
    <>
      <Helmet htmlAttributes={{ lang: 'pt-BR' }}>
        <title>{`${NAMEAPP}${title ? ` - ${title}` : ''}`}</title>
        {/* <meta name="description" content="Nested component" /> */}
      </Helmet>
      {children}
    </>
  );
}

export default memo(LayoutConfig);
