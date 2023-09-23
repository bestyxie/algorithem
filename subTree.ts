interface TreeNode {
  value: string
  label: string
  id: string
  parentId?: string
  children?: TreeNode[]
}

/**
 * 通过节点 value 数组，在原树数组中生成一颗结构一样的子树
 * @param ids 
 * @param trees 
 * @returns 
 */
export function getSubTreesByLeaves(ids: string[], trees: TreeNode[]) {
  const treeNodeMap = new Map<string, TreeNode>()
  const treeNodeQueue: TreeNode[] = [...trees]
  const sourceTreeNodes: TreeNode[] = []
  debugger

  while(treeNodeQueue.length > 0) {
    const treeNode = treeNodeQueue.shift()
    if (!treeNode) break
    if (treeNode.children) {
      treeNodeQueue.push(...treeNode.children)
    }
    treeNodeMap.set(treeNode.id, treeNode)
    if (ids.includes(treeNode.value)) {
      sourceTreeNodes.push({...treeNode})
    }
  }

  const resultTrees: TreeNode[] = []
  while(sourceTreeNodes.length > 0) {
    const treeNode = sourceTreeNodes.shift()
    if (!treeNode) break
    // 如果该节点没有父节点，则说明是根节点，则放在结果数组中
    if (!treeNode.parentId) {
      resultTrees.push(treeNode)
      continue
    }
    const parentNode = treeNodeMap.get(treeNode.parentId)
    if (!parentNode) {
      continue
    }
    // 在源数组中查找该节点，如果找得到，说明该节点的的字节的曾经在该循环中被遍历过，则将该节点放到父节点的 children 数组中
    // 如果不在，则复制该父节点，且children 只包含当前节点
    let parentNodeInSourceQueue = sourceTreeNodes.find((node) => node.id === parentNode.id)
    if (!parentNodeInSourceQueue) {
      parentNodeInSourceQueue = {
        ...parentNode,
        children: [treeNode]
      }
      sourceTreeNodes.push(parentNodeInSourceQueue)
    } else {
      parentNodeInSourceQueue.children?.push(treeNode)
    }
  }
  return resultTrees
}

const treeNodes: TreeNode[] = [
  {
    label: 'a',
    value: 'a',
    id: '123456789',
    children: [
      {
        label: 'a-1',
        value: 'a-1',
        id: '123456789-1',
        parentId: '123456789',
      },
      {
        label: 'a-2',
        value: 'a-2',
        id: '123456789-2',
        parentId: '123456789',
      },
      {
        label: 'a-3',
        value: 'a-3',
        id: '123456789-3',
        parentId: '123456789',
      }
    ],
  },
  {
    label: 'b',
    value: 'b',
    id: '123456788',
    children: [
      {
        label: 'b-1',
        value: 'b-1',
        id: '123456788-1',
        parentId: '123456788',
      },
      {
        label: 'b-2',
        value: 'b-2',
        id: '123456788-2',
        parentId: '123456788',
      },
      {
        label: 'b-3',
        value: 'b-3',
        id: '123456788-3',
        parentId: '123456788',
      }
    ],
  },
]

export const result = getSubTreesByLeaves(['a-2', 'a-3', 'b-3'],treeNodes)
