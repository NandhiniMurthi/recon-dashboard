let targets = [];
let editingIndex = -1;
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
const editForm =
    document.getElementById("editForm");

const editDomainInput =
    document.getElementById("editDomainInput");

const editStatusInput =
    document.getElementById("editStatusInput");

const saveEditBtn =
    document.getElementById("saveEditBtn");

const cancelEditBtn =
    document.getElementById("cancelEditBtn");

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
saveEditBtn.addEventListener(
    "click",
    saveEditedTarget
);

cancelEditBtn.addEventListener(
    "click",
    cancelEdit
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

    editingIndex = index;

    const target =
        targets[index];

    editDomainInput.value =
        target.domain;

    editStatusInput.value =
        target.status;

    editForm.style.display =
        "block";
}
function saveEditedTarget() {

    if (editingIndex === -1) {
        return;
    }

    const domain =
        editDomainInput.value.trim();

    const status =
        editStatusInput.value;

    if (domain === "") {

        alert(
            "Target name cannot be empty."
        );

        return;
    }

    targets[editingIndex].domain =
        domain;

    targets[editingIndex].status =
        status;

    saveTargets();

    updateUI();

    editForm.style.display =
        "none";

    editingIndex = -1;
}

function cancelEdit() {

    editForm.style.display =
        "none";

    editingIndex = -1;
}

function closeEditForm() {

    editForm.style.display =
        "none";

    editingIndex = -1;

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
        editBtn.classList.add("action-btn");
        deleteBtn.classList.add("action-btn");
        div.appendChild(editBtn);

        div.appendChild(deleteBtn);

        targetsList.appendChild(div);
    });
}
loadTargets();

renderTargets();
