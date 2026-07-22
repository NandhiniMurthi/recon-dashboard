let targets = [];
let activities = [];
let editingIndex = -1;
const addTargetBtn =
    document.getElementById("addTargetBtn");
const clearTargetsBtn =
    document.getElementById("clearTargetsBtn");
const exportTargetsBtn =
    document.getElementById("exportTargetsBtn");
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
exportTargetsBtn.addEventListener(
    "click",
    exportTargets
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

    domainInput.value = "";
    message.textContent =
        "Target added successfully!";
    setTimeout(() => {
        message.textContent = "";
    }, 3000);

    saveTargets();
    addActivity(`Target Added: ${domain}`);
    updateUI();
}

function deleteTarget(index) {

    const confirmDelete =
        confirm("Are you sure you want to delete this target?");

    if (!confirmDelete) {
        return;
    }
    const deletedTarget =
        targets[index].domain;
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
    const duplicateTarget =
        targets.some((target, index) =>
            index !== editingIndex &&
            target.domain.toLowerCase() ===
            domain.toLowerCase()
        );

    if (duplicateTarget) {

        alert("Target already exists.");

        return;

    }
    targets[editingIndex].domain =
        domain;

    targets[editingIndex].status =
        status;
    targets.sort((a, b) =>
        a.domain.localeCompare(b.domain)
    );

    saveTargets();
    addActivity(`Target Edited: ${domain}`);
    closeEditForm();
    updateUI();
}

function cancelEdit() {

    closeEditForm();

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
function addActivity(message) {

    activities.unshift({
        message: message,
        time: new Date().toLocaleString()
    });

    if (activities.length > 10) {
        activities.pop();
    }

    renderActivityLog();

}
function renderActivityLog() {

    const activityLog =
        document.getElementById("activityLog");

    activityLog.innerHTML = "";

    if (activities.length === 0) {

        activityLog.innerHTML = `
<div class="empty-state">

<h3>No Recent Activity</h3>

<p>Your recent actions will appear here.</p>

</div>
`;

        return;

    }

    activities.forEach(activity => {

        const div =
            document.createElement("div");

        div.className = "target";

        div.innerHTML = `
            <strong>${activity.message}</strong>
            <small>${activity.time}</small>
        `;

        activityLog.appendChild(div);

    });

}
function clearTargets() {

    const confirmDelete =
        confirm("Are you sure you want to remove all targets?");

    if (!confirmDelete) {
        return;
    }

    targets.length = 0;

    saveTargets();

    updateUI();
}
function exportTargets() {

    if (targets.length === 0) {

        alert("No targets to export.");

        return;

    }

    const jsonData =
        JSON.stringify(targets, null, 2);

    const blob =
        new Blob([jsonData], {
            type: "application/json"
        });

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download = "targets.json";

    link.click();

    URL.revokeObjectURL(url);

}

function updateDashboardInsights() {

    const targetCount =
        document.getElementById("targetCount");

    const activeCount =
        document.getElementById("activeCount");

    const pendingCount =
        document.getElementById("pendingCount");

    const completedCount =
        document.getElementById("completedCount");

    const completionPercentage =
        document.getElementById("completionPercentage");

    const todayCount =
        document.getElementById("todayCount");

    const activeTargets =
        targets.filter(target =>
            target.status === "Active"
        );

    const pendingTargets =
        targets.filter(target =>
            target.status === "Pending"
        );

    const completedTargets =
        targets.filter(target =>
            target.status === "Completed"
        );

    targetCount.textContent =
        targets.length;

    activeCount.textContent =
        activeTargets.length;

    pendingCount.textContent =
        pendingTargets.length;

    completedCount.textContent =
        completedTargets.length;

    const completion =
        targets.length === 0
            ? 0
            : Math.round(
                (completedTargets.length / targets.length) * 100
            );

    completionPercentage.textContent =
        `${completion}%`;

    const today =
        new Date().toLocaleDateString();

    const addedToday =
        targets.filter(target =>
            target.dateAdded.startsWith(today)
        );

    todayCount.textContent =
        `Added Today: ${addedToday.length}`;

}

function renderTargets() {

    const targetsList =
        document.getElementById("targetsList");

    const targetCount =
        document.getElementById("targetCount");

    const activeCount =
        document.getElementById("activeCount");
    const pendingCount =
        document.getElementById("pendingCount");

    const completedCount =
        document.getElementById("completedCount");

    const completionPercentage =
        document.getElementById("completionPercentage");

    const todayCount =
        document.getElementById("todayCount");
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

    // Update dashboard insights (use single shared function)
    updateDashboardInsights();

    if (filteredTargets.length === 0) {

        if (targets.length === 0) {

            targetsList.innerHTML = `
            <div class="empty-state">
                <h3>No Targets Found</h3>
                <p>Click "Add Target" to start tracking your first target.</p>
            </div>
        `;

        } else {

            targetsList.innerHTML = `
            <div class="empty-state">
                <h3>No Matching Targets</h3>
                <p>Try changing the search text or filter.</p>
            </div>
        `;

        }

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

function updateUI() {

    renderTargets();

    updateLastUpdated();

}

loadTargets();

updateUI();
