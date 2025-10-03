import { challenges } from './challenges/index.js';
let currentChallenge = null; // This will hold the currently loaded challenge object

//setup variables for DOM elements
const codeInput = document.getElementById('codeWindow');
const runButton = document.getElementById('testsButton');
const resultsOutput = document.getElementById('resultsWindow');
const loader = document.getElementById('loader');
const challengeTitleEl = document.getElementById('challenge-title');
const instructionsEl = document.getElementById('instructions');
const challengeMenuEl = document.getElementById('challenge-menu');
const challengeListEl = document.getElementById('challenge-list');
const mainCheckerEl = document.querySelector('.main');
const backToMenuBtn = document.getElementById('back-to-menu-btn');
let testCode = ''

function loadChallenge(challenge) {
    challengeTitleEl.textContent = challenge.title;
    instructionsEl.innerHTML = challenge.instructionsHTML;
	testCode = challenge.testCode;
}

//allow tab indent in textarea
codeInput.addEventListener('keydown', function(e) {
	if (e.key == 'Tab') {
		e.preventDefault();
		var start = this.selectionStart;
		var end = this.selectionEnd;

		// set textarea value to: text before caret + tab + text after caret
		this.value = this.value.substring(0, start) +
		  "    " + this.value.substring(end);

		// put caret at right position again
		this.selectionStart =
		  this.selectionEnd = start + 4;
		}
	});
function formatCamelCase(camelCaseString) {
	// 1. Insert a space before any uppercase letter.
	// The regular expression finds a lowercase letter followed by an uppercase letter.
	const spacedString = camelCaseString.replace(/([a-z])([A-Z])/g, '$1 $2');

	// 2. Capitalize the first letter and return the result.
	const finalString = spacedString.charAt(0).toUpperCase() + spacedString.slice(1);

	return finalString;
	}

/**
 * Smoothly scrolls a container. If a target element is provided, scrolls to that element.
 * Otherwise, scrolls to the bottom of the container.
 * @param {HTMLElement} container The container element to scroll.
 * @param {HTMLElement|null} targetElement The target element to scroll to.
 * @param {number} duration The duration of the scroll in milliseconds.
 */
function smoothScroll(container, targetElement = null, duration = 500) {
	const startPosition = container.scrollTop;
	let endPosition;

	if (targetElement) {
		// Calculate position to scroll to the element, with a 20px offset from the top
		endPosition = targetElement.offsetTop - container.offsetTop - 20;
	} else {
		// If no target, scroll to the very bottom
		endPosition = container.scrollHeight - container.clientHeight;
	}

	const distance = endPosition - startPosition;
	let startTime = null;

	function animationStep(currentTime) {
		if (startTime === null) startTime = currentTime;
		const timeElapsed = currentTime - startTime;
		const progress = Math.min(timeElapsed / duration, 1);
		const ease = progress * (2 - progress); // easeOutQuad easing

		container.scrollTop = startPosition + distance * ease;

		if (timeElapsed < duration) {
			requestAnimationFrame(animationStep);
		}
	}

	requestAnimationFrame(animationStep);
	}

//js to display results as a table
function createTable(jsonString, container) {
	let data;
	try {
		data = JSON.parse(jsonString);
	} catch (error) {
		container.innerHTML = "<p>Something went wrong parsing JSON string</p>";
		return;
	}
	// Check the data is an array and not empty
	if (!Array.isArray(data) || data.length === 0) {
		container.innerHTML = "<p>No data to display.</p>";
		return;
	}
	//create table elements
	const table = document.createElement('table');
	const thead = document.createElement('thead');
	const headerRow = document.createElement('tr');
	//add table headers
	const headers = Object.keys(data[1]); //assume 0th index is summary data
	headers.forEach(hText => {
		const th = document.createElement('th');
		th.textContent = formatCamelCase(hText);
		th.classList.add(hText);
		headerRow.appendChild(th);
	});
	thead.appendChild(headerRow);
	table.appendChild(thead);

	//fill table with data
	const tbody = document.createElement('tbody');
	data.slice(1).forEach(obj => {
		const row = document.createElement('tr');
		headers.forEach(header => {
			const cell = document.createElement('td');
			cell.textContent = obj[header] !== null ? obj[header] : "";
			row.appendChild(cell);
		});
		if (obj.testResult === 'FAILED') {
			row.classList.add('test-failed');
		} else if (obj.testResult === 'SKIPPED') {
			row.classList.add('test-skipped');
		}
		row.style.animationDelay = (obj["testNumber"] / 5) + "s";
		row.classList.add("resultRow");
		tbody.appendChild(row);
	});
	table.appendChild(tbody);

	//reset container and display
	container.innerHTML = "";
	container.appendChild(table);
}

