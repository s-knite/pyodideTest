export const challenge = {
    id: 't2c-01-05',
    title: 'POCC - 🕓2👩‍💻 - Temperature converter',
    
    instructionsHTML: `
        <p>These tests are for the Time 2 Code challenge 01-05 Temperature converter</p>
		<p><a href="https://time2code.today/python-course/python-level-1/python-temperature-converter" target="_blank">Click here to see challenge details</a></p>
		<p>This code will only check that the subprogram c_to_f works correctly - don't include any inputs here</p>
    `,

    challengeTests: `
tester = Tester()
try:
	tester.check_function_exists("c_to_f")
	tester.check_function_parameters("c_to_f", 1)
	tester.full_check("c_to_f", args=[-5], e_return=23.0, quiet = False)
	tester.full_check("c_to_f", args=[30], e_return=86.0, quiet = False)
	tester.full_check("c_to_f", args=[0], e_return=32.0, quiet = False)
	tester.full_check("c_to_f", args=[100], e_return=212.0, quiet = True)
	tester.full_check("c_to_f", args=[-17.7777777777], e_return=1.4000178794049134e-10, quiet = True)
	
    
    
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