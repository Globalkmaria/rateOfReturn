import { ChangeEventHandler, MouseEventHandler, useState } from 'react';

import styled from 'styled-components';

import aiService from '@/service/ai/service';

import { BorderButton } from '@/components/Button';
import { Markdown } from '@/components/markdown';

function StockAI() {
  const [stockName, setStockName] = useState('');
  const [data, setData] = useState<string>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const onSubmit: MouseEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();

    if (!stockName.trim()) return;

    setData('');
    setError('');
    setLoading(true);

    const result = await aiService.generateStockInfo(stockName);
    setLoading(false);

    if (result.success) {
      setData(result.data.text);
      setError('');
      return;
    }

    setError(result.message);
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    setStockName(e.target.value);
  };

  return (
    <div>
      <StyledTitle>Stock Search with AI</StyledTitle>
      <StyledHelperText>Request is limited to 2 per day</StyledHelperText>
      <StyledSearchBar onSubmit={onSubmit}>
        <StyledInput
          type='text'
          value={stockName}
          onChange={onChange}
          placeholder='Enter stock name or symbol...'
        />
        <BorderButton type='submit' disabled={loading}>
          Generate Stock Info
        </BorderButton>
      </StyledSearchBar>

      <StyledContext>
        {loading && <>{LoadingMessage}</>}
        {error && <>{error}</>}

        {data && <Markdown>{data}</Markdown>}
      </StyledContext>
    </div>
  );
}

export default StockAI;

const LoadingMessage = 'Generating AI stock analysis...';

const StyledTitle = styled('h2')`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 20px 0 5px;
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  text-transform: uppercase;
`;

const StyledHelperText = styled('p')`
  color: ${({ theme }) => theme.colors.grey600};
  text-align: center;
`;

const StyledSearchBar = styled('form')`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  justify-content: center;
`;

const StyledInput = styled('input')`
  width: 300px;
  padding: 10px;
  background: ${({ theme }) => theme.colors.grey100};
  border: none;
  border-radius: 5px;
`;

const StyledContext = styled('section')`
  margin-top: 20px;
`;
