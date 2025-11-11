export const challenge = {
    id: 't2c-01-09',
    title: 'POCC - 🕓2👩‍💻 - Energy Bill Calculator',
    
    instructionsHTML: `
        <p>These tests are for the Time 2 Code challenge 01-09 Energy Bill Calculator</p>
		<p><a href="https://time2code.today/python-course/python-level-1/python-energy-bill-calculator" target="_blank">Click here to see challenge details</a></p>
		<p>This code will only check that the subprograms work correctly - don't include any inputs here</p>
    `,

    challengeTests: `
tester = Tester()
try:
	tester.check_function_exists("energy_cost")
	tester.check_function_parameters("energy_cost", 3)
	tester.full_check("energy_cost", args=[2022,2305,39.3], e_return=89, quiet = False)
	tester.full_check("energy_cost", args=[7666,8241,39.3], e_return=182, quiet = False)
	tester.full_check("energy_cost", args=[7325,8876,39.3], e_return=491, quiet = False)
	tester.full_check("energy_cost", args=[2022,2305,20], e_return=45, quiet = True)
	tester.full_check("energy_cost", args=[7325,8876,20], e_return=250, quiet = True)

	

	
    
    
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
