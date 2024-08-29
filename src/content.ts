function getElementByXpath(path: string) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function getAllCheckboxes(): NodeListOf<Element> {
    const elements = document.querySelectorAll("#cms-content-body-main > * > * > * > * > input");
    return elements;
}

function checkCheckboxes(checkboxes: NodeListOf<Element>, checked: boolean) {
    for (let i = 0; i < checkboxes.length; i++) {
        let checkbox = checkboxes[i] as HTMLInputElement;
        checkbox.checked = checked;
    }
}

function onDocumentLoaded() {
    const parent = getElementByXpath("/html/body/div[4]/div[2]/div[2]/div[2]/form/div[1]/div[5]");

    const checkboxes = getAllCheckboxes();
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].setAttribute("style", "width: 30px;height: 30px");
    }

    const selectAllButton = document.createElement("button");
    selectAllButton.innerText = "Select All";
    selectAllButton.type = "button";
    selectAllButton.onclick = () => {
        const checkboxes = getAllCheckboxes();
        checkCheckboxes(checkboxes, true);
    }

    const deselectAllButton = document.createElement("button");
    deselectAllButton.innerText = "Deselect All";
    deselectAllButton.type = "button";
    deselectAllButton.onclick = () => {
        const checkboxes = getAllCheckboxes();
        checkCheckboxes(checkboxes, false);
    }

    parent?.appendChild(document.createTextNode("\u00a0\u00a0"));
    parent?.appendChild(selectAllButton);
    parent?.appendChild(document.createTextNode("\u00a0\u00a0"));
    parent?.appendChild(deselectAllButton);
}

// Select the node that will be observed for mutations
document.body.onload = onDocumentLoaded;