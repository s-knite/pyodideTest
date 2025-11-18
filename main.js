// --- using URL parameters to select challenges ---
function getChallengeSet() {
    const urlParams = new URLSearchParams(window.location.search);
    const set = urlParams.get('set');
    // Basic sanitizer to prevent "directory-traversal-like" shenanigans
    if (set && /^[a-zA-Z0-9_]+$/.test(set)) {
        return set;
    }
    return 'default'; // The fallback set
}

const challengeSet = getChallengeSet();
const challengeBasePath = `./challenges/${challengeSet}`;

// --- STATE & CONSTANTS ---
let challenges = [];
let currentChallenge = null;
let pyodide = null;
let initialPyodideState = null;
let isPyodideInitializing = false;
let PROGRESS_KEY = 'pocc_progress';

// --- DOM ELEMENT SELECTIONS ---
const codeInput = document.getElementById('codeWindow');
const runButton = document.getElementById('testsButton');
const resultsOutput = document.getElementById('resultsWindow');
const loader = document.getElementById('loader');
const challengeTitleEl = document.getElementById('challenge-title');
const instructionsEl = document.getElementById('instructions');
const challengeMenuEl = document.getElementById('challenge-menu');
const challengeListEl = document.getElementById('challenge-list');
const mainCheckerEl = document.getElementById('main-checker'); // Ensure HTML has this ID
const backToMenuBtn = document.getElementById('back-to-menu-btn');
const aboutBtn = document.getElementById('about-btn');
const clearProgressBtn = document.getElementById('clear-progress-btn');
const confirmModal = document.getElementById('confirm-modal');
const cancelClearBtn = document.getElementById('cancel-clear-btn');
const confirmClearBtn = document.getElementById('confirm-clear-btn');

const allViews = [
    document.getElementById('challenge-menu'),
    document.getElementById('code-checker'),
    document.getElementById('about-page')
];

// --- PYTHON CODE STRINGS ---

//this code clears typehints from previous test runs
const typeHintClearCode = `
import sys

current_module = sys.modules[__name__]
if hasattr(current_module, '__annotations__'):
	current_module.__annotations__.clear()
`;


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

	def full_check(self,f_name,args= [],inputs = [] ,randoms = [],e_out = None,e_return = None, quiet = False):
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
				description += f"Actual output does not match expected output\\n"
				if not quiet:
					description += f"Excpected: {e_out}\\nGot: {actual_output}"
				result = FAILED
			#check for matching return
			if e_return != None and e_return != actual_return:
				description += f"Return value doesn't match.\\n"
				if not quiet:
					description += f"Expected return: {e_return} Got: {actual_return}"
				result = FAILED
			if result == PASSED:
				description += "Test passed."
		else:
			#Doesn't run test if parameters or function name doesn't match
			result = SKIPPED
			description = f"Unable to test function {f_name}. Could not find or parameters don't match"
		self.include_result(description,result)

	def json_results(self):
			# Recalculate counts from the actual results list to ensure consistency
			# This fixes the bug where exception errors weren't being counted
			actual_pass = sum(1 for r in self.results if r.get("testResult") == "PASSED")
			actual_fail = sum(1 for r in self.results if r.get("testResult") == "FAILED")
			# Anything not passed or failed is considered skipped
			total_tests = len(self.results)
			actual_skip = total_tests - actual_pass - actual_fail
	
			summary = {
				"testCount" : total_tests,
				"passCount" : actual_pass,
				"failCount" : actual_fail,
				"skipCount" : actual_skip,
			}
			return json.dumps([summary] + self.results)
