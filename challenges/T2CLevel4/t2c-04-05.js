export const challenge = {
    id: 't2c-04-05',
    title: 'POCC - Leap Year 🗓️🐸📅',
    
    instructionsHTML: `
        <p>These tests check that your <code>is_leap_year</code> subprogram correctly identifies leap years.</p>
        <p>This code will only check the subprogram logic - don't include any global inputs here.</p>
    `,

    challengeTests: `
tester = Tester()
try:
    # Check function structure
    tester.check_function_exists("is_leap_year")
    tester.check_function_parameters("is_leap_year", 1)

    # Typical 1 - Century year not divisible by 400
    tester.full_check("is_leap_year", args=[1900], e_return=False, quiet=False)
    
    # Typical 2 - Century year divisible by 400
    tester.full_check("is_leap_year", args=[2000], e_return=True, quiet=False)

    # Typical 3 - Standard non-leap year
    tester.full_check("is_leap_year", args=[2022], e_return=False, quiet=False)

    # Typical 4 - Standard leap year
    tester.full_check("is_leap_year", args=[2024], e_return=True, quiet=False)

    # Evaluate 3 (Standard non-leap year - Quiet)
    tester.full_check("is_leap_year", args=[2026], e_return=False, quiet=True)

    # Evaluate 4 (Standard leap year - Quiet)
    tester.full_check("is_leap_year", args=[2028], e_return=True, quiet=True)

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
