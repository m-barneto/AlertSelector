/**
 * Finds single element based on XPath
 * @param path XPath to evaluate
 * @returns element if found
 */
function getElementByXpath(path: string) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

/**
 * Gets all checkboxes that are in table
 * @returns Node list of checkbox elements
 */
function getAllCheckboxes(): NodeListOf<Element> {
    const elements = document.querySelectorAll("#cms-content-body-main > * > * > * > * > input");
    return elements;
}

/**
 * Goes through list of checkboxes and sets their checked attribute
 * @param checkboxes to go through
 * @param checked state that will be set
 */
function checkCheckboxes(checkboxes: NodeListOf<Element>, checked: boolean) {
    for (let i = 0; i < checkboxes.length; i++) {
        let checkbox = checkboxes[i] as HTMLInputElement;
        checkbox.checked = checked;
    }
}

/**
 * Runs when the document is fully loaded
 */
function onDocumentLoaded() {
    // Get header element
    const parent = getElementByXpath("/html/body/div[4]/div[2]/div[2]/div[2]/form/div[1]/div[5]");

    // Get all checkboxes that we want to modify
    const checkboxes = getAllCheckboxes();
    for (let i = 0; i < checkboxes.length; i++) {
        // Modify their size 15px -> 30px
        checkboxes[i].setAttribute("style", "width: 30px;height: 30px");
    }

    // Create select all button
    const selectAllButton = document.createElement("button");
    selectAllButton.innerText = "Select All";
    // Specify button type or else it acts as form submit!
    selectAllButton.type = "button";
    selectAllButton.onclick = () => {
        // Get all the checkboxes
        const checkboxes = getAllCheckboxes();
        // Set them as checked
        checkCheckboxes(checkboxes, true);
    }

    // Create deselect all button
    const deselectAllButton = document.createElement("button");
    deselectAllButton.innerText = "Deselect All";
    // Specify button type or else it acts as form submit!
    deselectAllButton.type = "button";
    deselectAllButton.onclick = () => {
        // Get all the checkboxes
        const checkboxes = getAllCheckboxes();
        // Set them to unchecked
        checkCheckboxes(checkboxes, false);
    }

    // Add our elements to the header with a space between them.
    parent?.appendChild(document.createTextNode("\u00a0\u00a0"));
    parent?.appendChild(selectAllButton);
    parent?.appendChild(document.createTextNode("\u00a0\u00a0"));
    parent?.appendChild(deselectAllButton);
}

// Run our code after the page is fully loaded.
document.body.onload = onDocumentLoaded;