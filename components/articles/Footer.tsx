import { ArticleTypes } from './Types';
import { Tags } from './Tags';
import { Categories } from './Categories';
import { SFC } from 'react';
import { StyledArticleFooter } from '../styles/Articles';

const ArticleFooter: SFC<ArticleTypes> = ({ article }) => (
  <StyledArticleFooter >
    <Categories categories={article.categories} />
    <Tags tags={article.tags} />
  </StyledArticleFooter>
)
export { ArticleFooter };