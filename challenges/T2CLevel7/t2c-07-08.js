export const challenge = {
    id: 't2c-07-08',
    title: 'POCC - Valid Address 📧✅❌',
    
    instructionsHTML: `
        <p>This test checks your <code>validate</code> subprogram.</p>
        <p>The function should take a single string parameter (an address to check) and return a boolean (<code>True</code> if the address meets the format criteria, or <code>False</code> otherwise).</p>
        <p>This code will only check the subprogram logic - don't include any global inputs here.</p>
    `,

    challengeTests: `
tester = Tester()
try:
    # --- validate ---
    tester.check_function_exists("validate")
    tester.check_function_parameters("validate", 1)

    # Test cases
    tester.full_check("validate", args=["abc-@mail.com"], e_return=False, quiet=False)
    tester.full_check("validate", args=["abc-d@mail.com"], e_return=True, quiet=False)
    tester.full_check("validate", args=["abc..def@mail.com"], e_return=False, quiet=False)
    tester.full_check("validate", args=["abc.def@mail.com"], e_return=True, quiet=False)
    tester.full_check("validate", args=["abc.def@mail.c@"], e_return=False, quiet=False)
    tester.full_check("validate", args=["abc.def@mail.cc"], e_return=True, quiet=False)
    tester.full_check("validate", args=["name@domain.com"], e_return=True, quiet=True)
    tester.full_check("validate", args=["n!me@domain.com"], e_return=False, quiet=True)
    tester.full_check("validate", args=["namedomain"], e_return=False, quiet=True)
    tester.full_check("validate", args=["name-123@domain"], e_return=True, quiet=True)

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
