function ErrorBox({ message, onRetry }) {
  return (
<<<<<<< HEAD
    <div>
      <p>Something went wrong: {message}</p>
      <button onClick={onRetry}>Retry</button>
=======
    <div className="errorbox" role="alert">
      <div className="error-icon">!</div>
      <h3>A wild error appeared!</h3>
      <p>{message}</p>
      <button className="btn" onClick={onRetry}>
        Try again
      </button>
>>>>>>> 5279e85 (Initial commit from Visual SourceSafe)
    </div>
  );
}

<<<<<<< HEAD
export default ErrorBox;
=======
export default ErrorBox;
>>>>>>> 5279e85 (Initial commit from Visual SourceSafe)
