// made by Theo, because I love javascript and I hate manually editing ALL recurring "prefab" and because we don't use php
/** this is where custom elements are loaded
 * a custom HTML element need a dash {@link https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements}
 * to use this script ensure to add jquery (there is one in this directory) and this script in the head for your html file
 * your custom HTML element must have the same name in the file name in the prefab folder and in the variable below
 */
async function loadPrefabs(filenames, location, prefabInPrefab = true) {
    //TODO optimize and make the code clear for anyone
    async function getPrefab(fileName) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${location}/${fileName}.html`,
                success: (result) => {
                    resolve(result);
                },
                error: (xhr, status, error) => {
                    reject(error);
                },
            });
        });
    }

   let prefabs = {};
    filenames.forEach((element) => prefabs[element] = null);

    async function saveContent(key) {
        let elements = document.getElementsByTagName(key);
        Object.values(elements).forEach((item) => {
            item.innerHTML = prefabs[key];
        });
    }

    for (let key in prefabs) {
        if (prefabInPrefab) {
            // if there're prefabs in prefabs we need to load them in order
            await getPrefab(key).then((result) => {
                prefabs[key] = result;
                saveContent(key);
            });
        } else {
            getPrefab(key).then((result) => {
                prefabs[key] = result;
                saveContent(key);
            });
        }
    }
};
