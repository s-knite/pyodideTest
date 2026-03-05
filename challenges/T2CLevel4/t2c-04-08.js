export const challenge = {
    id: 't2c-04-08',
    title: 'POCC - Lowest Common Multiple ⌚⏳📆',
    
    instructionsHTML: `
        <p>These tests check that your <code>lcm</code> subprogram correctly calculates the lowest common multiple of two numbers.</p>
        <p>This code will only check the subprogram logic - don't include any global inputs here.</p>
    `,

    challengeTests: `
tester = Tester()
try:
    # Check function structure
    tester.check_function_exists("lcm")
    tester.check_function_parameters("lcm", 2)

    # Typical 1
    tester.full_check("lcm", args=[2, 5], e_return=10, quiet=False)
    
    # Typical 2
    tester.full_check("lcm", args=[6, 4], e_return=12, quiet=False)

    # Typical 3
    tester.full_check("lcm", args=[7, 40], e_return=280, quiet=False)

    # Typical 4
    tester.full_check("lcm", args=[2, 10], e_return=10, quiet=False)

    # Eval 2 (Quiet)
    tester.full_check("lcm", args=[8, 8], e_return=8, quiet=True)

    # Eval 4 (Quiet)
    tester.full_check("lcm", args=[8, 10], e_return=40, quiet=True)

    # Eval 5 (Quiet)
    tester.full_check("lcm", args=[16, 72], e_return=144, quiet=True)

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
