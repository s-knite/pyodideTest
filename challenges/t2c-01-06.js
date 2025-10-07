export const challenge = {
    id: 't2c-01-06',
    title: 'POCC - 🕓2👩‍💻 - Fish Tank Volume',
    
    instructionsHTML: `
        <p>These tests are for the Time 2 Code challenge 01-06 Fish Tank Volume</p>
		<p><a href="https://time2code.today/python-course/python-level-1/python-fish-tank-volume" target="_blank">Click here to see challenge details</a></p>
		<p>This code will only check that the subprograms work correctly - don't include any inputs here</p>
    `,

    challengeTests: `
tester = Tester()
try:
	tester.check_function_exists("volume")
	tester.check_function_parameters("volume", 3)
	tester.full_check("volume", args=[60,30,24], e_return=43.2, quiet = False)
	tester.full_check("volume", args=[50,75,222], e_return=832.5, quiet = False)
	tester.check_function_exists("litres_to_gallons")
	tester.check_function_parameters("litres_to_gallons", 1)
	tester.full_check("litres_to_gallons", args=[43.2], e_return=9.50285965684118, quiet = False)
	tester.full_check("litres_to_gallons", args=[832.5], e_return=183.12802463704355, quiet = False)
	
    
    
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