`;



// --- 4. VIEW & STATE MANAGEMENT ---
function showView(viewIdToShow) {
    allViews.forEach(view => {
        if (view.id === viewIdToShow) {
            view.classList.remove('hidden');
        } else {
            view.classList.add('hidden');
        }
    });

    // Show the "Back to Menu" button on any view except the main menu
    backToMenuBtn.classList.toggle('hidden', viewIdToShow === 'challenge-menu');
	
	if (viewIdToShow === 'challenge-menu') {
		aboutBtn.classList.remove('hidden');
		challengeTitleEl.textContent = 'POCC';
	} else {
		aboutBtn.classList.add('hidden');
	}
}

function loadChallenge(challenge) {
    challengeTitleEl.textContent = challenge.title;
    instructionsEl.innerHTML = challenge.instructionsHTML;
    resultsOutput.innerHTML = '';

	const savedCode = localStorage.getItem(`pocc_code_${challengeSet}_${challenge.id}`);
    codeInput.value = savedCode || ''; // Use saved code or default to empty
}

/**
 * Loads the user's progress from localStorage.
 * @returns {object} An object mapping challenge IDs to their status (e.g., "completed").
 */
function loadProgress() {
    try {
        const progress = localStorage.getItem(PROGRESS_KEY);
        return progress ? JSON.parse(progress) : {};
    } catch (e) {
        console.error("Failed to load progress:", e);
        return {};
    }
}

/**
 * Saves the user's progress to localStorage.
 * @param {object} progress - The progress object to save.
 */
function saveProgress(progress) {
    try {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } catch (e) {
        console.error("Failed to save progress:", e);
    }
}

function clearAllProgress() {
    // Clear the progress tracker
    localStorage.removeItem(PROGRESS_KEY);

    // Clear all saved code snippets
    challenges.forEach(challenge => {
        localStorage.removeItem(`pocc_code_${challengeSet}_${challenge.id}`);
    });

    //alert("Your progress has been cleared.");
    populateChallengeMenu(); // Refresh the menu to remove green ticks
}

// --- DYNAMIC CONTENT ---

function populateChallengeMenu() {
    const progress = loadProgress(); // Load progress before building the menu
    challengeListEl.innerHTML = '';
    for (const challengeMeta of challenges) {
        const li = document.createElement('li');
        
        // Check if this challenge is completed
        if (progress[challengeMeta.id] === 'completed') {
            li.classList.add('challenge-completed');
        }

        const button = document.createElement('button');
        button.innerHTML = `<strong>${challengeMeta.title}</strong><p>${challengeMeta.description}</p>`;
        button.dataset.challengeId = challengeMeta.id;
        button.addEventListener('click', handleChallengeSelect);
        li.appendChild(button);
        challengeListEl.appendChild(li);
    }
}

async function handleChallengeSelect(event) {
    const button = event.currentTarget;
    const originalButtonText = button.innerHTML;
    const challengeId = button.dataset.challengeId;

    // 1. Give immediate feedback on the menu
    button.innerHTML = '<strong>Loading...</strong>';
    button.disabled = true;

    try {
        // 2. Create promises for the two slow tasks
        const challengePromise = import(`${challengeBasePath}/${challengeId}.js`);
        
        // This promise resolves immediately if Pyodide is ready, or starts setup if it's not.
        const pyodidePromise = (pyodide || isPyodideInitializing) 
            ? Promise.resolve(pyodide) 
            : setupPyodide();

        // 3. Wait for BOTH tasks to complete in parallel
        const [challengeModule, pyodideInstance] = await Promise.all([challengePromise, pyodidePromise]);

        // 4. Now that everything is loaded, update state
        currentChallenge = challengeModule.challenge;
        pyodide = pyodideInstance; // Make sure our global variable is set

        // 5. Switch the view and load the content instantly
        showView('code-checker');
        loadChallenge(currentChallenge);

    } catch (error) {
        console.error("Failed to load challenge or Pyodide:", error);
        alert("Sorry, there was an error loading the resources for this challenge.");
        showView('challenge-menu'); // Go back to the menu on error
    } finally {
        // 6. Always restore the button
        button.innerHTML = originalButtonText;
        button.disabled = false;
    }
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
	const delayDivider = data[0]['testCount'] > 10 ? 5 : 2;

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
		const delay = (((obj["testNumber"] -1) / delayDivider)) + "s"
		row.style.animationDelay = delay;
		row.classList.add("resultRow");
		tbody.appendChild(row);
	});
	table.appendChild(tbody);

	//reset container and display
	container.innerHTML = "";
	container.appendChild(table);
	
	const scrollDelay = data[0]['testCount'] * 100;
	handleResultsScroll(scrollDelay);

}

function formatCamelCase(camelCaseString) {
	// 1. Insert a space before any uppercase letter.
	// The regular expression finds a lowercase letter followed by an uppercase letter.
	const spacedString = camelCaseString.replace(/([a-z])([A-Z])/g, '$1 $2');

	// 2. Capitalize the first letter and return the result.
	const finalString = spacedString.charAt(0).toUpperCase() + spacedString.slice(1);

	return finalString;
	}

/**
 * After a short delay to allow for rendering, this function finds the appropriate
 * result row (the first failure or the last success) and smoothly scrolls to it.
 */
function handleResultsScroll(timeout) {
    setTimeout(() => {
        const scrollContainer = document.querySelector('.left .content-wrapper');
        if (!scrollContainer) return;

        // Find the first row marked as failed or skipped
        const firstProblemRow = scrollContainer.querySelector('.test-failed, .test-skipped');

        if (firstProblemRow) {
            // If a problem row is found, scroll it into the center of the view.
            firstProblemRow.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        } else {
            // If all tests passed, scroll to the bottom of the table.
            const lastRow = scrollContainer.querySelector('.resultRow:last-child');
            if (lastRow) {
                lastRow.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end'
                });
            }
        }
    }, timeout);
}

// --- PYODIDE SETUP ---

async function setupPyodide() {
    isPyodideInitializing = true;
    loader.textContent = 'Initializing Python Runtime... Please wait.';
    loader.classList.remove('hidden'); // Make sure loader is visible
    
	challengeMenuEl.classList.add('hidden');
	
    const loadedPyodide = await loadPyodide({ stderr: () => {} });
    
    initialPyodideState = loadedPyodide.pyodide_py._state.save_state();
    loader.classList.add('hidden');
    runButton.disabled = false;
    isPyodideInitializing = false;
    
    return loadedPyodide;
}



// --- EVENT LISTENERS ---

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

backToMenuBtn.addEventListener('click', () => 
{
	showView('challenge-menu');
	populateChallengeMenu(); 
});
aboutBtn.addEventListener('click', () => showView('about-page'));
codeInput.addEventListener('input', () => {
    if (currentChallenge) {
        // Save the user's code as they type.
        localStorage.setItem(`pocc_code_${challengeSet}_${currentChallenge.id}`, codeInput.value);

        const progress = loadProgress();
        if (progress[currentChallenge.id] === 'completed') {
            // Remove the completed status from our progress object.
            delete progress[currentChallenge.id];
            // Save the updated progress object back to localStorage.
            saveProgress(progress);
			
			populateChallengeMenu();
        }
    }
});



// Modal-related event listeners
clearProgressBtn.addEventListener('click', () => {
    confirmModal.classList.remove('hidden');
});
cancelClearBtn.addEventListener('click', () => {
    confirmModal.classList.add('hidden');
});
confirmClearBtn.addEventListener('click', () => {
    confirmModal.classList.add('hidden');
    clearAllProgress();
});

runButton.addEventListener('click', async () => {
    if (!currentChallenge || !pyodide) {
        resultsOutput.textContent = "Pyodide is not ready or no challenge is loaded.";
        return;
    }
    try {
        pyodide.pyodide_py._state.restore_state(initialPyodideState);

        const userCode = codeInput.value;
        const fullPythonScript = `
