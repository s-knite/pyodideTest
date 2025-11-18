export const challenge = {
    id: 't2c-03-08',
    title: 'POCC - 🧑🪪🔢 - PIN ',
    
    instructionsHTML: `
        <p>These tests are for the Time 2 Code challenge 03-08 PIN</p>
		<p><a href="https://time2code.today/python-course/python-level-3/python-pin" target="_blank">Click here to see challenge details</a></p>
		<p>This code will only check that the subprograms work correctly - don't include any inputs here</p>
    `,

    challengeTests: `
tester = Tester()
try:
	tester.check_function_exists("get_pin")
	tester.check_function_parameters("get_pin", 0)
	tester.full_check("dispense", inputs=["2311","2213","7895"], e_return = False, quiet = False)
	tester.full_check("dispense", inputs=["6753","9622","7528"], e_return = True, quiet = False)
	tester.full_check("dispense", inputs=["7528"], e_return = True, quiet = False)
	tester.full_check("dispense", inputs=["1111","2222","3333"], e_return = False, quiet = True)
	tester.full_check("dispense", inputs="7528"], e_return = True, quiet = True)
	tester.full_check("dispense", inputs=["7582","7285","7528"], e_return = True, quiet = True)




	

	
    
    
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
