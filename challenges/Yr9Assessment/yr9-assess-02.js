export const challenge = {
    id: 'yr9-assess-02',
    title: 'Strings: The Shouter 📢',
    description: 'Transform user input using string methods.',
    instructionsHTML: `
    <p>Create a function <code>shout_it()</code> with no parameters:</p>
    <ul>
      <li>Ask the user: <b>"Type something: "</b></li>
      <li>Print the input back in <b>ALL CAPS</b>.</li>
      <li>Add <b>!!!</b> to the very end of the message.</li>
      <li><i>Example: "hello" becomes "HELLO!!!"</i></li>
    </ul>
    <p>Hint you can use the upper function, for example test.upper()</p>
    `,
    challengeTests: `
tester = Tester()
try:
    tester.check_function_exists("shout_it")
    
    # Test with lowercase input
    tester.full_check("shout_it", inputs=["hello"], e_out="HELLO!!!")
    
    # Test with mixed case input
    tester.full_check("shout_it", inputs=["Python"], e_out="PYTHON!!!")

except Exception as e:
    tester.results.append({"testNumber": -1, "testDescription": f"Error: {e}", "testResult": "FAILED", "resultIcon": "🔴"})

tester.json_results()
`
};