${typeHintClearCode}
${testerCode}
# --- User's Code ---
${userCode}
# --- Challenge Tests ---
${currentChallenge.challengeTests}
        `;
        
        const output = pyodide.runPython(fullPythonScript);
        
        createTable(output, resultsOutput);
        
        const results = JSON.parse(output);
        if (results && results[0]) {
            const summary = results[0];
            if (summary.failCount === 0 && summary.skipCount === 0 && summary.testCount > 0) {
                const progress = loadProgress();
                progress[currentChallenge.id] = 'completed';
                saveProgress(progress);
                populateChallengeMenu();
            }
        }
    } catch (error) {
        const errorMessage = error.toString();
        if (errorMessage.includes("OSError")) {
            resultsOutput.innerHTML = `<p style="color: red; font-weight: bold;">Execution Halted!</p><p>An <code>input()</code> call was detected. Please only use <code>input()</code> inside a function definition.</p>`;
        } else {
            console.log(error);
            resultsOutput.textContent = "Your code would not run. Check the console (F12) for errors.";
        }
    }
});

// --- INITIALIZE THE APP ---
async function initializeApp() {
    try {
        // 1. Dynamically import the correct challenge index
        const indexModule = await import(`${challengeBasePath}/index.js`);
        challenges = indexModule.challenges; // Populate our global array

        // 2. Set a unique progress key for this set
        PROGRESS_KEY = `pocc_progress_${challengeSet}`;

        // 3. Now we can safely populate the menu
        populateChallengeMenu();
        showView('challenge-menu');
    } catch (err) {
        console.error(`Failed to load challenge set '${challengeSet}':`, err);
        // Show an error to the user
        document.body.innerHTML = `<h1>Error</h1><p>Could not load challenge set: <b>${challengeSet}</b></p><p>Please check the URL and try again.</p>`;
    }
}

initializeApp();
