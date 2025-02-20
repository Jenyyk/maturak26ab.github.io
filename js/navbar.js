import { initCamel } from './camel.js';
import { initPreload } from './preload.js';

/**
 * Inserts navbar into DOM and handles secondary functionalities associated with it.
 * 
 * Simple single line implementation featuring sponsors subpage including preload and camel:
 * ```js
 *  <script type="module">import('/js/navbar.js').then(nb => nb.insertNavbar('sponsors'));</script>
 * ```
 * @param {*} selectedPage 
 */
export async function createNavbar(selectedPage) {
    await insertNavbar(selectedPage);
    initPreload();
    initCamel();
}

/**
 * Inserts navbar into DOM.
 * 
 * !!! IMPORTANT !!!
 * 
 * Any references to the navbar (and its DOM elements) must take place AFTER the navbar has been loaded.
 * Make sure to await this function or append then() for any script that depends on the navbar.
 * 
 * @param {*} selectedPage repository name of the corresponding html file
 */
async function insertNavbar(selectedPage) {
    await fetch('/navbar.html')
        .then(response => response.text())
        .then(data => {
            const navBarDoc = new DOMParser().parseFromString(data, 'text/html');
            const navBar = navBarDoc.querySelector('nav');

            navBar.querySelectorAll('.navElement').forEach(navElem => {
                const href = navElem.querySelector('a').href;

                if (href.includes(selectedPage)) {
                    const navTriangle = navBarDoc.createElement('div');
                    navTriangle.id = 'navTriangle';
                    navElem.appendChild(navTriangle);
                }
            });
            
            document.body.prepend(navBar);
        });
}