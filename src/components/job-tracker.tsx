"use client";

import { useMemo, useState, useSyncExternalStore, type FormEvent } from "react";

const STORAGE_KEY = "role-ready.job-tracker.v1";
const CSV_HEADERS = [
  "Company",
  "Role",
  "Job URL",
  "Date Saved",
  "Date Applied",
  "Stage",
  "Next Action",
  "Follow-up Date",
  "Contact",
  "Notes",
];
const STAGES = ["Interested", "Preparing", "Applied", "Interviewing", "Offer", "Closed"] as const;

type Stage = (typeof STAGES)[number];

type Application = {
  id: string;
  company: string;
  role: string;
  jobUrl: string;
  dateSaved: string;
  dateApplied: string;
  stage: Stage;
  nextAction: string;
  followUpDate: string;
  contact: string;
  notes: string;
};

type ApplicationDraft = Omit<Application, "id">;
type StageFilter = "All stages" | Stage;
type TrackerSnapshot = {
  applications: Application[];
  loaded: boolean;
  hasUnreadableData: boolean;
  notice: string;
};

const serverSnapshot: TrackerSnapshot = {
  applications: [],
  loaded: false,
  hasUnreadableData: false,
  notice: "",
};
let browserSnapshot: TrackerSnapshot | undefined;
const trackerListeners = new Set<() => void>();

const emptyDraft: ApplicationDraft = {
  company: "",
  role: "",
  jobUrl: "",
  dateSaved: "",
  dateApplied: "",
  stage: "Interested",
  nextAction: "",
  followUpDate: "",
  contact: "",
  notes: "",
};

function isApplication(value: unknown): value is Application {
  if (!value || typeof value !== "object") return false;

  const application = value as Record<string, unknown>;
  return (
    typeof application.id === "string" &&
    typeof application.company === "string" &&
    typeof application.role === "string" &&
    typeof application.jobUrl === "string" &&
    typeof application.dateSaved === "string" &&
    typeof application.dateApplied === "string" &&
    isStage(application.stage) &&
    typeof application.nextAction === "string" &&
    typeof application.followUpDate === "string" &&
    typeof application.contact === "string" &&
    typeof application.notes === "string"
  );
}

function isStage(value: unknown): value is Stage {
  return typeof value === "string" && STAGES.some((stage) => stage === value);
}

function isStageFilter(value: string): value is StageFilter {
  return value === "All stages" || isStage(value);
}

function isApplicationList(value: unknown): value is Application[] {
  return Array.isArray(value) && value.every(isApplication);
}

function readTrackerSnapshot(): TrackerSnapshot {
  if (browserSnapshot) return browserSnapshot;

  let saved: string | null;
  try {
    saved = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    browserSnapshot = {
      applications: [],
      loaded: true,
      hasUnreadableData: false,
      notice:
        "This browser could not read saved tracker data. You can continue for this visit and export a backup before leaving.",
    };
    return browserSnapshot;
  }

  if (!saved) {
    browserSnapshot = { ...serverSnapshot, loaded: true };
    return browserSnapshot;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(saved);
  } catch {
    parsed = undefined;
  }
  browserSnapshot = isApplicationList(parsed)
    ? { applications: parsed, loaded: true, hasUnreadableData: false, notice: "" }
    : {
        applications: [],
        loaded: true,
        hasUnreadableData: true,
        notice:
          "Saved tracker data could not be read. It has not been changed; clear the saved data below to start a new tracker.",
      };
  return browserSnapshot;
}

function getServerSnapshot() {
  return serverSnapshot;
}

