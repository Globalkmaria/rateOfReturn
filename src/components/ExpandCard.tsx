import { ReactNode } from 'react';
import styled from 'styled-components';
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
    <div>
      <StyledWrapper open={open} transition={transition}>
        <StyledExpand>{children}</StyledExpand>
      </StyledWrapper>
      <StyledExpandButton
        type='button'
        aria-label={`expand ${open ? 'close' : 'open'} button`}
      >
        {open ? <MdExpandLess /> : <MdExpandMore />}
      </StyledExpandButton>
    </div>
  );
};

export default ExpandCard;

const StyledWrapper = styled('div').withConfig({
  shouldForwardProp: prop => !['open', 'transition'].includes(prop),
})<StyledExpandCardProps>`
  display: grid;
  grid-template-rows: ${({ open }) => (open ? '1fr' : '0fr')};
  overflow: hidden;
  transition: grid-template-rows ${({ transition }) => `${transition ?? 200}ms`};
`;

const StyledExpand = styled('div')`
  min-height: 0px;
`;

const StyledExpandButton = styled('button')`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 2rem;
`;
