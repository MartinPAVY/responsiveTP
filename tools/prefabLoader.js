// made by Théo, because i love javascript and i hate manually editing ALL recurring "prefab" and because we don't use php
document.addEventListener('DOMContentLoaded', async function () {
    //TODO optimize and make the code clear for anyone
    function getPrefab(fileName) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `../prefab/${fileName}.html`,
                success: (result) => {
                    resolve(result);
                },
                error: (xhr, status, error) => {
                    reject(error);
                },
            });
        });
    }
    /** this is where you create your custom elements
    * a custom HTML element need a dash {@link https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements}
    * to use this script ensure to add jquery (there is one in this directory) and this script in the head for your html file
    * your custom HTML element must have the same name in the file name in the prefab folder and in the variable below
    */
    let prefab = {
        "custom-RSSfeed": null,
        "custom-article": null,
        "custom-imagedArticle": null,
    }
    for (let key in prefab) {
        await getPrefab(key).then((result) => {
            prefab[key] = result;
        });
        let elements = document.getElementsByTagName(key);
        Object.values(elements).forEach((item) => {
            item.innerHTML = prefab[key];
        });
    }
});
