import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DEFAULT_KEYWORDS, SITE_NAME, buildAbsoluteUrl } from '../seo/site';

const SEO = ({
  title,
  description,
  path = '/',
  image,
  imageAlt,
  type = 'website',
  keywords = DEFAULT_KEYWORDS,
  structuredData = [],
  noindex = false,
}) => {
  const canonicalUrl = buildAbsoluteUrl(path);
  const absoluteImage = image ? buildAbsoluteUrl(image) : undefined;
  const robots = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';
  const schemas = Array.isArray(structuredData)
    ? structuredData.filter(Boolean)
    : [structuredData].filter(Boolean);
  const verificationToken = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en-IN" />
      <title>{title}</title>
      <link rel="canonical" href={canonicalUrl} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="robots" content={robots} />
      <meta name="theme-color" content="#09100d" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      {absoluteImage && <meta property="og:image" content={absoluteImage} />}
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {absoluteImage && <meta name="twitter:image" content={absoluteImage} />}
      {verificationToken && <meta name="google-site-verification" content={verificationToken} />}
      {schemas.map((schema, index) => (
        <script
          key={`${title}-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Helmet>
  );
};

export default SEO;
