export const challenge = {
    id: 't2c-03-05',
    title: 'POCC - 📆❓✅ - Valid Month',
    
    instructionsHTML: `
        <p>These tests are for the Time 2 Code challenge 03-05 Valid Month</p>
		<p><a href="https://time2code.today/python-course/python-level-3/python-valid-month" target="_blank">Click here to see challenge details</a></p>
		<p>This code will only check that the subprograms work correctly - don't include any inputs here</p>
    `,

    challengeTests: `
tester = Tester()
try:
	tester.check_function_exists("validate_month")
	tester.check_function_parameters("validate_month", 1)
	tester.full_check("validate_month", args=[1], e_return=True, quiet = False)
	tester.full_check("validate_month", args=[0], e_return=False, quiet = False)
	tester.full_check("validate_month", args=[12], e_return=True, quiet = False)
	tester.full_check("validate_month", args=[13], e_return=False, quiet = True)
	tester.full_check("validate_month", args=[-2], e_return=False, quiet = True)
	tester.full_check("validate_month", args=[5], e_return=True, quiet = True)


	

	
    
    
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
