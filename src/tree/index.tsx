import "./index.css";
import data from './data.json'
import { useState } from "react";

type TreeNode = {
  id: string,
  node: string;
  children: TreeNode[];
}

const TreeNode = (
  {data, level = '1', onEnter, onRemove}: 
  {data: TreeNode, level: string, onEnter: (id: string, value: string)=>void, onRemove: (id: string) => void}
) => {

  const [value, setValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const target = e.target as HTMLInputElement; // Cast e.target to HTMLInputElement
      onEnter(data.id, target.value);
      setValue('');
    }
  };

  if (!data.children) {
    return (
      <div className="node">{level} {data.node}</div>
    )
  }

  if (data.node === '') {
    return (
      <input 
        className="add-node-input"
        type="text" 
        value={value} 
        id={'1'} 
        onChange={(e) => setValue(e.target.value)} 
        onKeyDown={handleKeyDown}
        placeholder="Add node..."
      />
    )
  }

  return (
    <>
      {level} {data.node} <button className="delete-button" onClick={() => onRemove(data.id)}>X</button>
      <div className="node">
        {data.children.map((el, index) => (
          <div key={index}>
            <TreeNode data={el} level={`${level}.${index+1}`} onEnter={onEnter} onRemove={onRemove} />
            {data.children?.length === index+1 && 
              <input 
                className="add-node-input"
                type="text" 
                value={value} 
                id={`${el.id}`} 
                onChange={(e) => setValue(e.target.value)} 
                onKeyDown={handleKeyDown}
                placeholder="Add node..."
              />
            }
          </div>
        ))}
      </div>
    </>
  
  )
}

const Tree = () => {
  const [treeData, setTreeData] = useState<TreeNode>(data);

  const handleEnter = (id: string, value: string) => {
    setTreeData(updateTree(treeData, id, value));
  }

  const updateTree = (node: TreeNode, id: string, value: string) => {
    const newNode = {id: Math.floor(Math.random() * 100000).toString(), node: value, children: []};

    if (node.node === '') {
      return newNode;
    }

    if (node.id === id) {
      node.children.push(newNode)
      return node;
    } 
    
    for (const child of node.children) {
      updateTree(child, id, value)
    }

    return node;
  };

  const deleteNode = (node: TreeNode, id: string): TreeNode | null => {
    if (node.node === 'root' && node.id === id) {
      return {id: '1', node: "", children: []}
    }
    if (node.id === id) {
      return null;
    }

    const updateChildren = node.children
      .map(child => deleteNode(child, id))
      .filter(child => child !== null) as TreeNode[];

    return {...node, children: updateChildren};
  }

  const handleRemoveNode = (id: string) => {
    setTreeData(prevData => {
      const updatedTree = deleteNode(prevData, id)
      return updatedTree || prevData;
    })
  }

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
      <TreeNode data={treeData} level={'1'} onEnter={handleEnter} onRemove={handleRemoveNode} />
    </div>
  );
};

export default Tree;
