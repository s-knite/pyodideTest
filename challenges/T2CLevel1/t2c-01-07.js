export const challenge = {
    id: 't2c-01-07',
    title: 'POCC - 🕓2👩‍💻 - Microscopy',
    
    instructionsHTML: `
        <p>These tests are for the Time 2 Code challenge 01-07 Microscopy</p>
		<p><a href="https://time2code.today/python-course/python-level-1/python-microscopy" target="_blank">Click here to see challenge details</a></p>
		<p>This code will only check that the subprograms work correctly - don't include any inputs here</p>
    `,

    challengeTests: `
tester = Tester()
try:
	tester.check_function_exists("magnification")
	tester.check_function_parameters("magnification", 2)
	tester.full_check("magnification", args=[80,10], e_return=1250.0, quiet = False)
	tester.full_check("magnification", args=[80,4], e_return=500.0, quiet = False)
	tester.full_check("magnification", args=[30,3], e_return=1000.0, quiet = False)
	tester.full_check("magnification", args=[50,32], e_return=6400.0, quiet = True)
	tester.full_check("magnification", args=[80000,4], e_return=0.5, quiet = True)

	
    
    
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
