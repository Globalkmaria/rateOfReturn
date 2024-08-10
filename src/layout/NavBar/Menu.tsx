import styled from 'styled-components';

import { BackgroundAnchor } from '@/components/Anchor';
import Icon from '@/components/Icon';

import { SidebarContent } from '../../router/router';
import { useRouter } from '../../hooks/useRouter';

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
              {element.icon && (
                <Icon size='s' icon={element.icon} color='inherit' />
              )}

              <StyledLabel>{element.label}</StyledLabel>
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

  .icon {
    margin-right: 5px;
  }

  @media ${({ theme }) => theme.devices.laptop} {
    flex-direction: column;
    gap: 5px;

    .icon {
      margin-right: 0px;
    }
  }
`;

const StyledLabel = styled('span')`
  display: block;
  color: inherit;

  @media ${({ theme }) => theme.devices.mobile} {
    display: none;
  }
`;
