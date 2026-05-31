export const challenge = {
    id: 't2c-07-06',
    title: 'POCC - Your move ♟️♟️♟️',
    
    instructionsHTML: `
        <p>This test checks your <code>get_move</code> and <code>get_indexes</code> subprograms.</p>
        <p><code>get_move</code> should take no arguments, read an input from the player, and return it cleaned (uppercased with surrounding whitespace removed).</p>
        <p><code>get_indexes</code> should take a single string coordinate (e.g., <code>"A3"</code>) and return a list of two integers representing its 1-indexed grid positions (e.g., <code>[1, 3]</code>).</p>
        <p>This code will only check the subprogram logic - don't include any global inputs here.</p>
    `,

    challengeTests: `
tester = Tester()
try:
    # --- get_move ---
    tester.check_function_exists("get_move")
    tester.check_function_parameters("get_move", 0)

    # Test cases for input cleaning
    tester.full_check("get_move", inputs=["a3"], e_return="A3", quiet=False)
    tester.full_check("get_move", inputs=["  b5  "], e_return="B5", quiet=False)
    tester.full_check("get_move", inputs=["C1"], e_return="C1", quiet=False)


    # --- get_indexes ---
    tester.check_function_exists("get_indexes")
    tester.check_function_parameters("get_indexes", 1)

    # Standard visible test cases
    tester.full_check("get_indexes", args=["A3"], e_return=[1, 3], quiet=False)
    tester.full_check("get_indexes", args=["C5"], e_return=[3, 5], quiet=False)

    # Hidden test cases to check boundary limits and variations
    tester.full_check("get_indexes", args=["Z9"], e_return=[26, 9], quiet=False)
    tester.full_check("get_indexes", args=["E2"], e_return=[5, 2], quiet=False)

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
