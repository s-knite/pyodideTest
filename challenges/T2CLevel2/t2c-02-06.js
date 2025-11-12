
export const challenge = {
    id: 't2c-02-06',
    title: 'POCC - 💷💵💴 Currency Converter',
    
    instructionsHTML: `
        <p>These tests are for the Time 2 Code challenge 02-06 Currency Converter</p>
		<p><a href="https://time2code.today/python-course/python-level-2/python-currency-converter" target="_blank">Click here to see challenge details</a></p>
		<p>This code will only check that the subprograms work correctly - don't include any inputs here</p>
    `,

    challengeTests: `
tester = Tester()
try:
    tester.check_function_exists("exchange")
    tester.check_function_parameters("exchange", 2)
    tester.full_check("exchange", args=[200,"USD"], e_return=260.0, quiet = False)
    tester.full_check("exchange", args=[150,"USD"], e_return=195.0, quiet = True)
    tester.full_check("exchange", args=[205,"Euro"], e_return=227.55, quiet = False)
    tester.full_check("exchange", args=[301,"Euro"], e_return=334.11, quiet = True)
    tester.full_check("exchange", args=[5,"Yuan"], e_return=44.6, quiet = False)
    tester.full_check("exchange", args=[200,"Yuan"], e_return=1784.0, quiet = True)
    tester.full_check("exchange", args=[130,"Yen"], e_return=17997.2, quiet = False)
    tester.full_check("exchange", args=[200,"Yen"], e_return=27688.0, quiet = True)

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
