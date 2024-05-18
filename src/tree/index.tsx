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

  const reverseTree = (tree: TreeNode): TreeNode => {
    if (!tree.children || tree.children.length === 0) {
      return {...tree};
    }

    const reversedChildren = tree.children.map(child => reverseTree(child)).reverse();

    return {...tree, children: reversedChildren};
  }

  const reversedData: TreeNode = reverseTree(data);

  return (
    <div className="tree">
      <TreeNode data={reversedData}/>
    </div>
  );
};

export default Tree;
