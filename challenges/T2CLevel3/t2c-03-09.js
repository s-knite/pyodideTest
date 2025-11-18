export const challenge = {
    id: 't2c-03-09',
    title: 'POCC - 📏🐾📏 - Measurements ',
    
    instructionsHTML: `
        <p>These tests are for the Time 2 Code challenge 03-09 Measurements</p>
		<p><a href="https://time2code.today/python-course/python-level-3/python-measurements" target="_blank">Click here to see challenge details</a></p>
		<p>This code will only check that the subprograms work correctly - don't include any inputs here</p>
    `,

    challengeTests: `
tester = Tester()
try:
	tester.check_function_exists("feet_to_inches")
	tester.check_function_parameters("feet_to_inches", 1)
	tester.full_check("feet_to_inches", args=[3.0], e_return=36.0, quiet = False)
	tester.full_check("feet_to_inches", args=[14.0], e_return=168, quiet = False)

	tester.check_function_exists("inches_to_feet")
	tester.check_function_parameters("inches_to_feet", 1)
	tester.full_check("inches_to_feet", args=[72.0], e_return=6.0, quiet = False)
	tester.full_check("inches_to_feet", args=[36.0], e_return=3.0, quiet = False)

	tester.check_function_exists("menu")
	tester.check_function_parameters("menu", 0)
	tester.full_check("menu", inputs=["4","3"], e_return="3", quiet = False)
	tester.full_check("menu", inputs=["4","a","one","2"], e_return="2", quiet = False)

	tester.check_function_exists("converter")
	tester.check_function_parameters("converter", 0)
	tester.full_check("converter", inputs=["1", "3"], e_out="3.0 feet is 36.0 inches.", quiet = False)
	tester.full_check("converter", inputs=["2", "72"], e_out="72.0 inches is 6.0 feet.", quiet = False)
	tester.full_check("converter", inputs=["3"], e_out="Goodbye", quiet = False)
	tester.full_check("converter", inputs=["1", "2"], e_out="2.0 feet is 24.0 inches.", quiet = True)	
	tester.full_check("converter", inputs=["1", "4.5"], e_out="4.5 feet is 54.0 inches.", quiet = True)
	tester.full_check("converter", inputs=["4","4","4","4","4","4","3"], e_out="Goodbye", quiet = True)
	
    
    
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