function showChallengeMenu() {
    mainCheckerEl.classList.add('hidden');
    backToMenuBtn.classList.add('hidden');
    challengeMenuEl.classList.remove('hidden');
    challengeTitleEl.textContent = 'POCC';
}

function showCheckerInterface() {
    challengeMenuEl.classList.add('hidden');
    mainCheckerEl.classList.remove('hidden');
    backToMenuBtn.classList.remove('hidden');
}

function populateChallengeMenu() {
    challengeListEl.innerHTML = '';
    for (const challengeMeta of challenges) {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.innerHTML = `<strong>${challengeMeta.title}</strong><p>${challengeMeta.description}</p>`;
        button.dataset.challengeId = challengeMeta.id;
        button.addEventListener('click', handleChallengeSelect);
        li.appendChild(button);
        challengeListEl.appendChild(li);
    }
}

async function handleChallengeSelect(event) {
    const challengeId = event.currentTarget.dataset.challengeId;
    showCheckerInterface();
    instructionsEl.innerHTML = '<p>Loading challenge...</p>';
    challengeTitleEl.textContent = 'Loading...';

    try {
        const module = await import(`./challenges/${challengeId}.js`);
        currentChallenge = module.challenge;
        loadChallenge(currentChallenge);
    } catch (error) {
        console.error("Failed to load challenge:", error);
        instructionsEl.innerHTML = '<p style="color: red;">Error: Could not load the selected challenge.</p>';
    }
}

function loadChallenge(challenge) {
    challengeTitleEl.textContent = challenge.title;
    instructionsEl.innerHTML = challenge.instructionsHTML;
    codeInput.value = '';
    resultsOutput.innerHTML = '';
}

backToMenuBtn.addEventListener('click', showChallengeMenu);


//this code clears typehints from previous test runs
const clearCode = `
import sys

current_module = sys.modules[__name__]
if hasattr(current_module, '__annotations__'):
	current_module.__annotations__.clear()
`;

// Load the initial challenge when the page content is ready
window.addEventListener('DOMContentLoaded', () => {
    loadChallenge(currentChallenge);
});

