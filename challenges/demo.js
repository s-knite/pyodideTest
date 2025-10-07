export const challenge = {
    id: 'demo',
    title: 'POCC - Demo',
    
    instructionsHTML: `
        <p>These tests are to demonstrate the platform</p>
		<ul>
			<li>Create a variable called username with the value Ada Lovelace</li>
			<li>Create a variable called age with the value 17</li>
			<li>Create a variable called programmer with the value True</li>
			<li>Create a variable called score with the value 98.7</li>
			<li>Create a function valled greeting that takes a name as a parameter and outputs "Hello, [name]!"</li>
			<li>Create a function called calculation which takes in 3 parameters, add the first two numbers, multiply the result by the 3rd number and return the calculated value</li>
			
		</ul>
    `,

    challengeTests: `
tester = Tester()
try:
	tester.check_variable_exists("username")
	tester.check_variable_type_hint("username", str)
	tester.check_variable_value("username", "Ada Lovelace", str)
	tester.check_variable_exists("age")
	tester.check_variable_type_hint("age", int)
	tester.check_variable_value("age", 17, int)
	tester.check_variable_exists("programmer")
	tester.check_variable_type_hint("programmer", bool)
	tester.check_variable_value("programmer", True, bool)
	tester.check_variable_exists("score")
	tester.check_variable_type_hint("score", float)
	tester.check_variable_value("score", 98.7, float)
	
	tester.check_function_exists("greeting")
	tester.check_function_parameters("greeting", 1)
	tester.full_check("greeting", args=["Ada"], e_out="Hello, Ada!")
	tester.full_check("greeting", args=["Bob"], e_out="Hello, Bob!", quiet=True)

	tester.check_function_exists("calculation")
	tester.check_function_parameters("calculation", 3)
	tester.full_check("calculation", args=[2,3,4], e_return=20)
	tester.full_check("calculation", args=[3,4,5], e_return=35, quiet=True)
	

	
    
    
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