export const challenge = {
    id: 't2c-03-04',
    title: 'POCC - 💵📈💸 - Compound Interest',
    
    instructionsHTML: `
        <p>These tests are for the Time 2 Code challenge 01-04 Compound Interest</p>
		<p><a href="https://time2code.today/python-course/python-level-3/python-compound-interest-2" target="_blank">Click here to see challenge details</a></p>
        <ul>
            <li>Ensure your code is written in a function called output5</li>
			<li>Make sure you have fully tested your output and that it matches exactly</li>
        </ul>
    `,

    challengeTests: `
tester = Tester()
try:
	tester.check_function_exists("compound")
	tester.check_function_parameters("compound", 3)
	tester.full_check("compound", args=[1000,3,1300], e_out="Year 1 : Balance £ 1030\nYear 2 : Balance £ 1060\nYear 3 : Balance £ 1091\nYear 4 : Balance £ 1123\nYear 5 : Balance £ 1156\nYear 6 : Balance £ 1190\nYear 7 : Balance £ 1225\nYear 8 : Balance £ 1261\nYear 9 : Balance £ 1298\nYear 10 : Balance £ 1336", quiet = False)
	tester.full_check("compound", args=[5000,4,8000], e_out="Year 1 : Balance £ 5200\nYear 2 : Balance £ 5408\nYear 3 : Balance £ 5624\nYear 4 : Balance £ 5848\nYear 5 : Balance £ 6081\nYear 6 : Balance £ 6324\nYear 7 : Balance £ 6576\nYear 8 : Balance £ 6839\nYear 9 : Balance £ 7112\nYear 10 : Balance £ 7396\nYear 11 : Balance £ 7691\nYear 12 : Balance £ 7998\nYear 13 : Balance £ 8317", quiet = False)
	tester.full_check("compound", args=[100,2,110], e_out="Year 1 : Balance £ 102\nYear 2 : Balance £ 104\nYear 3 : Balance £ 106\nYear 4 : Balance £ 108\nYear 5 : Balance £ 110", quiet = False)
	tester.full_check("compound", args=[1_000_000,1,1_100_000], e_out="Year 1 : Balance £ 1010000\nYear 2 : Balance £ 1020100\nYear 3 : Balance £ 1030301\nYear 4 : Balance £ 1040604\nYear 5 : Balance £ 1051010\nYear 6 : Balance £ 1061520\nYear 7 : Balance £ 1072135\nYear 8 : Balance £ 1082856\nYear 9 : Balance £ 1093684\nYear 10 : Balance £ 1104620", quiet = True)

	
    
    
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
