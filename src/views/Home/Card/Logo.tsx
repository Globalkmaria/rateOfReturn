import styled from 'styled-components';

import { TopStock } from '../../../repository/topStocks/type';
import { changeImgUrl } from '../utils';

type LogoProps = {
  stock: TopStock;
};

const Logo = ({ stock }: LogoProps) => {
  return (
    <StyledLogo>
      <picture>
        <source
          srcSet={changeImgUrl(stock.img.webp300) || changeImgUrl(stock.img.webp)}
          media='(max-width: 576px)'
          type='image/webp'
        />
        <source srcSet={changeImgUrl(stock.img.webp400) || changeImgUrl(stock.img.webp)} type='image/webp' />
        <img src={changeImgUrl(stock.img.jpg)} alt={`${stock.name} logo`} />
      </picture>
    </StyledLogo>
  );
};

export default Logo;

const StyledLogo = styled('div')`
  margin: 20px 0 30px;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 10px 20px -12px, rgba(0, 0, 0, 0.3) 0px 5px 36px -18px;

  img {
    padding: 20px;
    height: 200px;
    width: 100%;
    object-fit: contain;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    img {
      height: 150px;
    }
  }
`;
