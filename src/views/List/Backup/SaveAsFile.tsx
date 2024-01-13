import styled from 'styled-components';

import { ContainedButton } from '../../../components/Button';
import { handleGetDataFile } from '../../../utils/file';

const SaveAsFile = () => {
  return (
    <StyledSaveAsFile>
      <ContainedButton onClick={handleGetDataFile} title='Save File Button' fullWidth>
        Get Backup File
      </ContainedButton>
    </StyledSaveAsFile>
  );
};

export default SaveAsFile;

const StyledSaveAsFile = styled('div')`
  margin-top: 5px;
`;
