export const challenge = {
    id: 'yr9-math-logic',
    title: 'Logic: Bulk Discount 🛒',
    instructionsHTML: `
    <p>Create a function <code>get_total(price: float, quantity: int)</code>:</p>
    <ul>
      <li>Calculate the subtotal (price multiplied by quantity).</li>
      <li>If the quantity is <b>10 or more</b>, subtract £5 from the subtotal.</li>
      <li>Return the final total as a number.</li>
    </ul>
    `,
    challengeTests: `
tester = Tester()
try:
    tester.check_function_exists("get_total")
    # Test standard price (5 * 2 = 10.0)
    tester.full_check("get_total", args=[5.0, 2], e_return=10.0)
    # Test discount price (2.0 * 10 = 20.0 - 5.0 = 15.0)
    tester.full_check("get_total", args=[2.0, 10], e_return=15.0)
except Exception as e:
    tester.results.append({"testNumber": -1, "testDescription": f"Error: {e}", "testResult": "FAILED", "resultIcon": "🔴"})
tester.json_results()
`
};
