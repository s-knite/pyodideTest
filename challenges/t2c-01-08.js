export const challenge = {
    id: 't2c-01-08',
    title: 'POCC - 🕓2👩‍💻 - Circle Properties',
    
    instructionsHTML: `
        <p>These tests are for the Time 2 Code challenge 01-08 Circle Properties</p>
		<p><a href="https://time2code.today/python-course/python-level-1/python-circle-properties" target="_blank">Click here to see challenge details</a></p>
		<p>This code will only check that the subprograms work correctly - don't include any inputs here</p>
       <ul>
            <li>circle_area function</li>
			<li>circle_circumference</li>
        </ul>
    `,

    challengeTests: `
tester = Tester()
try:
	tester.check_function_exists("circle_area")
	tester.check_function_parameters("circle_area", 1)
	tester.full_check("circle_area", args=[2], e_return=3.14, quiet = False)
	tester.full_check("circle_area", args=[7.3], e_return=41.83265, quiet = False)
	tester.full_check("circle_area", args=[10], e_return=78.5, quiet = False)
	tester.full_check("circle_area", args=[5], e_return=19.625, quiet = False)
	
	tester.check_function_exists("circle_circumference")
	tester.check_function_parameters("circle_circumference", 1)
	tester.full_check("circle_circumference", args=[2], e_return=6.28, quiet = False)
	tester.full_check("circle_circumference", args=[7.3], e_return=22.922, quiet = False)
	tester.full_check("circle_circumference", args=[10], e_return=31.400000000000002, quiet = False)
	tester.full_check("circle_circumference", args=[5], e_return=15.700000000000001, quiet = False)

	
    
    
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