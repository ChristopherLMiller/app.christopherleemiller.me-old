import React, { SFC } from 'react';
import { StyledCard, StyledCardBody } from './styles/Cards';

interface CardProps {
  children: object,
}

const Card: SFC<CardProps> = ({ children }) => (
  <StyledCard>
    <StyledCardBody>{children}</StyledCardBody>
  </StyledCard>
)

export default Card;
