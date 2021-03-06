import { FunctionComponent } from "react";
import styled from "styled-components";
import { Tags } from "components/articles/Tags";
import { Categories } from "components/articles/Categories";
import { iArticle } from "utils/queries/articles";

const StyledArticleFooter = styled.div`
  background: var(--background-dark);
  padding: 20px;
  margin: 0;
`;

const ArticleFooter: FunctionComponent<iArticle> = ({ article }) => (
  <StyledArticleFooter>
    <Categories categories={article.categories} />
    <Tags tags={article.tags} />
  </StyledArticleFooter>
);
export { ArticleFooter };
