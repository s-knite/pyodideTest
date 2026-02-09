export const challenge = {
    id: 'yr9-assess-05',
    title: 'Strings: Username Creator 👤',
    description: 'Combine strings and integers into a single format.',
    instructionsHTML: `
    <p>Create a function <code>make_username(first: str, year: int)</code>:</p>
    <ul>
      <li>Convert the first name to <b>lowercase</b>.</li>
      <li>Combine it with the year.</li>
      <li>Return the result as a single string.</li>
    </ul>
    `,
    challengeTests: `
tester = Tester()
try:
    tester.check_function_exists("make_username")
    tester.full_check("make_username", args=["Bob", 2024], e_return="bob2024")
    tester.full_check("make_username", args=["Charlie", 1999], e_return="charlie1999")
except Exception as e:
    tester.results.append({"testNumber": -1, "testDescription": f"Error: {e}", "testResult": "FAILED", "resultIcon": "🔴"})
tester.json_results()
`
};
