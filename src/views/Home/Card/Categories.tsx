import styled from 'styled-components';

import { TopStock } from '../../../repository/topStocks/type';
import { StyledLabel } from './Card';

type CategoriesProps = {
  stock: TopStock;
};

const Categories = ({ stock }: CategoriesProps) => {
  return (
    <StyledCategories>
      <div>
        <StyledLabel>Industry</StyledLabel>
        <StyledChip>{stock.industry}</StyledChip>
      </div>
      <div>
        <StyledLabel>Sector</StyledLabel>
        <StyledChip>{stock.sector}</StyledChip>
      </div>
    </StyledCategories>
  );
};

export default Categories;

const StyledCategories = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledChip = styled('span')`
  padding: 3px;
  width: fit-content;
  background-color: ${({ theme }) => theme.colors.grey400};
  border-radius: 5px;
  line-height: 1.8rem;
`;
