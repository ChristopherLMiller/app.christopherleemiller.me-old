import { SFC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Sidebar } from '../../Sidebar';
import { ModelTypes } from '../Types';
import { BuildTime } from './BuildTime';

const StyledModelSidebar = styled.div``;

const ModelSidebar: SFC<ModelTypes> = ({ model }) => (
  <StyledModelSidebar>
    <Sidebar title="Information">
      <ul>
        <li>Brand: {model.manufacturer.company}</li>
        <li>Kit Number: {model.kit_number}</li>
        <li>Scale: {model.scale.scale}</li>
        <li>Released: {model.year_released}</li>
        <li>Completed: {model.completed ? `Yes` : `No`}</li>
        <li>
          Scalemates: <a href={model.scalemates_link}>Link</a>
        </li>
        <li>
          Build Time:{` `}
          {model.clockify_id && <BuildTime id={model.clockify_id} />}
        </li>
      </ul>
    </Sidebar>
    <Sidebar title="Tags">
      {model.tags.map(tag => (
        <span key={tag.id}>
          <Link href={`/models?tag=${tag.slug}`}>
            <a>{tag.title}</a>
          </Link>
          {` | `}
        </span>
      ))}
    </Sidebar>
  </StyledModelSidebar>
);

export { ModelSidebar };