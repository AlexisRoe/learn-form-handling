/**
 * source: https://css-tricks.com/snippets/css/form-validation-styling-on-input-focus/
 * date: 15.03.2021
 */

import { useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import './index.css';

// eslint-disable-next-line no-useless-escape
const PATTERN: string = `^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`;
const INPUT_ID: string = "input-field";
const DELAY: number = 300;

/**
 * 
 * @returns label, input field and error message with automated validation and error handling with pure CSS
 */
const Input = (): JSX.Element => {

    const [userInput, setUserInput] = useState<string>("");
    // use debounced effect for handling user input after stop typing for 300ms
    const debouncedUserInput = useDebounce(userInput, DELAY);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
    }

    return (
        <>
            <label htmlFor={INPUT_ID}>Enter a number: </label>
            <input
                type='text'
                className="input"
                id={INPUT_ID}
                name={INPUT_ID}
                inputMode='email'
                pattern={PATTERN}
                onChange={handleChange}
                value={debouncedUserInput}
            />
            <p role='alert' className="error-message">
                Please make sure you`ve entered a <em>number</em>
            </p>
        </>
    )
};

export default Input;