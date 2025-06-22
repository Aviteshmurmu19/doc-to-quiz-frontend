// client/src/App.jsx
import { useState } from "react";
import Layout from "./components/Layout";
import InputArea from "./components/InputArea";
import { generateQuiz } from "./services/apiClient";
import QuestionPaper from "./components/QuestionPaper";
import useLocalStorage from "./hooks/useLocalStorage";

const Alert = ({ type, message }) => {
  const isError = type === "error";
  const bgColor = isError ? "bg-red-100" : "bg-green-100";
  const borderColor = isError ? "border-red-400" : "border-green-400";
  const textColor = isError ? "text-red-700" : "text-green-700";

  const Icon = () =>
    isError ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );

  return (
    <div
      role="alert"
      className={`alert ${bgColor} ${borderColor} ${textColor} border`}
    >
      <Icon />
      <span>{message}</span>
    </div>
  );
};

function App() {
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [sessions, setSessions] = useLocalStorage("quizSessions", []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputText, setInputText] = useState("");
  const [displayedQuiz, setDisplayedQuiz] = useState(null);
  const [activeSessionId, setActiveSessionId] = useState(null);

  const handleGenerate = async (textContent) => {
    setIsLoading(true);
    setError(null);
    setDisplayedQuiz(null);
    setActiveSessionId(null); // Clear any previous selection

    try {
      const result = await generateQuiz(textContent);

      setDisplayedQuiz(result); // Display the new quiz immediately

      // The corrected newSession object
      // In App.jsx, inside handleGenerate...
      // The corrected newSession object
      const newSession = {
        id: Date.now(),
        // This now correctly accesses the nested title
        title: result.question_paper.title || "Untitled Quiz",
        timestamp: new Date().toISOString(),
        sourceText: textContent, // You correctly added this
        quizData: result,
      };

      setSessions((prevSessions) => [newSession, ...prevSessions].slice(0, 20));
      setInputText("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSessionSelect = (session) => {
    setDisplayedQuiz(session.quizData);
    setInputText(session.sourceText || "");
    // THE FIX #3: When a session is selected, we set its ID as active.
    setActiveSessionId(session.id);
  };

  return (
    <Layout
      sessions={sessions}
      onSessionSelect={handleSessionSelect}
      // THE FIX #4: Pass the active session ID to the layout for highlighting.
      activeSessionId={activeSessionId}
    >
      <div className="max-w-4xl mx-auto">
        <InputArea
          textValue={inputText}
          onTextChange={(e) => setInputText(e.target.value)}
          onGenerate={handleGenerate}
          isLoading={isLoading}
        />
        <div className="mt-8">
          {error && <Alert type="error" message={error} />}
          {/* This now correctly shows the quiz from either a new generation or a selection */}
          {displayedQuiz && <QuestionPaper quiz={displayedQuiz} />}
        </div>
      </div>
    </Layout>
  );
}

export default App;

// -H "Content-Type: application/json" -d '{"textContent": "The water cycle describes the movement of water on Earth."}' http://localhost:3001/api/generate
