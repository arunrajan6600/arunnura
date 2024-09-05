import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import Image from 'next/image';


const TextDisplay = ({ content }) => {
  const renderers = {
    a: ({ href, children }) => (
      <Link href={href} legacyBehavior>
        <a target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          {children}
        </a>
      </Link>
    ),
    h1: ({ children }) => <h1 className="mb-6 mt-10">{`<${children}/>`}</h1>,
    h2: ({ children }) => <h2 className=" mb-3 mt-10 text-2xl text-[#5D846C] font-semibold">{children}</h2>,
    p: ({ children }) => <p className="mb-3">{children}</p>,
    img: ({ src, alt }) => (
      <Image
        src={`/arunnura/images/${src}`}
        alt={alt}
        width={600}  // Set default width
        height={400} // Set default height
        className="my-4 mx-auto h-auto max-w-full"
      />
    ),
  };

  return (
    <div>
      <ReactMarkdown
        children={content}
        components={renderers}
        remarkPlugins={[remarkGfm]}
      />
    </div>
  );
};

export default TextDisplay;
