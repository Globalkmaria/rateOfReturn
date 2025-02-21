import styled from 'styled-components';

import { useRouter } from '../../hooks/useRouter';
import { chartRouterData } from '../../router/routerData';
import { UnderlineAnchor } from '@/components/Anchor';

type MenuProps = { selected: boolean; disabled?: boolean };

const ChartMenu = ({}) => {
  const { currentLevelPath } = useRouter(1);

  return (
    <StyledChartMenu>
      <StyledMenuList>
        {chartRouterData.map(element => {
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
    </StyledChartMenu>
  );
};

export default ChartMenu;

const StyledChartMenu = styled('nav')`
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
