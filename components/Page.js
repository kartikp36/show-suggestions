import React from 'react';
import PropTypes from 'prop-types';
import { NextSeo } from 'next-seo';

const Page = ({ name, path, children }) => {
  const title = `Fast Feedback – ${name}`;
  const url = `https://fast-feedback-wine.vercel.app${path}`;

  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title,
        }}
      />
      {children}
    </>
  );
};

export default Page;

Page.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  path: PropTypes.string,
};
