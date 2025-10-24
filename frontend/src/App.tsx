import { TaskList } from "./components/TaskList";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-primary via-primary-dark to-primary border-b border-primary-light/20 shadow-lg shadow-primary/20">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center shadow-lg shadow-secondary/50">
              <svg
                className="w-6 h-6 text-background"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">
                Gestor de Tareas
              </h1>
              <p className="text-sm text-secondary-light">
                Organiza tu día de manera efectiva
              </p>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <TaskList />
      </main>
    </div>
  );
}

export default App;
