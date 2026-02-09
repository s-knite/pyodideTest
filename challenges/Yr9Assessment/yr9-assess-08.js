export const challenge = {
    id: 'yr9-assess-08',
    title: 'Lists: Stock Checker 🔍',
    instructionsHTML: `
    <p>Create a function <code>is_item_in_stock(search_term: str)</code>:</p>
    <ul>
      <li>Inside the function, create a list called <code>stock</code> containing "apple", "banana", and "cherry".</li>
      <li>Check if the <code>search_term</code> is inside that list.</li>
      <li>Return <b>True</b> if it is found, and <b>False</b> if it is not.</li>
    </ul>
    `,
    challengeTests: `
tester = Tester()
try:
    tester.check_function_exists("is_item_in_stock")
    # Test found item
    tester.full_check("is_item_in_stock", args=["apple"], e_return=True)
    # Test missing item
    tester.full_check("is_item_in_stock", args=["pear"], e_return=False)
except Exception as e:
    tester.results.append({"testNumber": -1, "testDescription": f"Error: {e}", "testResult": "FAILED", "resultIcon": "🔴"})
tester.json_results()
`
};
