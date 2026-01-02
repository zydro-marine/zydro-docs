import { useState, useEffect } from 'react';
import { Box, Spinner, Text } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAuth } from '../contexts/AuthContext';
import AuthRequired from './AuthRequired';
import TableOfContents from './TableOfContents';
import './MarkdownPage.scss';

function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, content };
  }

  const frontmatterText = match[1];
  const markdownContent = match[2];
  const frontmatter = {};

  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    }
  });

  return { frontmatter, content: markdownContent };
}

function extractHeadings(content) {
  const headingRegex = /^(#{1,4})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    headings.push({ level, text, id });
  }

  return headings;
}

function MarkdownPage({ file }) {
  const { isAuthenticated } = useAuth();
  const [content, setContent] = useState('');
  const [frontmatter, setFrontmatter] = useState({});
  const [headings, setHeadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/docs/${file}`);
        if (!response.ok) {
          throw new Error(`Failed to load: ${file}`);
        }
        const text = await response.text();
        const parsed = parseFrontmatter(text);
        setFrontmatter(parsed.frontmatter);
        setContent(parsed.content);
        const extractedHeadings = extractHeadings(parsed.content);
        setHeadings(extractedHeadings);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (file) {
      loadMarkdown();
    }
  }, [file]);

  useEffect(() => {
    if (headings.length > 0) {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (!element) {
          const headingElements = document.querySelectorAll(`h1, h2, h3, h4`);
          headingElements.forEach((el) => {
            if (el.textContent.trim() === heading.text) {
              el.id = heading.id;
            }
          });
        }
      });
    }
  }, [headings, content]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" padding="40px">
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Box padding="40px">
        <Text color="red">Error: {error}</Text>
      </Box>
    );
  }

  const requiresAuth = frontmatter.auth === 'true' || frontmatter.auth === true;
  
  if (requiresAuth && !isAuthenticated) {
    return <AuthRequired />;
  }

  return (
    <Box className="markdown-page-wrapper" display="flex" width="100%">
      <Box className="markdown-page" flex="1" padding="40px" maxWidth="800px" margin="0 auto" width="100%">
        <Box className="markdown">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, children, ...props}) => {
                const text = String(children);
                const id = text
                  .toLowerCase()
                  .replace(/[^\w\s-]/g, '')
                  .replace(/\s+/g, '-')
                  .replace(/-+/g, '-')
                  .trim();
                return <h1 id={id} {...props}>{children}</h1>;
              },
              h2: ({node, children, ...props}) => {
                const text = String(children);
                const id = text
                  .toLowerCase()
                  .replace(/[^\w\s-]/g, '')
                  .replace(/\s+/g, '-')
                  .replace(/-+/g, '-')
                  .trim();
                return <h2 id={id} {...props}>{children}</h2>;
              },
              h3: ({node, children, ...props}) => {
                const text = String(children);
                const id = text
                  .toLowerCase()
                  .replace(/[^\w\s-]/g, '')
                  .replace(/\s+/g, '-')
                  .replace(/-+/g, '-')
                  .trim();
                return <h3 id={id} {...props}>{children}</h3>;
              },
              h4: ({node, children, ...props}) => {
                const text = String(children);
                const id = text
                  .toLowerCase()
                  .replace(/[^\w\s-]/g, '')
                  .replace(/\s+/g, '-')
                  .replace(/-+/g, '-')
                  .trim();
                return <h4 id={id} {...props}>{children}</h4>;
              }
            }}
          >
            {content}
          </ReactMarkdown>
        </Box>
      </Box>
      {headings.length > 0 && <TableOfContents headings={headings} />}
    </Box>
  );
}

export default MarkdownPage;
