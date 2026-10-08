import { StrictMode, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  Check,
  Clipboard,
  Code2,
  Download,
  FileJson,
  Github,
  LayoutTemplate,
  Moon,
  Play,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  Wand2,
  X,
} from "lucide-react";
import { evaluatePrompt, exportPromptRecord } from "./lib/evaluator";
import { templates } from "./data/templates";
import "./styles.css";

const STORAGE_KEY = "promptforge-v2";

type SavedPrompt = { id: string; title: string; prompt: string; updatedAt: string };

const starter = templates[0].prompt;

function App() {
  const [prompt, setPrompt] = useState(starter);
  const [saved, setSaved] = useState<SavedPrompt[]>([]);
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"workspace" | "templates" | "saved">("workspace");

  const score = useMemo(() => evaluatePrompt(prompt), [prompt]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const data = JSON.parse(raw) as { prompt?: string; saved?: SavedPrompt[]; dark?: boolean };
        if (data.prompt) setPrompt(data.prompt);
        if (data.saved) setSaved(data.saved);
        if (typeof data.dark === "boolean") setDark(data.dark);
      } catch {
        // Ignore corrupted local state.
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ prompt, saved, dark }));
  }, [prompt, saved, dark]);

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  function savePrompt() {
    const title = prompt.split("\n").find((line) => line.trim())?.replace(/:.*$/, "") || "Untitled Prompt";
    setSaved((items) => [
      { id: crypto.randomUUID(), title: title.slice(0, 48), prompt, updatedAt: new Date().toISOString() },
      ...items,
    ].slice(0, 25));
  }

  function downloadJSON() {
    const blob = new Blob([JSON.stringify(exportPromptRecord(prompt), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "promptforge-export.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  const filteredTemplates = templates.filter((item) =>
    `${item.title} ${item.category} ${item.description}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className={dark ? "app dark" : "app light"}>
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark"><Sparkles size={18} /></div>
          <div><strong>PromptForge</strong><span>AI Workbench <b>V2</b></span></div>
        </div>
        <div className="top-actions">
          <span className="status"><span className="dot" /> Local mode</span>
          <button className="icon-btn" onClick={() => setDark((v) => !v)} aria-label="Toggle theme">
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a className="github" href="https://github.com" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
        </div>
      </header>

      <main className="shell">
        <aside className="sidebar">
          <button className={activeTab === "workspace" ? "nav active" : "nav"} onClick={() => setActiveTab("workspace")}><Wand2 size={17} /> Playground</button>
          <button className={activeTab === "templates" ? "nav active" : "nav"} onClick={() => setActiveTab("templates")}><LayoutTemplate size={17} /> Templates <span>{templates.length}</span></button>
          <button className={activeTab === "saved" ? "nav active" : "nav"} onClick={() => setActiveTab("saved")}><FileJson size={17} /> Saved <span>{saved.length}</span></button>
          <div className="side-note">
            <ShieldCheck size={18} />
            <div><strong>Privacy-first</strong><p>Your prompts stay in this browser. No API key or server is required for evaluation.</p></div>
          </div>
          <div className="version">v2.0.0 · MIT License</div>
        </aside>

        <section className="content">
          {activeTab === "workspace" && (
            <>
              <div className="page-head">
                <div><p className="eyebrow">PROMPT ENGINEERING</p><h1>Build better prompts.</h1><p className="muted">Design, evaluate and export production-ready AI instructions.</p></div>
                <div className="head-actions">
                  <button className="secondary" onClick={() => setPrompt("")}><Plus size={16} /> New</button>
                  <button className="secondary" onClick={downloadJSON}><Download size={16} /> Export</button>
                </div>
              </div>

              <div className="workspace-grid">
                <div className="panel editor-panel">
                  <div className="panel-head"><span>Prompt editor</span><div className="mini-actions"><button onClick={copyPrompt}>{copied ? <Check size={15} /> : <Clipboard size={15} />} {copied ? "Copied" : "Copy"}</button><button onClick={savePrompt}>Save</button></div></div>
                  <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Write your prompt here..." spellCheck={false} />
                  <div className="editor-foot"><span>{prompt.length} characters</span><span>{prompt.trim() ? prompt.trim().split(/\s+/).length : 0} words</span><button onClick={() => setPrompt(starter)}><RotateCcw size={13} /> Reset starter</button></div>
                </div>

                <div className="panel score-panel">
                  <div className="panel-head"><span>Quality score</span><Activity size={16} /></div>
                  <div className="score-ring"><strong>{score.total}</strong><span>/100</span></div>
                  <div className={`grade ${score.grade.toLowerCase().replace(" ", "-")}`}>{score.grade}</div>
                  <p className="score-copy">Deterministic checks for observable prompt components. This is a heuristic, not a model judgment.</p>
                  <div className="checks">
                    {score.breakdown.map((item) => <div className="check-row" key={item.key}><div><b>{item.label}</b><small>{item.note}</small></div><strong>{item.score}</strong></div>)}
                  </div>
                </div>
              </div>

              <div className="info-grid">
                <div className="info-card"><Code2 size={18} /><div><b>Provider-neutral</b><p>Core evaluation does not lock the project to one AI vendor.</p></div></div>
                <div className="info-card"><ShieldCheck size={18} /><div><b>Local by default</b><p>Prompt data is stored locally with browser LocalStorage.</p></div></div>
                <div className="info-card"><FileJson size={18} /><div><b>Portable records</b><p>Export a versioned JSON record for downstream workflows.</p></div></div>
              </div>
            </>
          )}

          {activeTab === "templates" && (
            <div>
              <div className="page-head"><div><p className="eyebrow">CURATED LIBRARY</p><h1>Prompt templates</h1><p className="muted">Start from a structured prompt instead of a blank page.</p></div></div>
              <div className="search"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search templates..." />{search && <button onClick={() => setSearch("")}><X size={16}/></button>}</div>
              <div className="template-grid">{filteredTemplates.map((item) => <article className="template-card" key={item.id}><div className="template-top"><span>{item.category}</span><LayoutTemplate size={18}/></div><h2>{item.title}</h2><p>{item.description}</p><button className="primary" onClick={() => { setPrompt(item.prompt); setActiveTab("workspace"); }}><Play size={15}/> Use template</button></article>)}</div>
            </div>
          )}

          {activeTab === "saved" && (
            <div>
              <div className="page-head"><div><p className="eyebrow">LOCAL LIBRARY</p><h1>Saved prompts</h1><p className="muted">Stored only in this browser.</p></div></div>
              {saved.length === 0 ? <div className="empty"><FileJson size={28}/><h2>No saved prompts</h2><p>Save a prompt from the Playground and it will appear here.</p></div> : <div className="saved-list">{saved.map((item) => <article className="saved-row" key={item.id}><div><b>{item.title}</b><small>{new Date(item.updatedAt).toLocaleString()}</small></div><div><button className="secondary" onClick={() => { setPrompt(item.prompt); setActiveTab("workspace"); }}>Open</button><button className="danger" onClick={() => setSaved((items) => items.filter((x) => x.id !== item.id))}>Delete</button></div></article>)}</div>}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);