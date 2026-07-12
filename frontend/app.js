let targets = [];
const addTargetBtn =
    document.getElementById("addTargetBtn");
const clearTargetsBtn =
    document.getElementById("clearTargetsBtn");

const lastUpdated =
    document.getElementById("lastUpdated");
const message =
    document.getElementById("message");
const searchInput =
    document.getElementById("searchInput");

const filterStatus =
    document.getElementById("filterStatus");

addTargetBtn.addEventListener(
    "click",
    addTarget
);
clearTargetsBtn.addEventListener(
    "click",
    clearTargets
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
    const targetExists =
    targets.some(
        target =>
            target.domain.toLowerCase() ===
            domain.toLowerCase()
    );

if (targetExists) {

    alert(
        "Target already exists."
    );

    return;
}

    targets.push({
    domain: domain,
    status: status,
    dateAdded: new Date().toLocaleString()
});
    targets.sort((a, b) =>
    a.domain.localeCompare(b.domain)
);
    saveTargets();
    updateLastUpdated();
    domainInput.value = "";
    message.textContent =
    "Target added successfully!";
    setTimeout(() => {
    message.textContent = "";
    }, 3000);

    renderTargets();
}

function deleteTarget(index) {

    const confirmDelete =
        confirm("Are you sure you want to delete this target?");

    if (!confirmDelete) {
        return;
    }

    targets.splice(index, 1);

    saveTargets();

    updateUI();
}
function editTarget(index) {
    const target =
    targets[index];
    const newDomain =
    prompt(
        "Edit target name:",
        target.domain
    );
}
function saveTargets() {

    localStorage.setItem(
        "targets",
        JSON.stringify(targets)
    );

}
function loadTargets() {

    const savedTargets =
        localStorage.getItem("targets");

    if (savedTargets) {

        targets =
            JSON.parse(savedTargets);

    }
}
function updateLastUpdated() {

    const now = new Date();

    lastUpdated.textContent =
        "Last Updated: " +
        now.toLocaleString();

}
}
function clearTargets() {

    const confirmDelete =
        confirm("Are you sure you want to remove all targets?");

    if (!confirmDelete) {
        return;
    }

    targets.length = 0;
    saveTargets();
    updateLastUpdated();
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

    filteredTargets.forEach((target) => {

    const index =
        targets.indexOf(target);

        const div =
    document.createElement("div");

div.className = "target";

div.innerHTML = `
    <div class="target-info">
        <strong>${target.domain}</strong>

        <span class="status-badge">
            ${target.status}
        </span>

        <small>
            Added: ${target.dateAdded}
        </small>
    </div>
`;
        const editBtn =
            document.createElement("button");

        editBtn.textContent =
            "Edit";
        const deleteBtn =
            document.createElement("button");

        deleteBtn.textContent =
            "Delete";
        editBtn.addEventListener(
            "click",
            () => editTarget(index)
        );
        deleteBtn.addEventListener(
            "click",
            () => deleteTarget(index)
        );
        div.appendChild(editBtn);

        div.appendChild(deleteBtn);

        targetsList.appendChild(div);
    });
}
loadTargets();

renderTargets();
