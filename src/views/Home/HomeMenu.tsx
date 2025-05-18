import styled from 'styled-components';

import { UnderlineAnchor } from '@/components/Anchor';

import { homeRouterData } from '@/router/routerData';

import { useRouter } from '../../hooks/useRouter';

type MenuProps = { selected: boolean; disabled?: boolean };

const HomeMenu = ({}) => {
  const { currentLevelPath } = useRouter(0);

  return (
    <StyledHomeMenu>
      <StyledMenuList>
        {homeRouterData.map(element => {
          return (
            <li key={element.path}>
              <StyledMenu
                to={element.path}
                selected={currentLevelPath === element.path}
                disabled={element.disabled}
              >
                <span>{element.label}</span>
              </StyledMenu>
            </li>
          );
        })}
      </StyledMenuList>
    </StyledHomeMenu>
  );
};

export default HomeMenu;

const StyledHomeMenu = styled('nav')`
  height: fit-content;
  padding: 0 10px 10px 10px;
`;

const StyledMenuList = styled('ul')`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const StyledMenu = styled(UnderlineAnchor)<MenuProps>`
  display: block;
  padding: 0 1rem 1rem 1rem;
  font-size: 0.8rem;
`;
