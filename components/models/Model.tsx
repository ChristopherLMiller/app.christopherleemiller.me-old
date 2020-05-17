import { FunctionComponent, Fragment } from "react";
import styled from "styled-components";
import { NextSeo, ArticleJsonLd } from "next-seo";
import { Props } from "styles/Themes";
import { SITE_DEFAULT_IMAGE_FILE, SEPARATOR } from "config";
import { imageURL } from "utils/functions";

import { Body } from "components/models/elements/Body";
import { ModelSidebar } from "components/models/elements/Sidebar";
import { ModelTypes } from "utils/queries/models";

const StyledModelPage = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 25px;

  @media (min-width: ${(props: Props) => props.theme.sizes.med_large}) {
    display: grid;
    grid-template-columns: auto 25%;
  }
`;

const Model: FunctionComponent<ModelTypes> = ({ model }) => {
  const image = model.featured_image.provider_metadata
    ? model.featured_image.provider_metadata.public_id
    : SITE_DEFAULT_IMAGE_FILE;

  const tags = model.tags.map((tag) => tag.slug);

  return (
    <Fragment>
      <NextSeo
        title={`Model${SEPARATOR}${model.seo_title}`}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/model/${model.slug}`}
        openGraph={{
          title: `Model${SEPARATOR}${model.seo_title}`,
          description: model.seo_description,
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/model/${model.slug}`,
          type: `article`,
          article: {
            modifiedTime: model.updated_at,
            publishedTime: model.created_at,
            tags: tags.length > 0 ? tags : undefined,
          },
          images: [
            {
              alt: model.title,
              url: `${imageURL(image)}.jpg`,
            },
          ],
        }}
      />
      <ArticleJsonLd
        url={`${process.env.NEXT_PUBLIC_SITE_URL}/model/${model.slug}`}
        title={model.title}
        images={[`${imageURL(image)}.jpg`]}
        datePublished={model.created_at}
        dateModified={model.updated_at}
        authorName="Chris Miller"
        description={model.seo_description}
        publisherLogo={`${imageURL(image)}.jpg`}
        publisherName="Chris Miller"
      />
      <StyledModelPage>
        <Body model={model} />
        <ModelSidebar model={model} />
      </StyledModelPage>
    </Fragment>
  );
};
export { Model };
