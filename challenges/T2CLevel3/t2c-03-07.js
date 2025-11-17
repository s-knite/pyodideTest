export const challenge = {
    id: 't2c-03-07',
    title: 'POCC - 🔢⏹️🫚 - Square Root',
    
    instructionsHTML: `
        <p>These tests are for the Time 2 Code challenge 03-07 Square Root</p>
		<p><a href="https://time2code.today/python-course/python-level-3/python-square-root" target="_blank">Click here to see challenge details</a></p>
		<p>This code will only check that the subprograms work correctly - don't include any inputs here</p>
    `,

    challengeTests: `
tester = Tester()
try:
  
  found_violations = []
  
  # Check 1: 'import math'
  if 'math' in globals():
      found_violations.append("'import math'")
  # Check 2: 'from math import sqrt'
  if 'sqrt' in globals() and getattr(globals()['sqrt'], '__module__', '') == 'math':
      found_violations.append("'from math import sqrt'")

  if found_violations:
      # Fail the test if any forbidden text is found
      violations_str = ", ".join(list(set(found_violations)))
      tester.include_result(f"Forbidden code detected: {violations_str}", -1) # FAILED
  else:
  	tester.check_function_exists("sqroot")
  	tester.check_function_parameters("sqroot", 1)
  	tester.full_check("sqroot", args=[25.0], e_return=5.0, quiet = False)
  	tester.full_check("sqroot", args=[64.0], e_return=8.0, quiet = False)
  	tester.full_check("sqroot", args=[18.49], e_return=4.3, quiet = False)
  	tester.full_check("sqroot", args=[36.0], e_return=6.0, quiet = False)
  	tester.full_check("sqroot", args=[49.0], e_return=7.0, quiet = False)
  	tester.full_check("sqroot", args=[200], e_return=14.142135623730951, quiet = False)





	

	
    
    
except Exception as e:
    tester.results.append({
        "testNumber" : -1,
        "testDescription" : f"Critical error - test code could not complete: {e}",
        "testResult" : "FAILED",
        "resultIcon" : "🔴" })

#final expression returned to JavaScript
tester.json_results()
`

};