function subscribeToTracker(listener: () => void) {
  trackerListeners.add(listener);
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      browserSnapshot = undefined;
      listener();
    }
  };
  window.addEventListener("storage", handleStorage);

  return () => {
    trackerListeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function publishSnapshot(snapshot: TrackerSnapshot) {
  browserSnapshot = snapshot;
  trackerListeners.forEach((listener) => listener());
}

function localDateString() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function newApplicationId() {
  return typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function safeJobUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function escapeCsvCell(value: string) {
  const safeValue = /^[\s\u0000-\u001f]*[=+\-@]/.test(value) ? `'${value}` : value;
  return `"${safeValue.replaceAll('"', '""')}"`;
}

function downloadCsv(applications: Application[]) {
  const rows = applications.map((application) =>
    [
      application.company,
      application.role,
      application.jobUrl,
      application.dateSaved,
      application.dateApplied,
      application.stage,
      application.nextAction,
      application.followUpDate,
      application.contact,
      application.notes,
    ]
      .map(escapeCsvCell)
      .join(","),
  );
  const csv = `\uFEFF${CSV_HEADERS.map(escapeCsvCell).join(",")}\r\n${rows.join("\r\n")}`;
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "role-ready-job-search-tracker.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function JobTracker() {
  const tracker = useSyncExternalStore(
    subscribeToTracker,
    readTrackerSnapshot,
    getServerSnapshot,
  );
  const { applications, hasUnreadableData, loaded: isReady, notice: storageNotice } = tracker;
  const [draft, setDraft] = useState<ApplicationDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<string>();
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<StageFilter>("All stages");

  const today = localDateString();
  const followUpsDue = applications.filter(
    (application) =>
      application.followUpDate &&
      application.followUpDate <= today &&
      application.stage !== "Closed",
  ).length;
  const inProgress = applications.filter(
    (application) => ["Preparing", "Applied", "Interviewing"].includes(application.stage),
  ).length;

  const visibleApplications = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();
    return applications
      .filter((application) => stageFilter === "All stages" || application.stage === stageFilter)
      .filter((application) => {
        if (!normalizedSearch) return true;
        return [
          application.company,
          application.role,
          application.nextAction,
          application.contact,
          application.notes,
        ]
          .join(" ")
          .toLocaleLowerCase()
          .includes(normalizedSearch);
      })
      .sort((left, right) => {
        const leftDate = left.followUpDate || "9999-12-31";
        const rightDate = right.followUpDate || "9999-12-31";
        return leftDate.localeCompare(rightDate) || right.dateSaved.localeCompare(left.dateSaved);
      });
  }, [applications, search, stageFilter]);

  function saveApplications(nextApplications: Application[]) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextApplications));
      publishSnapshot({
        applications: nextApplications,
        loaded: true,
        hasUnreadableData: false,
        notice: "Saved in this browser.",
      });
    } catch {
      publishSnapshot({
        applications: nextApplications,
        loaded: true,
        hasUnreadableData: false,
        notice:
          "Browser storage is unavailable. Your changes remain open in this tab; export a CSV backup before leaving.",
      });
    }
  }

  function handleExport() {
    try {
      downloadCsv(applications);
    } catch {
      publishSnapshot({
        ...tracker,
        notice: "This browser could not create the CSV export. Try the blank spreadsheet download instead.",
      });
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isReady || hasUnreadableData) return;

    const application: Application = {
      ...draft,
      company: draft.company.trim(),
      role: draft.role.trim(),
      dateSaved: draft.dateSaved || today,
      id: editingId ?? newApplicationId(),
    };
    const nextApplications = editingId
      ? applications.map((saved) => (saved.id === editingId ? application : saved))
      : [application, ...applications];

    saveApplications(nextApplications);
    setDraft(emptyDraft);
    setEditingId(undefined);
  }

  function startEditing(application: Application) {
    setDraft({
      company: application.company,
      role: application.role,
      jobUrl: application.jobUrl,
      dateSaved: application.dateSaved,
      dateApplied: application.dateApplied,
      stage: application.stage,
      nextAction: application.nextAction,
      followUpDate: application.followUpDate,
      contact: application.contact,
      notes: application.notes,
    });
    setEditingId(application.id);
    document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
  }

  function removeApplication(id: string) {
    if (!window.confirm("Remove this role from your saved tracker?")) return;
    saveApplications(applications.filter((application) => application.id !== id));
    if (editingId === id) {
      setDraft(emptyDraft);
      setEditingId(undefined);
    }
  }

  function clearSavedData() {
    if (!window.confirm("Clear all tracker entries saved in this browser? This cannot be undone.")) {
      return;
    }

    try {
      window.localStorage.removeItem(STORAGE_KEY);
      publishSnapshot({
        applications: [],
        loaded: true,
        hasUnreadableData: false,
        notice: "Saved tracker data cleared from this browser.",
      });
    } catch {
      publishSnapshot({
        applications: [],
        loaded: true,
        hasUnreadableData: false,
        notice: "The browser could not clear its saved data. Entries are cleared for this visit only.",
      });
    }
    setDraft(emptyDraft);
    setEditingId(undefined);
    setSearch("");
    setStageFilter("All stages");
  }

  function updateDraft<K extends keyof ApplicationDraft>(key: K, value: ApplicationDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  return (
    <section className="tracker" aria-label="Job application tracker">
      <div className="tracker-toolbar">
        <div className="tracker-stats" aria-label="Tracker summary">
          <div className="tracker-stat"><strong>{applications.length}</strong><span>roles saved</span></div>
          <div className="tracker-stat"><strong>{inProgress}</strong><span>in progress</span></div>
          <div className="tracker-stat"><strong>{followUpsDue}</strong><span>follow-ups due</span></div>
        </div>
        <div className="tracker-tools">
          <button
            className="button button--secondary"
            type="button"
            onClick={handleExport}
            disabled={!isReady}
          >
            Export CSV
          </button>
          <a className="button button--secondary" href="/downloads/job-search-tracker.csv" download>
            Blank spreadsheet
          </a>
        </div>
      </div>

      <p className="tracker-privacy">
        Your entries are saved only in this browser on this device. There is no account or
        cloud sync. Export a CSV to keep a backup or move your tracker elsewhere.
      </p>
      {storageNotice && (
        <p className={`tracker-notice${hasUnreadableData ? " tracker-notice--warning" : ""}`} role="status">
          {storageNotice}
        </p>
      )}

      {hasUnreadableData ? (
        <button className="button button--secondary tracker-reset" type="button" onClick={clearSavedData}>
          Clear unreadable saved data and start fresh
        </button>
      ) : (
        <form className="tracker-form" id="application-form" onSubmit={handleSubmit}>
          <div className="tracker-form__heading">
            <div>
              <p className="shop-eyebrow">{editingId ? "UPDATE YOUR TRACKER" : "ONE ROLE AT A TIME"}</p>
              <h2>{editingId ? "Edit a saved role" : "Add a role"}</h2>
            </div>
            {editingId && (
              <button
                className="text-link tracker-cancel"
                type="button"
                onClick={() => { setDraft(emptyDraft); setEditingId(undefined); }}
              >
                Cancel edit
              </button>
            )}
          </div>
          <fieldset disabled={!isReady}>
            <legend className="visually-hidden">Job application details</legend>
            <div className="tracker-fields">
              <label>
                <span>Company <span aria-hidden="true">*</span></span>
                <input
                  autoComplete="organization"
                  maxLength={120}
                  onChange={(event) => updateDraft("company", event.target.value)}
                  required
                  value={draft.company}
                />
              </label>
              <label>
                <span>Role <span aria-hidden="true">*</span></span>
                <input
                  maxLength={120}
                  onChange={(event) => updateDraft("role", event.target.value)}
                  required
                  value={draft.role}
                />
              </label>
              <label className="tracker-field--wide">
                Job link
                <input
                  autoComplete="url"
                  maxLength={2048}
                  onChange={(event) => updateDraft("jobUrl", event.target.value)}
                  placeholder="https://"
                  type="url"
                  value={draft.jobUrl}
                />
              </label>
              <label>
                Stage
                <select
                  onChange={(event) => {
                    if (isStage(event.target.value)) updateDraft("stage", event.target.value);
                  }}
                  value={draft.stage}
                >
                  {STAGES.map((stage) => <option key={stage}>{stage}</option>)}
                </select>
              </label>
              <label>
                Date saved
                <input
                  onChange={(event) => updateDraft("dateSaved", event.target.value)}
                  type="date"
                  value={draft.dateSaved}
                />
              </label>
              <label>
                Date applied
                <input
                  onChange={(event) => updateDraft("dateApplied", event.target.value)}
                  type="date"
                  value={draft.dateApplied}
                />
              </label>
              <label>
                Follow-up date
                <input
                  onChange={(event) => updateDraft("followUpDate", event.target.value)}
                  type="date"
                  value={draft.followUpDate}
                />
              </label>
              <label className="tracker-field--wide">
                Next action
                <input
                  maxLength={240}
                  onChange={(event) => updateDraft("nextAction", event.target.value)}
                  placeholder="e.g. Tailor portfolio for this role"
                  value={draft.nextAction}
                />
              </label>
              <label>
                Contact (optional)
                <input
                  autoComplete="name"
                  maxLength={120}
                  onChange={(event) => updateDraft("contact", event.target.value)}
                  value={draft.contact}
                />
              </label>
              <label className="tracker-field--wide">
                Notes (optional)
                <textarea
                  maxLength={1000}
                  onChange={(event) => updateDraft("notes", event.target.value)}
                  rows={3}
                  value={draft.notes}
                />
              </label>
            </div>
            <div className="tracker-form__actions">
              <button className="button button--primary" type="submit">
                {editingId ? "Save changes" : "Save role"}
              </button>
              {applications.length > 0 && (
                <button className="text-link tracker-clear" type="button" onClick={clearSavedData}>
                  Clear all saved entries
                </button>
              )}
            </div>
          </fieldset>
        </form>
      )}

      <div className="tracker-list">
        <div className="tracker-list__heading">
          <div>
            <p className="shop-eyebrow">YOUR SEARCH</p>
            <h2>Saved roles <span>({visibleApplications.length})</span></h2>
          </div>
          <div className="tracker-filters">
            <label className="visually-hidden" htmlFor="tracker-search">Search saved roles</label>
            <input
              id="tracker-search"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search roles"
              type="search"
              value={search}
            />
            <label className="visually-hidden" htmlFor="tracker-stage">Filter by stage</label>
            <select
              id="tracker-stage"
              onChange={(event) => {
                if (isStageFilter(event.target.value)) setStageFilter(event.target.value);
              }}
              value={stageFilter}
            >
              <option>All stages</option>
              {STAGES.map((stage) => <option key={stage}>{stage}</option>)}
            </select>
          </div>
        </div>
        {!isReady ? (
          <p className="tracker-empty" role="status">Loading your tracker…</p>
        ) : visibleApplications.length === 0 ? (
          <div className="tracker-empty">
            <h3>{applications.length ? "No matching roles" : "Your tracker is ready."}</h3>
            <p>
              {applications.length
                ? "Try a different search or stage filter."
                : "Add one role above to keep its next step close at hand."}
            </p>
          </div>
        ) : (
          <ul className="tracker-records">
            {visibleApplications.map((application) => {
              const jobUrl = safeJobUrl(application.jobUrl);
              const isOverdue =
                application.followUpDate &&
                application.followUpDate < today &&
                application.stage !== "Closed";
              return (
                <li className="tracker-record" key={application.id}>
                  <div className="tracker-record__main">
                    <div className="tracker-record__title">
                      <div>
                        <h3>{application.role}</h3>
                        <p>{application.company}</p>
                      </div>
                      <span className={`tracker-stage tracker-stage--${application.stage.toLowerCase()}`}>
                        {application.stage}
                      </span>
                    </div>
                    <dl className="tracker-record__details">
                      {application.nextAction && (
                        <div><dt>Next action</dt><dd>{application.nextAction}</dd></div>
                      )}
                      {application.followUpDate && (
                        <div className={isOverdue ? "tracker-overdue" : ""}>
                          <dt>{isOverdue ? "Follow-up overdue" : "Follow-up"}</dt>
                          <dd>{application.followUpDate}</dd>
                        </div>
                      )}
                      {application.dateApplied && (
                        <div><dt>Applied</dt><dd>{application.dateApplied}</dd></div>
                      )}
                      {application.contact && (
                        <div><dt>Contact</dt><dd>{application.contact}</dd></div>
                      )}
                    </dl>
                    {application.notes && <p className="tracker-record__notes">{application.notes}</p>}
                    {jobUrl && (
                      <a className="text-link tracker-record__link" href={jobUrl} target="_blank" rel="noreferrer">
                        Open job posting <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                  <div className="tracker-record__actions">
                    <button className="text-link" type="button" onClick={() => startEditing(application)}>
                      Edit
                    </button>
                    <button
                      className="text-link tracker-delete"
                      type="button"
                      onClick={() => removeApplication(application.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <p className="tracker-disclaimer">
        Keep confidential employer information and sensitive personal data out of this tool.
        Use the export button to make your own backup. Clearing browser data also removes
        entries saved here.
      </p>
    </section>
  );
}
