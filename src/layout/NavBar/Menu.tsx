import styled from 'styled-components';
import { SidebarContent } from '../../router/router';
import { useRouter } from '../../hooks/useRouter';
import { BackgroundAnchor } from '@/components/Anchor';

type MenuProps = { selected: boolean; disabled?: boolean };

const Menu = () => {
  const { currentLevelPath } = useRouter(0);
  return (
    <StyledList>
      {SidebarContent.map(element => {
        return (
          <StyledMenuItemWrapper key={element.path}>
            <StyledMenuItem
              color='primary'
              selected={currentLevelPath === element.path.split('/')[1]}
              disabled={element.disabled}
              to={element.path}
            >
              {element.label}
            </StyledMenuItem>
          </StyledMenuItemWrapper>
        );
      })}
    </StyledList>
  );
};

export default Menu;

const StyledList = styled('ul')`
  display: flex;
  gap: 10px;
  grid-area: menu;

  @media ${({ theme }) => theme.devices.laptop} {
    justify-content: center;
  }
`;

const StyledMenuItemWrapper = styled('li')`
  width: min(100px, 20vw);
`;

const StyledMenuItem = styled(BackgroundAnchor)<MenuProps>`
  padding: 20px;
  font-size: min(1rem, 5vw);
`;
