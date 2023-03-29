import React from 'react';
import styled from 'styled-components';

export default function List() {
  return <Title>List</Title>;
}

const Title = styled('h1')`
  color: ${(props) => props.theme.colors.grey100};
`;
