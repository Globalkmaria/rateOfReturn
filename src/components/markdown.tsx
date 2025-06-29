import { memo } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';

import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';

const components: Partial<Components> = {
  pre: ({ children }) => <>{children}</>,
  ol: ({ node, children, ...props }) => {
    return <StyledOL {...props}>{children}</StyledOL>;
  },
  li: ({ node, children, ...props }) => {
    return <StyledLI {...props}>{children}</StyledLI>;
  },
  ul: ({ node, children, ...props }) => {
    return <StyledUL {...props}>{children}</StyledUL>;
  },
  strong: ({ node, children, ...props }) => {
    return <StyledStrong {...props}>{children}</StyledStrong>;
  },
  a: ({ node, children, ...props }) => {
    return (
      <StyledA target='_blank' rel='noreferrer' {...props}>
        {children}
      </StyledA>
    );
  },
  h1: ({ node, children, ...props }) => {
    return <StyledH1 {...props}>{children}</StyledH1>;
  },
  h2: ({ node, children, ...props }) => {
    return <StyledH2 {...props}>{children}</StyledH2>;
  },
  h3: ({ node, children, ...props }) => {
    return <StyledH3 {...props}>{children}</StyledH3>;
  },
  h4: ({ node, children, ...props }) => {
    return <StyledH4 {...props}>{children}</StyledH4>;
  },
  h5: ({ node, children, ...props }) => {
    return <StyledH5 {...props}>{children}</StyledH5>;
  },
  h6: ({ node, children, ...props }) => {
    return <StyledH6 {...props}>{children}</StyledH6>;
  },
  p: ({ node, children, ...props }) => {
    return <StyledP {...props}>{children}</StyledP>;
  },
};

const remarkPlugins = [remarkGfm];
const rehypePlugins = [rehypeRaw];

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      rehypePlugins={rehypePlugins}
      remarkPlugins={remarkPlugins}
      components={components}
    >
      {children}
    </ReactMarkdown>
  );
};

export const Markdown = memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children,
);

const StyledOL = styled('ol')`
  list-style-type: disc;
  list-style-position: inside;
  margin-left: 8px;
  margin-bottom: 14px;
  line-height: 1.5;
`;

const StyledLI = styled('li')`
  padding-left: 2px;
`;

const StyledUL = styled('ul')`
  list-style-type: disc;
  list-style-position: inside;
  margin-left: 8px;
  margin-bottom: 14px;
  line-height: 1.5;
`;

const StyledH1 = styled('h1')`
  display: block;
  font-size: 32px;
  font-weight: bold;
  margin-top: 24px;
  margin-bottom: 12px;
`;

const StyledH2 = styled('h2')`
  display: block;
  font-size: 24px;
  font-weight: bold;
  margin-top: 24px;
  margin-bottom: 12px;
`;

const StyledH3 = styled('h3')`
  display: block;
  font-size: 20px;
  font-weight: bold;
  margin-top: 24px;
  margin-bottom: 12px;
`;

const StyledH4 = styled('h4')`
  font-size: 16px;
  font-weight: bold;
  margin-top: 24px;
  margin-bottom: 12px;
`;

const StyledH5 = styled('h5')`
  font-size: 14px;
  font-weight: bold;
  margin-top: 24px;
  margin-bottom: 12px;
`;

const StyledH6 = styled('h6')`
  font-size: 12px;
  font-weight: bold;
  margin-top: 24px;
  margin-bottom: 12px;
`;

const StyledP = styled('p')`
  margin-bottom: 4px;
`;

const StyledStrong = styled('strong')`
  font-weight: 600;
`;

const StyledA = styled('a')`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.grey600};
`;
