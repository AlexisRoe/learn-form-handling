/**
 * Source:  https://dev.to/masakudamatsu/how-to-handle-invalid-user-inputs-in-react-forms-for-ux-design-best-practices-1o99
 * by: Masa Kudamatsu
 * date: 15.03.2021
 * 
 * inputmode: https://css-tricks.com/better-form-inputs-for-better-mobile-user-experiences/#why-should-i-care-about-inputmode
 * autocomplete: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
 * dataset: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist
 */

 import React, { useRef, useState } from 'react';
 import './index.css';
 
 const PATTERN: string = '[-]?[0-9]*[.,]?[0-9]+';
 
 /**
  *
  * @returns jsx label and input field for numbers with automatic input validation and error handler
  */
 const NumberInputForm = ():JSX.Element => {
     const [userInput, setUserInput] = useState<string>('');
     const [error, setError] = useState<boolean>(false);
     const [showErrorText, setShowErrorText] = useState<boolean>(false);
     const inputRef = useRef<HTMLInputElement>(null);
 
     /**
      * change backgroundColor of input field if there is an error
      *
      * @param {error} error react errorState of input field
      * @returns css backgroundColor inline
      */
     const style = (error: boolean) => {
         if (error) {
             return { backgroundColor: 'var(--color-error-background)' };
         }
     };
 
     /**
      * first blur of input field denied, second one is allowed
      *
      * @param {event} event event of input field
      */
     const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
         if (!error) {
             // checks if pattern is solved correctly
             if (event.target.validity.patternMismatch) {
                inputRef.current!.focus();
                 setError(true);
                 setShowErrorText(true);
             }
         } else {
             setShowErrorText(false);
         }
     };
 
     /**
      * checks if input is wrong and put the value in react state
      *
      * @param {event} event event of input field
      */
     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
         if (error) {
             if (!event.target.validity.patternMismatch) {
                 setError(false);
                 setShowErrorText(false);
             }
         }
         setUserInput(event.target.value);
     };
 
     /**
      * when refocus in element, shows the error help text
      */
     const handleFocus = () => {
         if (error) {
             setShowErrorText(true);
         }
     };
 
     return (
         <>
             <label htmlFor='number-input-field'>Enter a number: </label>
             <input
                 type='text'
                 id='number-input-field'
                 name='number-input-field'
                 // set keyboard for mobile devices users
                 inputMode='decimal'
                 // checks if user input is valid number format
                 pattern={PATTERN}
                 onBlur={handleBlur}
                 onChange={handleChange}
                 onFocus={handleFocus}
                 style={style(error)}
                 value={userInput}
                 ref={inputRef}
             />
             {/* shows help text only if the element is in focus */}
             {showErrorText && (
                 <p role='alert' style={{ color: 'var(--color-error-text)' }}>
                     Please make sure you`ve entered a <em>number</em>
                 </p>
             )}
         </>
     );
 };
 
 export default NumberInputForm;
 