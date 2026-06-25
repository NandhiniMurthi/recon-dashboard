const targets = [];

const addTargetBtn =
    document.getElementById("addTargetBtn");
const searchInput =
    document.getElementById("searchInput");

const filterStatus =
    document.getElementById("filterStatus");

addTargetBtn.addEventListener(
    "click",
    addTarget
);

function addTarget() {

    const domainInput =
        document.getElementById("domainInput");

    const statusInput =
        document.getElementById("statusInput");

    const domain =
        domainInput.value.trim();

    const status =
        statusInput.value;

    if (domain === "") {

        alert(
            "Please enter a domain"
        );

        return;
    }

    targets.push({
        domain: domain,
        status: status
    });

    domainInput.value = "";

    renderTargets();
}

function deleteTarget(index) {

    targets.splice(index, 1);

    renderTargets();
}

function renderTargets() {

    const targetsList =
        document.getElementById("targetsList");

    const targetCount =
        document.getElementById("targetCount");

    const activeCount =
        document.getElementById("activeCount");

    targetsList.innerHTML = "";

    targetCount.textContent =
        targets.length;

    const activeTargets =
        targets.filter(
            target => target.status === "Active"
        );

    activeCount.textContent =
        activeTargets.length;

    if (targets.length === 0) {

        targetsList.innerHTML = `
            <div class="empty-state">
                No targets added yet.
                Add your first target.
            </div>
        `;

        return;
    }

    targets.forEach((target, index) => {

        const div =
            document.createElement("div");

        div.className = "target";

        div.textContent =
            target.domain +
            " - " +
            target.status +
            " ";

        const deleteBtn =
            document.createElement("button");

        deleteBtn.textContent =
            "Delete";

        deleteBtn.addEventListener(
            "click",
            () => deleteTarget(index)
        );

        div.appendChild(deleteBtn);

        targetsList.appendChild(div);
    });
}

renderTargets();
