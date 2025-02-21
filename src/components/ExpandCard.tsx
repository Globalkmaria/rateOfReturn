import { ReactNode, useState } from 'react';

import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import styled from 'styled-components';

type StyledExpandCardProps = {
  transition?: number;
  className?: string;
};

type ExpandCardProps = {
  children?: ReactNode;
} & StyledExpandCardProps;

const ExpandCard = ({
  className,
  children,
  transition = 200,
}: ExpandCardProps) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);

  const ariaLabel = `expand ${open ? 'close' : 'open'} button`;
  return (
    <div className={className}>
      <StyledWrapper open={open} transition={transition}>
        <StyledExpand>{children}</StyledExpand>
      </StyledWrapper>
      <StyledExpandButton
        aria-label={ariaLabel}
        type='button'
        onClick={handleClick}
      >
        {open ? <MdExpandLess /> : <MdExpandMore />}
      </StyledExpandButton>
    </div>
  );
};

export default ExpandCard;

const StyledWrapper = styled('div').withConfig({
  shouldForwardProp: prop => !['open', 'transition'].includes(prop),
})<{
  open: boolean;
  transition: number;
}>`
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
