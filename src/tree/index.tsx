import "./index.css";

const Tree = () => {
  return (
    <div className="tree">
      root
      <div>ant</div>
      <div>
        bear
        <div>cat</div>
        <div>
          dog
          <div>elephant</div>
        </div>
      </div>
      <div>
        frog
        <div>dolphin</div>
      </div>
    </div>
  );
};

export default Tree;
