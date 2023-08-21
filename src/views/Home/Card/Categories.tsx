import styled from 'styled-components/macro';
import { TopStock } from '../../../repository/topStocks/type';

type CategoriesProps = {
  stock: TopStock;
};

const Categories = ({ stock }: CategoriesProps) => {
  return (
    <StyledCategories>
      <div className='industry'>
        <span className='label'>Industry</span>
        <span className='chip'>{stock.industry}</span>
      </div>
      <div className='sector'>
        <span className='label'>Sector</span>
        <span className='chip'>{stock.sector}</span>
      </div>
    </StyledCategories>
  );
};

export default Categories;

const StyledCategories = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .chip {
    padding: 3px;
    width: fit-content;
    background-color: ${({ theme }) => theme.colors.grey400};
    border-radius: 5px;
    line-height: 1.8rem;
  }
`;
