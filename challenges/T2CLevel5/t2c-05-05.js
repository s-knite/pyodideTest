// needs extensive testing

export const challenge = {
    id: 't2c-05-05',
    title: 'POCC - Tournament Draw ☕🎲🎫',
    
    instructionsHTML: `
        <p>These tests check your <code>input_teams</code> and <code>draw_teams</code> subprograms.</p>
        <p><strong>‼️ Important:</strong> For the automatic testing to work, you must ensure the global list used to store the teams is called <code>teams</code>.</p>
        <p>This code will only check the subprogram logic - don't include any global inputs here.</p>
    `,

    challengeTests: `
tester = Tester()
try:
    # 1. Check for the global variable 'teams'
    tester.check_variable_exists("teams")

    # 2. Test input_teams (Checks if it modifies the global variable)
    tester.check_function_exists("input_teams")
    if tester.confirm_function_exists("input_teams") and tester.confirm_variable_exists("teams"):
        # Reset the global teams list
        globals()['teams'] = [] 
        
        # Test 1: First pass of inputs
        try:
            with patch("builtins.input", side_effect=["Team A", "Team B", "n"]):
                globals()['input_teams']()
            if globals()['teams'] == ["Team A", "Team B"]:
                tester.include_result("input_teams successfully stores the first pass of teams.", PASSED)
            else:
                tester.include_result(f"input_teams failed to store teams correctly. Expected ['Team A', 'Team B'], Got: {globals()['teams']}", FAILED)
        except Exception as e:
            tester.include_result(f"input_teams Pass 1 crashed: {e}", FAILED)

        # Test 2: Appending second pass of inputs
        try:
            with patch("builtins.input", side_effect=["Team C", "Team D", "y", "Team E", "Team F", "n"]):
                globals()['input_teams']()
            if globals()['teams'] == ["Team A", "Team B", "Team C", "Team D", "Team E", "Team F"]:
                tester.include_result("input_teams successfully appends new teams to the existing list.", PASSED)
            else:
                tester.include_result(f"input_teams failed to append new teams. Expected 6 teams, Got: {globals()['teams']}", FAILED)
        except Exception as e:
            tester.include_result(f"input_teams Pass 2 crashed: {e}", FAILED)

    # 3. Test draw_teams (Runs multiple times to ensure it doesn't crash)
    tester.check_function_exists("draw_teams")
    if tester.confirm_function_exists("draw_teams") and tester.confirm_variable_exists("teams"):
        try:
            # We trap the print output using a fake stdout so it doesn't spam the console
            with patch("sys.stdout", new=StringIO()) as fake_out:
                globals()['teams'] = ["Team A", "Team B", "Team C", "Team D", "Team E", "Team F"]
                globals()['draw_teams']()
                globals()['teams'] = ["Team A", "Team B", "Team C", "Team D", "Team E", "Team F"]
                globals()['draw_teams']()
                globals()['teams'] = ["Team A", "Team B", "Team C", "Team D", "Team E", "Team F"]
                globals()['draw_teams']()
            tester.include_result("draw_teams successfully executes multiple times without crashing.", PASSED)
        except Exception as e:
            tester.include_result(f"draw_teams execution failed or crashed: {e}", FAILED)

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
