function ErrorBox({ message, onRetry }) {
  return (
<<<<<<< HEAD
=======
<<<<<<< HEAD
    <div>
      <p>Something went wrong: {message}</p>
      <button onClick={onRetry}>Retry</button>
=======
>>>>>>> final
    <div className="errorbox" role="alert">
      <div className="error-icon">!</div>
      <h3>A wild error appeared!</h3>
      <p>{message}</p>
      <button className="btn" onClick={onRetry}>
        Try again
      </button>
<<<<<<< HEAD
=======
>>>>>>> 5279e85 (Initial commit from Visual SourceSafe)
>>>>>>> final
    </div>
  );
}

<<<<<<< HEAD
export default ErrorBox;
=======
<<<<<<< HEAD
export default ErrorBox;
=======
export default ErrorBox;
>>>>>>> 5279e85 (Initial commit from Visual SourceSafe)
>>>>>>> final
