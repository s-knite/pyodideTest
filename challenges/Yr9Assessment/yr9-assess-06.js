export const challenge = {
    id: 'yr9-assess-06',
    title: 'Lists: Average Finder 📊',
    description: 'Calculate the average value from a list of numbers.',
    instructionsHTML: `
    <p>Create a function <code>get_average(scores: list)</code>:</p>
    <ul>
      <li>Calculate the sum of the list divided by its length.</li>
      <li>Return the result (it should be a decimal/float).</li>
      <li><i>Hint: Use sum(scores) and len(scores).</i></li>
    </ul>
    `,
    challengeTests: `
tester = Tester()
try:
    tester.check_function_exists("get_average")
    tester.full_check("get_average", args=[[10, 20, 30]], e_return=20.0)
    tester.full_check("get_average", args=[[5, 10]], e_return=7.5)
except Exception as e:
    tester.results.append({"testNumber": -1, "testDescription": f"Error: {e}", "testResult": "FAILED", "resultIcon": "🔴"})
tester.json_results()
`
};
