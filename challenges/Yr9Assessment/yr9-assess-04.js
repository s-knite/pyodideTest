export const challenge = {
    id: 'yr9-assess-04',
    title: 'Conditionals: Cinema Tickets 🎟️',
    description: 'Use if-else statements to determine ticket prices.',
    instructionsHTML: `
    <p>Write a function <code>calculate_ticket(age: int)</code>:</p>
    <ul>
      <li>If age is 12 or under, return "£5"</li>
      <li>If age is older than 12, return "£10"</li>
      <li>Ensure you use type hints for the parameter!</li>
    </ul>
    `,
    challengeTests: `
tester = Tester()
try:
    tester.check_function_exists("calculate_ticket")
    tester.full_check("calculate_ticket", args=[10], e_return="£5")
    tester.full_check("calculate_ticket", args=[12], e_return="£5")
    tester.full_check("calculate_ticket", args=[13], e_return="£10")
    tester.full_check("calculate_ticket", args=[25], e_return="£10")
except Exception as e:
    tester.results.append({"testNumber": -1, "testDescription": f"Error: {e}", "testResult": "FAILED", "resultIcon": "🔴"})
tester.json_results()
`
};
