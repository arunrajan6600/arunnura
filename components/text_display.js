
const TextDisplay = ({ content }) => {
  
  const sections = content.split('\n\n');

  return (
    <div>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          {section.split('\n').map((line, lineIndex) => (
            <h2 key={lineIndex}>{line}</h2>
          ))}
          {sectionIndex < sections.length - 1 && <h3>&nbsp;</h3>}
        </div>
      ))}
    </div>
  );
};

export default TextDisplay;
