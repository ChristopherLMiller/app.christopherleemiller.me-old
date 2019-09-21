import React, { SFC, useContext } from 'react';
import styled from 'styled-components';
import { ModelsFilterContext } from '../../../../lib/context/ModelFiltersContext';

const StyledSelect = styled.select`
  font-family: var(--font-main);
  padding: 5px;
  font-size: 1.25em;
  width: 100%;
  outline: var(--main-color-transparent);
  border: 1px solid var(--main-color-transparent);
  margin: 15px 0;
`;

type Item = {
  id: string;
  slug: string;
  title: string;
  [key: string]: string;
};

type Items = Item[];

interface ISelectBox {
  items?: Items;
}

const CompletedSelect: SFC<ISelectBox> = ({ items }) => {
  const { completed, setCompletedContext } = useContext(ModelsFilterContext);
  return (
    <StyledSelect
      onChange={event => setCompletedContext(event.target.value)}
      value={completed}
    >
      {items !== undefined &&
        items.map((item: Item) => (
          <option key={item.id} value={item.slug}>
            {item.title}
          </option>
        ))}
    </StyledSelect>
  );
};

export { CompletedSelect };
