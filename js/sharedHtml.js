import { initPreload } from './preload.js';


// Inserts footer from footer.html
await insertFooter();
// This monstrosity gets the file name dynamically, so no need to type it in every file
const file = location.pathname.split("/").pop().split(".")[0] || "index";
await createNavbar(file);



/**
 * Inserts navbar into DOM and handles secondary functionalities associated with it.
 *
 * Simple single line implementation featuring sponsors subpage including preload and camel:
 * ```js
 *  <script src="/js/sharedHtml.js" type="module"></script>
 * ```
 * @param {*} selectedPage
 */
async function createNavbar(selectedPage) {
    await insertNavbar(selectedPage);
    // Wait for full repaint (to update href attributes) before proceeding
    await new Promise(requestAnimationFrame);
    initPreload();
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
                // Makes the entire navElement be a link
                navElem.addEventListener("click", () => { window.location.href = href });

                if (href.includes(selectedPage)) {
                    const navTriangle = navBarDoc.createElement('div');
                    navTriangle.id = 'navTriangle';
                    navElem.appendChild(navTriangle);
                }
            });

            document.body.prepend(navBar);
        });
}

async function insertFooter() {
  await fetch('/footer.html')
      .then(response => response.text())
      .then(data => {
          const footerDoc = new DOMParser().parseFromString(data, 'text/html');
          const footer = footerDoc.querySelector('footer');

          const year = new Date(Date.now()).getFullYear();
          footerDoc.getElementById("yearLabel").innerHTML = `jenyyk ${year}©`;

          document.body.appendChild(footer);
      })
}