//testCode string
const testerCode = `
import io
import sys
import inspect
from io import StringIO
import json
from unittest.mock import patch
import random
from random import randint
from typing import get_type_hints

PASSED = 1
FAILED = -1
SKIPPED = 0

current_module = sys.modules[__name__]


#used to ignor patching random if not needed
def nevermind(*args):
	pass

class Tester:
	def __init__(self):
		self.results = []
		self.count_tests = 0
		self.count_pass = 0
		self.count_fail = 0
		
	def include_result(self, description, success):
		#success 1 = pass, 0 = skipped, -1 = failed
		result = {}
		self.count_tests += 1
		result["testNumber"] = self.count_tests
		result["testDescription"] = description
		if success == PASSED:
			self.count_pass += 1
			result["testResult"] = "PASSED"
			result["resultIcon"] = "🟢"
		elif success == FAILED:
			self.count_fail += 1
			result["testResult"] = "FAILED"
			result["resultIcon"] = "🔴"            
		else:
			result["testResult"] = "SKIPPED"
			result["resultIcon"] = "🟡"
		self.results.append(result)
		
	def confirm_variable_exists(self, v_name):
		return v_name in globals()

	def check_variable_exists(self, v_name):
		result = PASSED if self.confirm_variable_exists(v_name) else FAILED
		description = f"Check variable with name {v_name} exists."
		self.include_result(description ,result)
	def confirm_variable_type_hint(self,v_name,e_type):
		if self.confirm_variable_exists(v_name):
			hints = get_type_hints(current_module)
			v_value = globals()[v_name]
			if v_name not in hints:
				return False
			hint = hints[v_name]
			if hint != e_type:
				return False
			if hint != type(v_value):
				return False
			return True
		return False
	def check_variable_type_hint(self,v_name, e_type):
		if self.confirm_variable_exists(v_name):
			description = "Checking variable type hint. "
			hints = get_type_hints(current_module)
			v_value = globals()[v_name]
			#check if type hint exists
			if v_name not in hints:
				description += f"No type hint found for {v_name}."
				self.include_result(description,FAILED)
				return
			hint = hints[v_name]
			#check if type hint matches expected
			if hint == e_type:
				description += f"Type hint matches expected type. "
			else:
				description += f"Type hint doesn't match expected: {e_type}. "
				self.include_result(description, FAILED)
				return
			#check if type hint matches type of actual value
			if hint == type(v_value):
				description += f"Type hint matches actual value. "
			else:
				description += f"Type hint doesn't match type for value used, expected {e_type}, got {type(v_value)}. "
				self.include_result(description, FAILED)
				return
			self.include_result(description,PASSED)
		else:
			self.include_result(f"Unable to find variable {v_name} to check type hint.", SKIPPED)
				
			
	def check_variable_value(self,v_name,expected_value, e_type = None):
		if self.confirm_variable_exists(v_name):
			if e_type == None or self.confirm_variable_type_hint(v_name,e_type):
				description = f"Check variable {v_name} has value {expected_value}."
				actual_value = globals()[v_name]
				result = PASSED if actual_value == expected_value else FAILED
				self.include_result(description, result)
			else:
				self.include_result(f"Type hint missing or wrong for {v_name}.", SKIPPED)
		else:
			self.include_result(f"Unable to find variable {v_name} to check value.", SKIPPED)

	def confirm_function_exists(self,f_name):
		return f_name in globals() and callable(globals().get(f_name))

	def check_function_exists(self,f_name):
		result = PASSED if self.confirm_function_exists(f_name) else FAILED
		description = f"Check function with name {f_name} exists."
		self.include_result(description, result)

	def confirm_function_parameters(self,f_name, expected_count):
		if self.confirm_function_exists(f_name):
			signature = inspect.signature(globals()[f_name])
			actual_count = len(signature.parameters)
			return actual_count == expected_count
		return False

	def check_function_parameters(self,f_name,expected_count):
		if self.confirm_function_exists(f_name):
			description = f"Check function {f_name} has {expected_count} parameter(s)."
			signature = inspect.signature(globals()[f_name])
			actual_count = len(signature.parameters)
			result = PASSED if actual_count == expected_count else FAILED
			self.include_result(description,result)
		else:
			self.include_result(f"Unable to find function {f_name} to check parameters",SKIPPED)

	def full_check(self,f_name,args= [],inputs = [] ,randoms = [],e_out = None,e_return = None):
		if self.confirm_function_parameters(f_name,len(args)):
			#Build description
			description = f"Testing function {f_name} "
			if len(args) > 0:
				description += f"using arguments {args} "
			if len(inputs) > 0:
				description += f"with inputs {inputs} "
			description = description[:-1] + ". "
			#ignores if patching random not needed
			if len(randoms) > 0:
				#cover use of both random.randint and randint
				rand1 = "random.randint"
				rand2 = "__main__.randint"
			else:
				rand1 = "__main__.nevermind"
				rand2 = "__main__.nevermind"
			#patch inputs, print and random
			with (  patch("builtins.input", side_effect=inputs),
					patch("sys.stdout", new=StringIO()) as fake_out,
					patch(rand1, side_effect=randoms),
					patch(rand2, side_effect=randoms)):
				try:
					#run code to test
					actual_return = globals()[f_name](*args)
				except StopIteration:
					#gets caught if runs out of inputs or random numbers
					result = "Failed"
					description = f"Too many inputs or too many random numbers when testing {f_name}."
					self.include_result(description,FAILED)
					return
			actual_output = fake_out.getvalue().strip()
			result = PASSED
			#check for matching output
			if e_out != None and e_out != fake_out.getvalue().strip():
				description += f"Actual output does not match expected output\\nExcpected: {e_out}\\nGot: {actual_output}"
				result = FAILED
			#check for matching return
			if e_return != None and e_return != actual_return:
				description += f"Return value doesn't match.\\nExpected return: {e_return} Got: {actual_return}"
				result = FAILED
			if result == PASSED:
				description += "Test passed."
		else:
			#Doesn't run test if parameters or function name doesn't match
			result = SKIPPED
			description = f"Unable to test function {f_name}. Could not find or parameters don't match"
		self.include_result(description,result)

	def json_results(self):
		summary = {
			"testCount" : self.count_tests,
			"passCount" : self.count_pass,
			"failCount" : self.count_fail,
			"skipCount" : self.count_tests - self.count_pass - self.count_fail,
			}
		return json.dumps([summary] + self.results)
`;


