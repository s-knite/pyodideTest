
export const challenge = {
    id: 't2c-02-04',
    title: 'POCC - 🧊💧♨️ - States of water',
    
    instructionsHTML: `
        <p>These tests are for the Time 2 Code challenge 02-04 States of water</p>
		<p><a href="https://time2code.today/python-course/python-level-2/python-states-of-water" target="_blank">Click here to see challenge details</a></p>
		<p>This code will only check that the subprograms work correctly - don't include any inputs here</p>
    `,

    challengeTests: `
tester = Tester()
try:
	tester.check_function_exists("water_state")
	tester.check_function_parameters("water_state", 1)
	tester.full_check("water_state", args=[20], e_return="liquid", quiet = False)
	tester.full_check("water_state", args=[-8], e_return="solid", quiet = False)
	tester.full_check("water_state", args=[106.89], e_return="gaseous", quiet = False)
	tester.full_check("water_state", args=[-12.5], e_return="solid", quiet = True)
	tester.full_check("water_state", args=[7], e_return="liquid", quiet = True)
	tester.full_check("water_state", args=[160.459], e_return="gaseous", quiet = True)
	tester.full_check("water_state", args=[0], e_return="solid", quiet = True)
	tester.full_check("water_state", args=[100], e_return="gaseous", quiet = True)


	

	
    
    
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
