/*
 * Numeric Input Component
 *   HTML (initial state): <input type="text" class="c-numeric-input" />
 *   Requirement:
 *   - should only accept numeric value only such as: 1, 1.2, -5, or 1000
 *   - if user enters leading zero, or .  when user moves focus away from the input, it should
 *     change to correct format:
 *       .1 ==> 0.1 and 01 => 1
 *   - if user enter invalid character/value, HTML should change to this
 *       <input type="text" class="c-numeric-input c-numeric-input--error" />
 *       <span class="c-numeric-input__error-msg">invalid input</span>
 *   - if user enter valid value and move focus away from the input HTML should change to this:
 *       <input type="text" class="c-numeric-input c-numeric-input--valid" />
 *   - if user focus on the input or user clear value from the input,
 *     HTML should return to initial stage
 *
 * Lastly, please add some css for c-numeric-input--error and c-numeric-input--valid to show
 * red or green border to the input
 * */

const NumericInput = {
  init: () => {
    const inputs = document.querySelectorAll(".c-numeric-input");
    inputs.forEach((input) => {
      input.addEventListener("input", NumericInput.handleInput);
      input.addEventListener("blur", NumericInput.formatInput);
      input.addEventListener("focus", NumericInput.resetInput);
    });
  },

  handleInput: (event) => {
    const input = event.target;
    const value = input.value;
    const valid = NumericInput.validateInput(value);

    if (valid || value === "") {
      input.classList.remove("c-numeric-input--error");
      input.nextElementSibling.style.display = "none";
    } else {
      input.classList.add("c-numeric-input--error");
      input.nextElementSibling.style.display = "block";
    }
  },

  formatInput: (event) => {
    const input = event.target;
    let value = input.value.trim();
    if (value) {
      value = Number(value);
      if (!isNaN(value)) {
        input.value = value.toString();
        input.classList.add("c-numeric-input--valid");
        input.classList.remove("c-numeric-input--error");
        input.nextElementSibling.style.display = "none";
      }
    }
  },

  validateInput: (value) => {
    // Validate input as a float number
    return /^-?\d*\.?\d*$/.test(value);
  },

  resetInput: (event) => {
    const input = event.target;
    input.classList.remove("c-numeric-input--valid", "c-numeric-input--error");
    input.nextElementSibling.style.display = "none";
  },
};
document.addEventListener("DOMContentLoaded", NumericInput.init);
