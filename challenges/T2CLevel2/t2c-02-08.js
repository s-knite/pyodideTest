
export const challenge = {
    id: 't2c-02-05',
    title: 'POCC - 📄☑️💯 Exam Grade',
    
    instructionsHTML: `
        <p>These tests are for the Time 2 Code challenge 02-07 Exam Grade</p>
		<p><a href="https://time2code.today/python-course/python-level-2/python-exam-grade" target="_blank">Click here to see challenge details</a></p>
		<p>This code will only check that the subprograms work correctly - don't include any inputs here</p>
    `,

    challengeTests: `
tester = Tester()
try:
    tester.check_function_exists("marks_needed")
    tester.check_function_parameters("marks_needed", 1)
    tester.full_check("marks_needed", args=[50], e_return=4, quiet = False)
    tester.full_check("marks_needed", args=[60], e_return=7, quiet = False)
    tester.full_check("marks_needed", args=[80], e_return=0, quiet = False)
    tester.full_check("marks_needed", args=[0], e_return=2, quiet = False)
    tester.full_check("marks_needed", args=[18], e_return=4, quiet = True)
    tester.full_check("marks_needed", args=[41], e_return=13, quiet = True)
    tester.full_check("marks_needed", args=[90], e_return=0, quiet = True)
    tester.check_function_exists("grade")
    tester.check_function_parameters("grade", 1)
    tester.full_check("grade", args=[50], e_return=6, quiet = False)
    tester.full_check("grade", args=[60], e_return=7, quiet = False)
    tester.full_check("grade", args=[80], e_return=9, quiet = False)
    tester.full_check("grade", args=[0], e_return="U", quiet = False)
    tester.full_check("grade", args=[18], e_return=3, quiet = True)
    tester.full_check("grade", args=[41], e_return=6, quiet = True)
    tester.full_check("grade", args=[90], e_return=9, quiet = True)

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
