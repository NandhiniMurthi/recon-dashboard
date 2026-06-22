const targets = [];

const addTargetBtn =
    document.getElementById("addTargetBtn");

addTargetBtn.addEventListener(
    "click",
    addTarget
);

function addTarget() {

    const domainInput =
        document.getElementById(
            "domainInput"
        );

    const domain =
        domainInput.value.trim();

    if (domain === "") {

        alert(
            "Please enter a domain"
        );

        return;
    }

    targets.push({
        domain: domain,
        status: "status"
    });

    domainInput.value = "";

    renderTargets();
}

function renderTargets() {
     const targetsList =
        document.getElementById("targetsList");

    const targetCount =
        document.getElementById("targetCount");

    targetsList.innerHTML = "";

    targetCount.textContent =
        targets.length;
    
     if (targets.length === 0) {

        targetsList.innerHTML =
            "<p>No targets added yet</p>";

        return;

    }

    targets.forEach(target => {

        const div =
            document.createElement("div");

        div.className = "target";

        div.textContent =
            target.domain +
            " - " +
            target.status;
        const deleteBtn =
        document.createElement("button");

        deleteBtn.textContent =
        "Delete";
        div.appendChild(deleteBtn);


        targetsList.appendChild(div);
    });

    
}
renderTargets();
