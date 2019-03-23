import { EMPTY_OBJ, EMPTY_ARR } from '../constants';
import { Fragment } from '../create-element';
import { diffChildren } from './children';
import { diffProps } from './props';
import { removeNode } from '../util';
import options from '../options';

/**
 * Diff two virtual nodes and apply proper changes to the DOM
 * @param {import('../internal').PreactElement | Text} dom The DOM element representing
 * the virtual nodes under diff
 * @param {import('../internal').PreactElement} parentDom The parent of the DOM element
 * @param {import('../internal').VNode | null} newVNode The new virtual node
 * @param {import('../internal').VNode | null} oldVNode The old virtual node
 * @param {boolean} isSvg Whether or not this element is an SVG node
 * @param {Array<import('../internal').PreactElement>} excessDomChildren
 */
export function diff(dom, parentDom, newVNode, oldVNode, isSvg, excessDomChildren, force) {

	// If the previous type doesn't match the new type we drop the whole subtree
	if (oldVNode==null || newVNode==null || oldVNode.type!==newVNode.type) {
		if (oldVNode!=null) unmount(oldVNode);
		if (newVNode==null) return null;
		dom = null;
		oldVNode = EMPTY_OBJ;
	}

	if (options.diff) options.diff(newVNode);

	let newType = newVNode.type;

	try {
		if (oldVNode.type===Fragment || newType===Fragment) {
			diffChildren(parentDom, newVNode, oldVNode, isSvg, excessDomChildren);

			if (newVNode._children.length) {
				dom = newVNode._children[0]._dom;
				newVNode._lastDomChild = newVNode._children[newVNode._children.length - 1]._dom;
			}
		}
		else {
			dom = diffElementNodes(dom, newVNode, oldVNode, isSvg, excessDomChildren);

			if (newVNode.ref && (oldVNode.ref !== newVNode.ref)) {
				applyRef(newVNode.ref, dom);
			}
		}

		newVNode._dom = dom;

		if (options.diffed) options.diffed(newVNode);
	}
	catch (e) {

	}

	return dom;
}

/**
 * Diff two virtual nodes representing DOM element
 * @param {import('../internal').PreactElement} dom The DOM element representing
 * the virtual nodes being diffed
 * @param {import('../internal').VNode} newVNode The new virtual node
 * @param {import('../internal').VNode} oldVNode The old virtual node
 * @param {boolean} isSvg Whether or not this DOM node is an SVG node
 * @param {*} excessDomChildren
 * @returns {import('../internal').PreactElement}
 */
function diffElementNodes(dom, newVNode, oldVNode, isSvg, excessDomChildren) {
	let d = dom;

	// Tracks entering and exiting SVG namespace when descending through the tree.
	isSvg = newVNode.type==='svg' || isSvg;

	if (dom==null && excessDomChildren!=null) {
		for (let i=0; i<excessDomChildren.length; i++) {
			const child = excessDomChildren[i];
			if (child!=null && (newVNode.type===null ? child.nodeType===3 : child.localName===newVNode.type)) {
				dom = child;
				excessDomChildren[i] = null;
				break;
			}
		}
	}

	if (dom==null) {
		dom = newVNode.type===null ? document.createTextNode(newVNode.text) : isSvg ? document.createElementNS('http://www.w3.org/2000/svg', newVNode.type) : document.createElement(newVNode.type);

		// we created a new parent, so none of the previously attached children can be reused:
		excessDomChildren = null;
	}
	newVNode._dom = dom;

	if (newVNode.type===null) {
		if ((d===null || dom===d) && newVNode.text!==oldVNode.text) {
			dom.data = newVNode.text;
		}
	}
	else {
		if (excessDomChildren!=null && dom.childNodes!=null) {
			excessDomChildren = EMPTY_ARR.slice.call(dom.childNodes);
		}
		if (newVNode!==oldVNode) {
			let oldProps = oldVNode.props;
			let newProps = newVNode.props;

			// if we're hydrating, use the element's attributes as its current props:
			if (oldProps==null) {
				oldProps = {};
				if (excessDomChildren!=null) {
					let name;
					for (let i=0; i<dom.attributes.length; i++) {
						name = dom.attributes[i].name;
						oldProps[name=='class' && newProps.className ? 'className' : name] = dom.attributes[i].value;
					}
				}
			}
			let oldHtml = oldProps.dangerouslySetInnerHTML;
			let newHtml = newProps.dangerouslySetInnerHTML;
			if (newHtml || oldHtml) {
				// Avoid re-applying the same '__html' if it did not changed between re-render
				if (!newHtml || !oldHtml || newHtml.__html!=oldHtml.__html) {
					dom.innerHTML = newHtml && newHtml.__html || '';
				}
			}
			if (newProps.multiple) {
				dom.multiple = newProps.multiple;
			}

			diffChildren(dom, newVNode, oldVNode, newVNode.type==='foreignObject' ? false : isSvg, excessDomChildren);
			diffProps(dom, newProps, oldProps, isSvg);

			dom.props = newProps;
		}
	}

	return dom;
}

/**
 * Invoke or update a ref, depending on whether it is a function or object ref.
 * @param {object|function} [ref=null]
 * @param {any} [value]
 */
export function applyRef(ref, value) {
	try {
		if (typeof ref=='function') ref(value);
		else ref.current = value;
	}
	catch (e) {

	}
}

/**
 * Unmount a virtual node from the tree and apply DOM changes
 * @param {import('../internal').VNode} vnode The virtual node to unmount
 * @param {boolean} skipRemove Flag that indicates that a parent node of the
 * current element is already detached from the DOM.
 */
export function unmount(vnode, skipRemove) {
	let r;
	if (options.unmount) options.unmount(vnode);

	if (r = vnode.ref) {
		applyRef(r, null);
	}

	if (!skipRemove && vnode._lastDomChild==null && (skipRemove = ((r = vnode._dom)!=null))) removeNode(r);

	vnode._dom = vnode._lastDomChild = null;

	if (r = vnode._children) {
		for (let i = 0; i < r.length; i++) {
			unmount(r[i], skipRemove);
		}
	}
}
