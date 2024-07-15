import styled from 'styled-components';

type StyledProps = {
  gap?: number;
  direction?: 'row' | 'column';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  alignSelf?:
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
};

const Flex = styled.div.withConfig({
  shouldForwardProp: prop =>
    ![
      'gap',
      'direction',
      'justifyContent',
      'alignItems',
      'alignContent',
      'alignSelf',
      'flexWrap',
    ].includes(prop),
})<StyledProps>`
  display: flex;
  gap: ${props => props.gap}px;
  flex-direction: ${props => props.direction};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  align-content: ${props => props.alignContent};
  align-self: ${props => props.alignSelf};
  flex-wrap: ${props => props.flexWrap};
`;

export default Flex;
