// client/src/components/InputArea.jsx

// NO MORE `useState` here. This is now a "dumb" component controlled by its parent.
const InputArea = ({ textValue, onTextChange, onGenerate, isLoading }) => {
  const handleClick = () => {
    if (textValue.trim()) {
      onGenerate(textValue);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
      <h2 className="text-2xl font-bold text-slate-800 mb-4 dark:text-slate-100">
        Paste Your Subject Material
      </h2>
      <textarea
        className="textarea textarea-bordered w-full h-80 mt-2 text-base 
                   dark:bg-slate-900 dark:text-slate-200 dark:border-slate-600
                   focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                   transition-shadow duration-200"
        placeholder="Paste your chapter content here..."
        // THE FIX: Value and onChange are now controlled by props from App.jsx
        value={textValue}
        onChange={onTextChange}
        disabled={isLoading}
      />
      <div className="card-actions justify-end mt-4">
        <button
          className="btn btn-primary btn-lg w-full sm:w-auto
                     disabled:bg-slate-300 disabled:text-slate-500 disabled:border-slate-300
                     dark:disabled:bg-slate-600 dark:disabled:text-slate-400 dark:disabled:border-slate-600"
          onClick={handleClick}
          disabled={isLoading || !textValue.trim()}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="loading loading-spinner"></span>
              Generating...
            </span>
          ) : (
            "Generate Questions"
          )}
        </button>
      </div>
    </div>
  );
};

export default InputArea;
