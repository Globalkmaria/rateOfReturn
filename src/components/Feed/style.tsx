import styled from 'styled-components';

export const FeedErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.red300};
`;

export const FeedContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.grey000};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FeedTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.colors.blue300};
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
  text-decoration-style: wavy;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.blue300};
    text-decoration-color: ${({ theme }) => theme.colors.black};
    text-decoration-thickness: 4px;
    text-underline-offset: 6px;
    text-decoration-style: solid;
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 5px;
  }
`;

export const FeedList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media ${({ theme }) => theme.devices.tablet} {
    gap: 5px;
    padding: 10px;
  }
`;

export const FeedListItem = styled.li`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px;
  border-radius: 8px;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  @media ${({ theme }) => theme.devices.tablet} {
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;

    &:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      transform: translateY(-1px);
    }
  }
`;

export const FeedItemTitle = styled.span`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 0.9rem;
  }
`;

export const FeedLoading = styled.p`
  color: ${({ theme }) => theme.colors.grey500};
`;

export const FeedDate = styled.p`
  margin-bottom: 10px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.grey500};
  font-style: italic;

  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 0.8rem;
    margin-top: 3px;
  }
`;

export const FeedDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.grey700};

  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 0.9rem;
    margin-top: 3px;
  }
`;
