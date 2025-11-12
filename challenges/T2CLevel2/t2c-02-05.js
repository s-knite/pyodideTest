
export const challenge = {
    id: 't2c-02-05',
    title: 'POCC - 🌐🛜📄 HTTP status codes',
    
    instructionsHTML: `
        <p>These tests are for the Time 2 Code challenge 02-05 HTTP Status Codes</p>
		<p><a href="https://time2code.today/python-course/python-level-2/python-http-status-codes" target="_blank">Click here to see challenge details</a></p>
		<p>This code will only check that the subprograms work correctly - don't include any inputs here</p>
    `,

    challengeTests: `
tester = Tester()
try:
    tester.check_function_exists("http_status")
    tester.check_function_parameters("http_status", 1)
    tester.full_check("http_status", args=[400], e_return="Bad request", quiet = False)
    tester.full_check("http_status", args=[401], e_return="Authentication error", quiet = False)
    tester.full_check("http_status", args=[402], e_return="Unknown error", quiet = False)
    tester.full_check("http_status", args=[403], e_return="Authentication error", quiet = True)
    tester.full_check("http_status", args=[404], e_return="Not found", quiet = True)
    tester.full_check("http_status", args=[405], e_return="Unknown error", quiet = True)
    tester.full_check("http_status", args=[800], e_return="Unknown error", quiet = True)


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
