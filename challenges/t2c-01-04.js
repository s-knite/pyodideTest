export const challenge = {
    id: 't2c-01-04',
    title: 'POCC - 🕓2👩‍💻 - Dice Face 5',
    
    instructionsHTML: `
        <p>These tests are for the Time 2 Code challenge 01-04 Dive Face 5</p>
		<p><a href="https://time2code.today/python-course/python-level-1/python-dice-face-5" target="_blank">Click here to see challenge details</a></p>
        <ul>
            <li>Ensure your code is written in a function called output5</li>
			<li>Make sure you have fully tested your output at that it matches exactly</li>
        </ul>
    `,

    challengeTests: `
tester = Tester()
try:
	tester.check_function_exists("output5")
	tester.check_function_parameters("output5", 0)
	tester.full_check("output5", e_out="ooooooooooo\\no         o\\no   # #   o\\no    #    o\\no   # #   o\\no         o\\nooooooooooo", quiet = True)
	
    
    
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