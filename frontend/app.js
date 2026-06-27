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
searchInput.addEventListener(
    "input",
    renderTargets
);

filterStatus.addEventListener(
    "change",
    renderTargets
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
    const resultCount =
    document.getElementById("resultCount");

    const searchText =
    searchInput.value.toLowerCase();

    const selectedStatus =
    filterStatus.value;

    targetsList.innerHTML = "";
    const filteredTargets =
    targets.filter(target => {

        const matchesSearch =
            target.domain
                .toLowerCase()
                .includes(searchText);

        const matchesStatus =
            selectedStatus === "All" ||
            target.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    targetCount.textContent =
        targets.length;
    resultCount.textContent =
    `Showing ${filteredTargets.length} of ${targets.length} targets`;

    const activeTargets =
        targets.filter(
            target => target.status === "Active"
        );

    activeCount.textContent =
        activeTargets.length;

    if (filteredTargets.length === 0){

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
