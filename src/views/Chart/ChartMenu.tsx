import styled from 'styled-components';
import { useRouter } from '../../hooks/useRouter';
import { chartRouterData } from '../../router/routerData';

type MenuProps = { selected: boolean; disabled?: boolean };

interface ChartMenuProps {}

const ChartMenu = ({}: ChartMenuProps) => {
  const { routeTo, currentLevelPath } = useRouter(1);
  const menuClickHandler = (path: string) => routeTo(path);

  return (
    <StyledChartMenu>
      <StyledMenuList>
        {chartRouterData.map(element => {
          return (
            <StyledMenu
              key={element.path}
              selected={currentLevelPath === element.path}
              onClick={() => !element.disabled && menuClickHandler(element.path)}
              disabled={element.disabled}
            >
              {element.label}
            </StyledMenu>
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
  gap: 10px;
`;

const StyledMenu = styled('li')<MenuProps>`
  padding: 10px;
  background: ${({ theme, selected }) => (selected ? theme.colors.grey100 : 'none')};
  border-radius: 10px;
  transition: '200ms';
  font-size: 1.2rem;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: ${({ theme, disabled }) => !disabled && theme.colors.grey100};
  }

  ${({ disabled, theme }) =>
    disabled && {
      background: 'none',
      color: theme.colors.grey400,
      cursor: 'default',
    }}
`;
