/**
 * This script is used to dynamically load the navbar on every page.
 * 
 * !!! IMPORTANT !!!
 * 
 * Any references to the navbar (and its DOM elements) must take place after the navbar has been loaded.
 * Make sure to await this function or append then() for any script that depends on the navbar.
 * 
 * Usage featuring sponsors subpage including preload and camel:
 * ```js
 *  <script src="/js/navbar.js"></script>
 *  <script src="/js/camel.js"></script>
 *  <script src="/js/preload.js"></script>
 *  <script>
 *      initNavbar('sponsors').then(() => {
 *          initCamel();
 *          initPreload();
 *      });
 *  </script>
 * ```
 * 
 * @param {*} selectedPage repository name of the corresponding html file
 */
async function initNavbar(selectedPage) {
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