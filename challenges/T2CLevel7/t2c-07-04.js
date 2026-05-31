export const challenge = {
    id: 't2c-07-04',
    title: 'POCC - Airline ticket ✈️👩‍💻🌍',
    
    instructionsHTML: `
        <p>This test checks your <code>airports</code> subprogram.</p>
        <p>The function should take two string parameters (a departure airport and an arrival airport) and return a formatted route string combining parts of both names.</p>
        <p>This code will only check the subprogram logic - don't include any global inputs here.</p>
    `,

    challengeTests: `
tester = Tester()
try:
    # --- airports ---
    tester.check_function_exists("airports")
    tester.check_function_parameters("airports", 2)

    # Test cases
    tester.full_check("airports", args=["Dallas", "Heathrow"], e_return="DALL-HEAT", quiet=False)
    tester.full_check("airports", args=["Heathrow", "Hartsfield"], e_return="HEAT-HART", quiet=False)
    tester.full_check("airports", args=["John F Kennedy", "Gatwick"], e_return="JOHN-GATW", quiet=False)
    tester.full_check("airports", args=["Southampton", "Gatwick"], e_return="SOUT-GATW", quiet=False)

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
