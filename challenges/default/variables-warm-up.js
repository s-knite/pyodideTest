export const challenge = {
    id: 'variables-warm-up',
    title: 'POCC - Variables - Warm Up',
    
    instructionsHTML: `
        <p>For this exercise you will create some variables and assign them a value. You will need to make sure you add the correct data type for each variable.</p>
        <ul>
            <li>Create a variable called username, set it to Ada Lovelace</li>
            <li>Create a variable called title, set it to "World's first Computer Programmer"</li>
            <li>Create a variable called age, set it to 17</li>
            <li>Create a variable called score, set it to 98.7</li>
        </ul>
    `,

    challengeTests: `
tester = Tester()
try:
    tester.check_variable_exists("username")
    tester.check_variable_type_hint("username", str)
    tester.check_variable_value("username", "Ada Lovelace", str)
    
    tester.check_variable_exists("title")
    tester.check_variable_type_hint("title", str)
    tester.check_variable_value("title", "World's first Computer Programmer", str)
    
    tester.check_variable_exists("age")
    tester.check_variable_type_hint("age", int)
    tester.check_variable_value("age", 17, int)
    
    tester.check_variable_exists("score")
    tester.check_variable_type_hint("score", float)
    tester.check_variable_value("score", 98.7, float)
    
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
