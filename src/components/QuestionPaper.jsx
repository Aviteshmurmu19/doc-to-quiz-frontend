// client/src/components/QuestionPaper.jsx

const QuestionCard = ({ question }) => {
  // This component was already correct, as it receives the direct question object. No changes needed here.
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
      <div className="flex justify-between items-start mb-4 gap-4">
        <h3 className="font-semibold text-slate-800 dark:text-slate-100 flex-1">
          <span className="text-indigo-600 dark:text-indigo-400 mr-2">
            {question.question_id}.
          </span>
          {question.question_text}
        </h3>
        <span className="flex-shrink-0 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 font-bold text-xs px-2.5 py-1 rounded-full">
          {question.marks} {question.marks > 1 ? "Marks" : "Mark"}
        </span>
      </div>
      <div className="space-y-3 mt-5">
        {question.options.map((option) => {
          const isCorrect = option.is_correct;
          const baseStyle =
            "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-700/50";
          const correctStyle =
            "border-green-500 bg-green-100 dark:bg-green-800/40 ring-2 ring-green-500/50";
          const baseTextStyle = "text-slate-700 dark:text-slate-300";
          const correctTextStyle =
            "font-semibold text-green-800 dark:text-green-200";
          return (
            <div
              key={option.option_id}
              className={`flex items-center p-3 rounded-md border ${
                isCorrect ? correctStyle : baseStyle
              }`}
            >
              <span className="font-bold text-slate-500 dark:text-slate-400 w-6">
                {option.option_id})
              </span>
              <p className={isCorrect ? correctTextStyle : baseTextStyle}>
                {option.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const QuestionPaper = ({ quiz }) => {
  // --- THE FIX IS HERE ---
  // 1. Drill down into the nested structure to get the actual quiz data.
  const quizData = quiz ? quiz.question_paper : null;

  // 2. Check the correct path for the questions array.
  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return null;
  }

  // 3. Calculate total marks from the actual questions array.
  const totalMarks = quizData.questions.reduce(
    (total, q) => total + q.marks,
    0
  );

  return (
    <div className="mt-12 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg text-center mb-10">
        {/* 4. Use properties from the correct 'quizData' object. */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {quizData.title}
        </h1>
        {quizData.description && (
          <p className="max-w-3xl mx-auto mt-4 text-md text-slate-600 dark:text-slate-400">
            {quizData.description}
          </p>
        )}
        {totalMarks > 0 && (
          <p className="mt-4 text-lg font-semibold text-slate-700 dark:text-slate-300">
            Total Marks: {totalMarks}
          </p>
        )}
      </div>

      <div className="space-y-8">
        {/* 5. Map over the correct questions array. */}
        {quizData.questions.map((q) => (
          <QuestionCard key={q.question_id} question={q} />
        ))}
      </div>
    </div>
  );
};

export default QuestionPaper;
