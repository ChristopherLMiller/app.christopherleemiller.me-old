import Link from 'next/link';
import ModelTypes from './Types';
import { SFC } from 'react';
import {
  StyledModelListingBlock,
  StyledModelListingColumn,
  StyledModelListingInfo,
  StyledModelListingParagraph,
  StyledModelListingTitle,
  StyledReadMore
} from '../styles/Models';

const ModelInfo: SFC<ModelTypes> = ({ model }) => {
  let completed = model.completed ? "Yes" : "No";

  return (
    <StyledModelListingInfo>
      <StyledModelListingTitle>{model.title}</StyledModelListingTitle>
      <StyledModelListingBlock>
        <StyledModelListingColumn>
          <StyledModelListingParagraph>Brand: {model.manufacturer.company}</StyledModelListingParagraph>
          <StyledModelListingParagraph>Kit #{model.kit_number}</StyledModelListingParagraph>
          <StyledModelListingParagraph>Scale: {model.scale.scale}</StyledModelListingParagraph>
          <StyledModelListingParagraph>Released: {model.year_released}</StyledModelListingParagraph>
        </StyledModelListingColumn>
        <StyledModelListingColumn>
          <StyledModelListingParagraph>Completed: {completed}</StyledModelListingParagraph>
        </StyledModelListingColumn>
      </StyledModelListingBlock>
      <StyledReadMore>
        <Link
          as={`/model/${model.slug}`}
          href={`/model?slug=${model.slug}`}
        >
          <a>View More </a>
        </Link>
      </StyledReadMore>
    </StyledModelListingInfo>
  );
}
export default ModelInfo;