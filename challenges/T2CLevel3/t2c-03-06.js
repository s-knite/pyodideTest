export const challenge = {
    id: 't2c-03-06',
    title: 'POCC - 📌🤖💵 - Cashpoint ',
    
    instructionsHTML: `
        <p>These tests are for the Time 2 Code challenge 03-06 Cashpoint</p>
		<p><a href="https://time2code.today/python-course/python-level-3/python-cashpoint" target="_blank">Click here to see challenge details</a></p>
		<p>This code will only check that the subprograms work correctly - don't include any inputs here</p>
    `,

    challengeTests: `
tester = Tester()
try:
	tester.check_function_exists("dispense")
	tester.check_function_parameters("dispense", 1)
	tester.full_check("dispense", args=[50], e_out="W50\\nD20\\nD20\\nD10", quiet = False)
	tester.full_check("dispense", args=[75], e_out="W75\\nD20\\nD20\\nD20\\nD10\\nD5", quiet = False)
	tester.full_check("dispense", args=[0], e_out="W0", quiet = False)
	tester.full_check("dispense", args=[90], e_out="W90\\nD20\\nD20\\nD20\\nD20\\nD10", quiet = False)
	tester.full_check("dispense", args=[200], e_out="W200\\nD20\\nD20\\nD20\\nD20\\nD20\\nD20\\nD20\\nD20\\nD20\\nD20", quiet = True)
	tester.full_check("dispense", args=[315], e_out="W315\\nD20\\nD20\\nD20\\nD20\\nD20\\nD20\\nD20\\nD20\\nD20\\nD20\\nD20\\nD20\\nD20\\nD20\\nD20\\nD10\\nD5", quiet = True)



	

	
    
    
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
