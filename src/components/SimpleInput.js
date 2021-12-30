import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredMail,
    isValid: enteredMailIsValid,
    hasError: mailInputHasError,
    valueChangeHandler: mailChangeHandler,
    inputBlurHandler: mailBlurHandler,
    reset: resetMailInput,
  } = useInput((value) => value.includes("@"));

  let formIsValid = false;

  if (enteredNameIsValid && enteredMailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid && !enteredMailIsValid) {
      return;
    }
    resetNameInput();
    resetMailInput();
  };

  const nameInputClasses =
    nameInputHasError || mailInputHasError
      ? "form-control invalid"
      : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>

      <div className={nameInputClasses}>
        <label htmlFor="email">Your email address</label>
        <input
          type="email"
          id="email"
          onChange={mailChangeHandler}
          onBlur={mailBlurHandler}
          value={enteredMail}
        />
        {mailInputHasError && (
          <p className="error-text">Mail id is a mandatory field</p>
        )}
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
