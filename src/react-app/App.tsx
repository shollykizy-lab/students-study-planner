import { useMemo, useState } from "react";
import "./App.css";

type Task = { id: number; title: string; course: string; time: string; done: boolean; color: string };

const initialTasks: Task[] = [
  { id: 1, title: "Review chapter 4: Cell structure", course: "Biology", time: "09:30 AM", done: false, color: "mint" },
  { id: 2, title: "Complete quadratic equations practice", course: "Mathematics", time: "11:00 AM", done: false, color: "lilac" },
  { id: 3, title: "Read the French revolution notes", course: "History", time: "02:30 PM", done: true, color: "peach" },
];
const navItems = ["Dashboard", "My courses", "Study planner", "Examinations", "Digital library"];
const courses = [
  { name: "Biology", detail: "Cell structure & function", progress: 72, color: "green", icon: "◉", next: "Lesson 8 · 24 min" },
  { name: "Mathematics", detail: "Algebra & equations", progress: 48, color: "purple", icon: "∑", next: "Practice set · 12 questions" },
  { name: "World History", detail: "Revolutions & change", progress: 86, color: "orange", icon: "◷", next: "Chapter 6 · 18 min" },
];

function App() {
  const [active, setActive] = useState("Dashboard");
  const [tasks, setTasks] = useState(initialTasks);
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredTasks = useMemo(() => tasks.filter((task) => `${task.title} ${task.course}`.toLowerCase().includes(query.toLowerCase())), [tasks, query]);
  const completed = tasks.filter((task) => task.done).length;

  function addTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newTask.trim()) return;
    setTasks((current) => [...current, { id: Date.now(), title: newTask.trim(), course: "Personal study", time: "Today", done: false, color: "blue" }]);
    setNewTask("");
    setShowTaskForm(false);
  }
  function askAssistant(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!question.trim()) return;
    setAnswer(`Great question! Let's break “${question.trim()}” into smaller ideas. Start by identifying what you already know, then connect it to one example. Want me to make a short practice quiz next?`);
    setQuestion("");
  }

  const isDashboard = active === "Dashboard";
  return (
    <div className={`app-shell ${dark ? "theme-dark" : ""}`}>
      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <a className="brand" href="#home" onClick={() => setActive("Dashboard")}><span className="brand-mark">e<span>✦</span></span><span>edusmart<small>LEARN WITH PURPOSE</small></span></a>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item, index) => <button key={item} className={`nav-item ${active === item ? "active" : ""}`} onClick={() => { setActive(item); setMenuOpen(false); }}><span className="nav-icon">{["⌂", "▤", "▦", "▣", "▧"][index]}</span>{item}{item === "Examinations" && <span className="nav-count">2</span>}</button>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="streak-card"><div className="streak-icon">✦</div><div><strong>5 day streak!</strong><p>Keep showing up. You’re doing great.</p></div><span className="streak-spark">✧</span></div>
          <button className="nav-item settings-item" onClick={() => setActive("Settings")}><span className="nav-icon">⚙</span>Settings</button>
          <div className="profile-row"><div className="avatar">JD</div><div className="profile-info"><strong>Jamie Davis</strong><span>Student account</span></div><button className="more-button" aria-label="Profile options">···</button></div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar"><button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">☰</button><div className="breadcrumb">Pages <span>/</span> <strong>{active}</strong></div><div className="top-actions"><label className="search-box"><span>⌕</span><input aria-label="Search" placeholder="Search anything..." value={query} onChange={(e) => setQuery(e.target.value)} /><kbd>⌘ K</kbd></label><button className="icon-button theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle dark mode">{dark ? "☼" : "◐"}</button><button className="icon-button notification" aria-label="Notifications">♧<i /></button><div className="avatar top-avatar">JD</div></div></header>
        <div className="page-content">
          {isDashboard ? <>
            <section className="welcome-row"><div><div className="eyebrow">WEDNESDAY, OCTOBER 16, 2024 <span className="sun">☀</span></div><h1>Good morning, Jamie <span className="wave">✋</span></h1><p className="welcome-subtitle">Ready to make today a little more brilliant?</p></div><button className="primary-button" onClick={() => setShowTaskForm(true)}><span>＋</span> Plan a study session</button></section>
            <section className="stats-grid" aria-label="Study statistics">
              <article className="stat-card"><div className="stat-top"><span>Study time</span><span className="stat-icon blue-icon">◷</span></div><div className="stat-value">18.5 <small>hrs</small></div><div className="stat-foot"><span className="trend">↗ 12.8%</span><span>vs. last week</span><div className="mini-bars"><i/><i/><i/><i/><i/><i/><i/></div></div></article>
              <article className="stat-card"><div className="stat-top"><span>Tasks completed</span><span className="stat-icon green-icon">✓</span></div><div className="stat-value">{completed + 11}<small> / 16</small></div><div className="stat-foot"><span className="trend">↗ 8.2%</span><span>vs. last week</span><div className="mini-bars green-bars"><i/><i/><i/><i/><i/><i/><i/></div></div></article>
              <article className="stat-card"><div className="stat-top"><span>Current streak</span><span className="stat-icon orange-icon">✦</span></div><div className="stat-value">5 <small>days</small></div><div className="stat-foot"><span className="streak-note">Your best is 12 days. Keep it up!</span><div className="streak-dots">{[1,2,3,4,5,6,7].map((n) => <i className={n < 6 ? "filled" : ""} key={n}>{n < 6 ? "✓" : ""}</i>)}</div></div></article>
              <article className="stat-card focus-card"><div className="stat-top"><span>Focus score</span><span className="stat-icon purple-icon">✧</span></div><div className="stat-value">92<small>/100</small></div><div className="focus-line"><span /></div><div className="stat-foot"><span>You're in your top 10% this week!</span></div></article>
            </section>

            <div className="content-grid">
              <section className="panel study-panel"><div className="panel-heading"><div><h2>Study activity</h2><p>Your learning rhythm at a glance</p></div><button className="select-button">This week <span>⌄</span></button></div><div className="activity-summary"><strong>12h 40m</strong><span className="trend">↗ 12.8%</span><small>vs. last week</small></div><div className="chart-wrap"><div className="chart-y"><span>6h</span><span>4h</span><span>2h</span><span>0h</span></div><div className="chart"><div className="chart-grid"><i/><i/><i/><i/></div><svg viewBox="0 0 640 164" preserveAspectRatio="none" role="img" aria-label="Study time trend over the week"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#7667ef" stopOpacity=".18"/><stop offset="100%" stopColor="#7667ef" stopOpacity="0"/></linearGradient></defs><path className="chart-area" d="M0 121 C35 112 45 102 80 105 S130 87 160 94 S218 104 240 79 S288 65 320 75 S369 58 400 68 S450 87 480 54 S526 45 560 56 S610 20 640 29 L640 164 L0 164Z"/><path className="chart-path" d="M0 121 C35 112 45 102 80 105 S130 87 160 94 S218 104 240 79 S288 65 320 75 S369 58 400 68 S450 87 480 54 S526 45 560 56 S610 20 640 29"/><circle cx="480" cy="54" r="5" className="chart-dot"/></svg><div className="chart-x"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div></div></section>

              <section className="panel plan-panel"><div className="panel-heading"><div><h2>Today’s plan <span className="today-pill">TODAY</span></h2><p>Little steps add up to big things.</p></div><button className="text-button" onClick={() => setActive("Study planner")}>View planner <span>→</span></button></div><div className="task-list">{filteredTasks.length ? filteredTasks.map((task) => <div className={`task-row ${task.done ? "task-done" : ""}`} key={task.id}><button className={`task-check ${task.done ? "checked" : ""}`} aria-label={task.done ? "Mark incomplete" : "Mark complete"} onClick={() => setTasks((current) => current.map((item) => item.id === task.id ? { ...item, done: !item.done } : item))}>{task.done ? "✓" : ""}</button><div className={`task-dot ${task.color}`} /><div className="task-copy"><strong>{task.title}</strong><span>{task.course}</span></div><time>{task.time}</time></div>) : <div className="empty-state">No tasks match “{query}”.</div>}</div><button className="add-task" onClick={() => setShowTaskForm(true)}>＋ <span>Add a task</span></button></section>

              <section className="panel courses-panel"><div className="panel-heading"><div><h2>Continue learning</h2><p>Pick up right where you left off</p></div><button className="text-button" onClick={() => setActive("My courses")}>All courses <span>→</span></button></div><div className="course-list">{courses.map((course) => <button className="course-row" key={course.name} onClick={() => setActive("My courses")}><span className={`course-icon ${course.color}`}>{course.icon}</span><span className="course-info"><strong>{course.name}</strong><small>{course.detail}</small><span className="progress-track"><i className={course.color} style={{ width: `${course.progress}%` }} /></span></span><span className="course-progress">{course.progress}%<small>{course.next}</small></span><span className="course-arrow">→</span></button>)}</div></section>

              <section className="assistant-card"><div className="assistant-glow">✦</div><div className="assistant-content"><span className="assistant-label"><i/> YOUR AI STUDY BUDDY</span><h2>Meet your new<br/>favorite study partner.</h2><p>Stuck on a tricky topic? Get a clear explanation, a quick quiz, or a fresh perspective.</p><button className="assistant-button" onClick={() => setAssistantOpen(true)}>Ask EduAI <span>↗</span></button><div className="assistant-decoration">✳</div></div></section>
            </div>
            <footer className="page-footer"><span>Made for curious minds <b>✦</b></span><span>Keep going, you’re doing amazing.</span></footer>
          </> : <section className="section-view"><div className="eyebrow">EDUSMART WORKSPACE</div><h1>{active}</h1><p className="welcome-subtitle">A focused space to help you learn smarter and reach your goals.</p><div className="section-card-grid"><article className="section-card"><span className="section-card-icon">{active === "My courses" ? "▤" : active === "Examinations" ? "▣" : active === "Digital library" ? "▧" : "▦"}</span><h2>{active === "My courses" ? "Your learning journey" : active === "Examinations" ? "Ready when you are" : active === "Digital library" ? "Knowledge at your fingertips" : "Make a plan that works"}</h2><p>{active === "My courses" ? "Your enrolled courses and progress are ready to explore." : active === "Examinations" ? "Review upcoming exams, practice questions, and past results." : active === "Digital library" ? "Find notes, revision materials, and resources for your next study session." : "Organize your time, set study goals, and keep your learning on track."}</p><button className="primary-button" onClick={() => setActive("Dashboard")}>Back to dashboard <span>→</span></button></article><article className="section-card section-tip"><span className="assistant-label"><i/> A LITTLE INSPIRATION</span><h2>Progress over perfection.</h2><p>Even 20 minutes of focused learning today can make tomorrow easier. You’ve got this!</p><div className="tip-decoration">✦</div></article></div></section>}
        </div>
      </main>

      {showTaskForm && <div className="modal-backdrop" onClick={() => setShowTaskForm(false)}><form className="task-modal" onSubmit={addTask} onClick={(e) => e.stopPropagation()}><button type="button" className="modal-close" onClick={() => setShowTaskForm(false)}>×</button><span className="modal-icon">✦</span><h2>Plan a study session</h2><p>Choose one small thing to make progress on today.</p><label htmlFor="task-title">What would you like to study?</label><input id="task-title" autoFocus placeholder="e.g. Review biology notes" value={newTask} onChange={(e) => setNewTask(e.target.value)} /><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowTaskForm(false)}>Cancel</button><button className="primary-button" type="submit">Add to my plan</button></div></form></div>}
      {assistantOpen && <div className="modal-backdrop" onClick={() => setAssistantOpen(false)}><section className="assistant-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setAssistantOpen(false)}>×</button><span className="assistant-label"><i/> EDUSMART AI</span><h2>Your study buddy, on call.</h2><p>Ask about a tricky topic, or ask for a study tip. This demo gives you a sample learning prompt—connect an AI provider to enable live answers.</p>{answer && <div className="ai-answer">{answer}</div>}<form className="ai-form" onSubmit={askAssistant}><input autoFocus aria-label="Ask EduAI" placeholder="What would you like help with?" value={question} onChange={(e) => setQuestion(e.target.value)} /><button className="primary-button" type="submit">Ask <span>→</span></button></form><div className="prompt-chips"><button onClick={() => setQuestion("Explain photosynthesis simply")}>Explain a topic</button><button onClick={() => setQuestion("Make me a quick practice quiz")}>Make a practice quiz</button></div></section></div>}
    </div>
  );
}

export default App;
