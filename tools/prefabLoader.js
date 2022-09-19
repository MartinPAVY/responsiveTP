// made by Théo, because i love javascript and i hate modify manually ALL recurrent "prefab" and because we don't use php
document.addEventListener('DOMContentLoaded', async function () {
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

    let prefab = {
        "custom-article": null,
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
