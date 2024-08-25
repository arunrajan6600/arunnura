
import InstaPost from "@/components/insta_post";


const TextDisplay = ({ content }) => {
  
  const sections = content.split('\n\n');

  const findInstagramUrl = (text) => {
    const instagramRegex = /https:\/\/www\.instagram\.com\S*/g;
    const matches = text.match(instagramRegex);
  
    // Return the first match or null if no match is found
    return matches ? matches[0] : null;
  };

  return (
    <div>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          {section.split('\n').map((line, lineIndex) => (
            findInstagramUrl(line) ? <InstaPost key={lineIndex} shareLink={findInstagramUrl(line)}></InstaPost> : <h2 key={lineIndex}>{line}</h2>
          ))}
          {sectionIndex < sections.length - 1 && <h3>&nbsp;</h3>}
        </div>
      ))}
    </div>
  );
};

export default TextDisplay;
