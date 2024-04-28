import styled from 'styled-components';

import { useRouter } from '../../hooks/useRouter';
import { chartRouterData } from '../../router/routerData';
import { BorderAnchor } from '@/components/Anchor';

type MenuProps = { selected: boolean; disabled?: boolean };

interface ChartMenuProps {}

const ChartMenu = ({}: ChartMenuProps) => {
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
                {element.label}
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
  padding: 10px;
`;

const StyledMenuList = styled('ul')`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const StyledMenu = styled(BorderAnchor)<MenuProps>`
  padding: 20px;
`;
