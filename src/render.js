import { EMPTY_ARR } from './constants';
import { diffChildren } from './diff/children';
import { createElement, Fragment } from './create-element';

/**
 * Render a Preact virtual node into a DOM element
 * @param {import('./index').ComponentChild} vnode The virtual node to render
 * @param {import('./internal').PreactElement} parentDom The DOM element to
 * render into
 */
export function render(vnode, parentDom) {
	let oldVNode = parentDom._prevVNode;
	vnode = createElement(Fragment, null, [vnode]);

	diffChildren(parentDom, parentDom._prevVNode = vnode, oldVNode, parentDom.ownerSVGElement!==undefined, oldVNode ? null : EMPTY_ARR.slice.call(parentDom.childNodes), vnode);
}

/**
 * Update an existing DOM element with data from a Preact virtual node
 * @param {import('./index').ComponentChild} vnode The virtual node to render
 * @param {import('./internal').PreactElement} parentDom The DOM element to
 * update
 */
export function hydrate(vnode, parentDom) {
	parentDom._prevVNode = null;
	render(vnode, parentDom);
}
