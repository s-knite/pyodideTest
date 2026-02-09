export const challenge = {
    id: 'yr9-assess-03',
    title: 'Input/Output: Double-Up 🔢',
    description: 'Convert user input into numbers for calculation.',
    instructionsHTML: `
    <p>Define a function called <code>double_number()</code>:</p>
    <ul>
      <li>It should take <b>no parameters</b>.</li>
      <li>Use <code>input()</code> to ask: <b>"Enter a number: "</b></li>
      <li>Convert that input to an <b>integer</b> and multiply it by 2.</li>
      <li>Use <code>print()</code> to output: <b>"That doubles to: [result]"</b></li>
    </ul>
    `,
    challengeTests: `
tester = Tester()
try:
    tester.check_function_exists("double_number")
    tester.check_function_parameters("double_number", 0)
    
    # Testing with input '5' (should print 10)
    tester.full_check(
        "double_number", 
        inputs=["5"], 
        e_out="That doubles to: 10"
    )
    
    # Testing with input '21' (should print 42)
    tester.full_check(
        "double_number", 
        inputs=["21"], 
        e_out="That doubles to: 42"
    )

except Exception as e:
    tester.results.append({
        "testNumber" : -1, 
        "testDescription" : f"Critical error: {e}", 
        "testResult" : "FAILED", 
        "resultIcon" : "🔴" 
    })

tester.json_results()
`
};
