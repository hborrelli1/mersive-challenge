import "./index.css";
import data from './data.json'

type TreeNode = {
  node: string;
  children?: TreeNode[];
}

const TreeNode = ({data}: {data: TreeNode}) => {
  if (!data.children) {
    return (
      <div>{data.node}</div>
    )
  }

  return (
    <>
      {data.node}
      <div>
        {data.children.map((el, index) => (
          <TreeNode key={index} data={el} />
        ))}
      </div>
    </>
  
  )
}

const Tree = () => {
  return (
    <div className="tree">
      <TreeNode data={data}/>
    </div>
  );
};

export default Tree;
