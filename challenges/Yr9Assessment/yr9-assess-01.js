export const challenge = {
    id: 'yr9-assess-01',
    title: 'Variables ⭐',
    
    instructionsHTML: `
    <p>These tests are part of the year 9 Python assessment/p>
		<p>Complete all the tasks listed below using Thonny and then paste your code here to test</p>
    <ul>
      <li>Create a variable called player with the value of Ada Lovelace</li>
      <li>Create a variable called password with the value of qwerty1!</li>
      <li>Create a variable called score with the value of 3.7</li>
      <li>Create a variable called lives_left with the value of 3</li>
    </ul>
    `,

    challengeTests: `
tester = Tester()
try:
	tester.check_variable_exists("player")
	tester.check_variable_type_hint("player", str)
	tester.check_variable_value("player", "Ada Lovelace", str)
	tester.check_variable_exists("password")
	tester.check_variable_type_hint("password", str)
	tester.check_variable_value("password", "qwerty1!", str)
	tester.check_variable_exists("score")
	tester.check_variable_type_hint("score", float)
	tester.check_variable_value("score", "3.7", float)
	tester.check_variable_exists("lives_left")
	tester.check_variable_type_hint("lives_left", int)
	tester.check_variable_value("lives_left", 3, int)
    
    
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
