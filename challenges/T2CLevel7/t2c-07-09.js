export const challenge = {
    id: 't2c-07-09',
    title: 'POCC - Palindrome 🔄📝✅',
    
    instructionsHTML: `
        <p>This test checks your <code>palindrome</code> subprogram.</p>
        <p>The function should take a single string parameter and return a boolean (<code>True</code> if the string reads the same forwards and backwards, or <code>False</code> otherwise).</p>
        <p>This code will only check the subprogram logic - don't include any global inputs here.</p>
    `,

    challengeTests: `
tester = Tester()
try:
    # --- palindrome ---
    tester.check_function_exists("palindrome")
    tester.check_function_parameters("palindrome", 1)

    # Standard visible test cases
    tester.full_check("palindrome", args=["ABBA"], e_return=True, quiet=False)
    tester.full_check("palindrome", args=["02/02/2020"], e_return=True, quiet=False)
    tester.full_check("palindrome", args=["A man, a plan, a canal – Panama"], e_return=True, quiet=False)
    tester.full_check("palindrome", args=["Hello world"], e_return=False, quiet=False)
    tester.full_check("palindrome", args=["saippuakivikauppias"], e_return=True, quiet=False)
    tester.full_check("palindrome", args=["Tattarrattat"], e_return=True, quiet=False)
    tester.full_check("palindrome", args=["palindrome"], e_return=False, quiet=False)

    # Hidden test cases
    tester.full_check("palindrome", args=["1234321"], e_return=True, quiet=True)
    tester.full_check("palindrome", args=["String manipulation is fun!"], e_return=False, quiet=True)
    tester.full_check("palindrome", args=["TaCo cAt"], e_return=True, quiet=True)

except Exception as e:
    tester.results.append({
        "testNumber" : -1,
        "testDescription" : f"Critical error - test code could not complete: {e}",
        "testResult" : "FAILED",
        "resultIcon" : "🔴" 
    })

# final expression returned to JavaScript
tester.json_results()
`
};
