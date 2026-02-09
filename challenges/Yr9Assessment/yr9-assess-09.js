export const challenge = {
    id: 'yr9-assess-09',
    title: 'Outstanding: The Data Sanitizer 🛡️',
    description: 'Manual string validation and boolean flags across three functions.',
    instructionsHTML: `
    <p>Build a secure checkout system using these three functions:</p>
    <ul>
      <li><code>is_secure_code(code: str)</code>: 
        <ul>
          <li>Must be exactly 5 characters long.</li>
          <li>Must start with "S" (capital).</li>
          <li>Must NOT contain a space (" ").</li>
          <li>Return True or False.</li>
        </ul>
      </li>
      <li><code>calculate_tax(price: float, luxury_item: bool)</code>: 
        <ul>
          <li>If luxury_item is True, add 20% tax. Otherwise, add 5% tax.</li>
        </ul>
      </li>
      <li><code>main()</code>: The controller function to ask for inputs and call the helpers.</li>
    </ul>
    <p>Hint: letters in strings can be accessed using square brackets just like lists.
</p>
    `,
    challengeTests: `
tester = Tester()
try:
    # 1. Test manual string validation
    tester.check_function_exists("is_secure_code")
    tester.full_check("is_secure_code", args=["S1234"], e_return=True)
    tester.full_check("is_secure_code", args=["A1234"], e_return=False) # Wrong start
    tester.full_check("is_secure_code", args=["S1 34"], e_return=False) # Has space
    tester.full_check("is_secure_code", args=["S123"], e_return=False)  # Too short

    # 2. Test tax logic with boolean flags
    tester.check_function_exists("calculate_tax")
    tester.full_check("calculate_tax", args=[10.0, True], e_return=12.0)
    tester.full_check("calculate_tax", args=[10.0, False], e_return=10.5)

    # 3. Test main orchestration
    tester.check_function_exists("main")
    # Scenario: Invalid Code
    tester.full_check("main", inputs=["B9999"], e_out="Security Error")
    # Scenario: Valid Code and Luxury
    tester.full_check("main", inputs=["S5555", "100", "y"], e_out="Final price: 120.0")

except Exception as e:
    tester.results.append({"testNumber": -1, "testDescription": f"Error: {e}", "testResult": "FAILED", "resultIcon": "🔴"})

tester.json_results()
`
};