async function setupPyodide() {
	let pyodide = await loadPyodide();
	loader.textContent = 'Python runtime loaded! Ready to run code.';
	runButton.disabled = false;
	return pyodide;
}

const pyodidePromise = setupPyodide();

runButton.addEventListener('click', async () => {
	const pyodide = await pyodidePromise;
	const userCode = codeInput.value;
	resultsOutput.textContent = 'Running tests...';
	
	//clears variables from previous test runs
	const initialPyodideState = pyodide.pyodide_py._state.save_state();
	//clears output
	let output = '';
	
	try {
		// clear stored test hints
		pyodide.runPython(clearCode);
		//Run the testerCode to setup class
		pyodide.runPython(testerCode);
		// Run the user's code to make their function available
		pyodide.runPython(userCode);
		console.log("User code completed")
		
		// Assign the captured string to the 'output' variable
		output = pyodide.runPython(testCode);
		console.log(output)
		createTable(output, resultsWindow);
		
		setTimeout(() => {
			const scrollContainer = document.querySelector('.left .content-wrapper');
			
			// Look for the first row with either a 'test-failed' or 'test-skipped' class.
			const firstProblemRow = scrollContainer.querySelector('.test-failed, .test-skipped');

			if (firstProblemRow) {
				// If we found a problem, scroll to it.
				smoothScroll(scrollContainer, firstProblemRow, 1000);
			} else {
				// Otherwise, all tests passed, so scroll to the bottom.
				smoothScroll(scrollContainer, null, 2500);
			}
		}, 500);
	} catch (error) {
	
		const errorMessage = error.toString();
	
		//look for the OSError that the console log revealed.
		if (errorMessage.includes("OSError: [Errno 29] I/O error")) {
			// This is the specific error from input(). Show the custom message.
			resultsOutput.innerHTML = `
				<p style="color: red; font-weight: bold;">Execution Halted!</p>
				<p>An <code>input()</code> call was detected in the main part of your script. Please only use <code>input()</code> inside a function definition.</p>
			`;
		} else {
			// It was a different error (e.g., a real SyntaxError)
			console.log(error); // Log the actual error for debugging
			output = "Your code would not run. Please check for errors in an IDE.";
			resultsOutput.textContent = output;
		}

	} finally {
		pyodide.pyodide_py._state.restore_state(initialPyodideState);
	}
});

populateChallengeMenu();
showChallengeMenu();
