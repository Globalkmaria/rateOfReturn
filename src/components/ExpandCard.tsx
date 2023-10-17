import { ReactNode } from 'react';
import styled from 'styled-components/macro';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

type StyledExpandCardProps = {
  open: boolean;
  transition?: number;
};

type ExpandCardProps = {
  children?: ReactNode;
} & StyledExpandCardProps;

const ExpandCard = ({ open, children, transition = 200 }: ExpandCardProps) => {
  return (
    <StyledExpandCard open={open} transition={transition}>
      <div className='wrapper'>
        <div className='expand'>{children}</div>
      </div>
      <button className='expand-btn' type='button' aria-label='toggle expand'>
        {open ? <MdExpandLess /> : <MdExpandMore />}
      </button>
    </StyledExpandCard>
  );
};

export default ExpandCard;

const StyledExpandCard = styled('div')<StyledExpandCardProps>`
  .wrapper {
    display: grid;
    grid-template-rows: ${({ open }) => (open ? '1fr' : '0fr')};
    overflow: hidden;
    transition: grid-template-rows
      ${({ transition }) => `${transition ?? 200}ms`};
  }

  .expand {
    min-height: 0px;
  }

  .expand-btn {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 2rem;
  }
`;
