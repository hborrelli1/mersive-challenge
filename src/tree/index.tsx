import "./index.css";
import data from './data.json'

type TreeNode = {
  node: string;
  children?: TreeNode[];
}

const TreeNode = ({data, level = '1'}: {data: TreeNode, level: string}) => {
  if (!data.children) {
    return (
      <div>{level} {data.node}</div>
    )
  }

  return (
    <>
      {level} {data.node}
      <div>
        {data.children.map((el, index) => (
          <TreeNode key={index} data={el} level={`${level}.${index+1}`} />
        ))}
      </div>
    </>
  
  )
}

const Tree = () => {

  // const reverseTree = (tree: TreeNode): TreeNode => {
  //   if (!tree.children || tree.children.length === 0) {
  //     return {...tree};
  //   }

  //   const reversedChildren = tree.children.map(child => reverseTree(child)).reverse();

  //   return {...tree, children: reversedChildren};
  // }

  // const reversedData: TreeNode = reverseTree(data);

  return (
    <div className="tree">
      <TreeNode data={data} level={'1'}/>
    </div>
  );
};

export default Tree;
