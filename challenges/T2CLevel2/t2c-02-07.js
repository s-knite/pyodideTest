
export const challenge = {
    id: 't2c-02-05',
    title: 'POCC - ⚗️🧪👩‍🔬 Nitrate',
    
    instructionsHTML: `
        <p>These tests are for the Time 2 Code challenge 02-07 Nitrate</p>
		<p><a href="https://time2code.today/python-course/python-level-2/python-nitrate" target="_blank">Click here to see challenge details</a></p>
		<p>This code will only check that the subprograms work correctly - don't include any inputs here</p>
    `,

    challengeTests: `
tester = Tester()
try:
    tester.check_function_exists("calculate_dose")
    tester.check_function_parameters("calculate_dose", 1)
    tester.full_check("calculate_dose", args=[25], e_return=3, quiet = False)
    tester.full_check("calculate_dose", args=[6], e_return=2, quiet = False)
    tester.full_check("calculate_dose", args=[1.25], e_return=1, quiet = False)
    tester.full_check("calculate_dose", args=[50], e_return=3, quiet = False)
    tester.full_check("calculate_dose", args=[7.25], e_return=2, quiet = False)
    tester.full_check("calculate_dose", args=[2], e_return=1, quiet = False)
    tester.full_check("calculate_dose", args=[0.5], e_return=0.5, quiet = False)
    tester.full_check("calculate_dose", args=[10], e_return=2, quiet = True)
    tester.full_check("calculate_dose", args=[2.5], e_return=1, quiet = True)
    tester.full_check("calculate_dose", args=[0.5], e_return=0.5, quiet = True)

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
