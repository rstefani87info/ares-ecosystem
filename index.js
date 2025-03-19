/** 
* @author Roberto Stefani 
**/ 
import { TreeNode } from "@ares/core/trees.js";



export class GeoTreeNode extends TreeNode {
  /**
   * Create a new Node instance
   * @param {Object} config - Node configuration object
   * @param {string} identifier - node identifier
   * @param {string} config.name - Node name
   * @param {Object} [config.structure={}] - Structure of the node
   */
  constructor(identifier, config) {
    super(identifier, config);
  }

  isLike(identifier, ignoreCase = true) {
    const getString = (s)=> {
      s = (s+'');
      if(ignoreCase) return s.toLowerCase();
      return s;
    }
    identifier = getString(identifier);
    return (
      Object.values(getString(this.name)).some((x) =>
        getString(x).includes(identifier)
      ) || getString(this.identifier).includes(identifier)
    );
  }

  /**
   * Create a child node of the current node
   *
   * @param {*} identifier
   * @param {*} value
   * @returns {TreeNode|null}
   */
  createChildInstance(identifier, value) {
    return new TreeNode(identifier, value);
  }

  /*
   * Get the children property of the current node
   *
   * @returns {Object}
   *
   * */
  getChildrenProperty() {
    return this.structure;
  }

  /**
   * Set the children property of the current node
   *
   * @param {Object} children - The children object to set
   */
  setChildrenProperty(children) {
    if (typeof children === "string") children = JSON.parse(children);
    this.structure = children;
    Object.entries(children).forEach(([key, obj]) => {
      this.children[key] = this.createChildInstance(key, obj);
      this.children[key].parent = this;
    });
  }
}