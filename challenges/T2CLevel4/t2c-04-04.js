export const challenge = {
    id: 't2c-04-04',
    title: 'POCC - Dungeon Master 📖🏰🐲',
    
    instructionsHTML: `
        <p>These tests check that your <code>check_skill</code> subprogram works correctly.</p>
        <p>This code will only check the subprogram logic - don't include any global inputs here.</p>
    `,

    challengeTests: `
tester = Tester()
try:
    # Check function structure
    tester.check_function_exists("check_skill")
    tester.check_function_parameters("check_skill", 3)

    # Typical 1
    tester.full_check("check_skill", args=[15, 2, 12], e_return="Automatic pass", quiet=False)
    
    # Typical 2
    tester.full_check("check_skill", args=[6, -1, 14], randoms=[20], e_out="You rolled a 20", e_return="Critical success", quiet=False)

    # Typical 3
    tester.full_check("check_skill", args=[10, 2, 20], randoms=[13], e_out="You rolled a 13", e_return="Check passed", quiet=False)

    # Typical 4
    tester.full_check("check_skill", args=[9, -2, 13], randoms=[3], e_out="You rolled a 3", e_return="Check failed", quiet=False)

    # Evaluate 1 (Duplicate of Typical 1 - Quiet)
    tester.full_check("check_skill", args=[15, 2, 12], e_return="Automatic pass", quiet=True)

    # Evaluate 2 (Duplicate of Typical 4 - Quiet)
    tester.full_check("check_skill", args=[9, -2, 13], randoms=[3], e_out="You rolled a 3", e_return="Check failed", quiet=True)

    # Crit Fail
    tester.full_check("check_skill", args=[10, 2, 14], randoms=[1], e_out="You rolled a 1", e_return="Critical fail", quiet=False)

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
