export const challenge = {
    id: 't2c-05-07', 
    title: 'POCC - Darts Validation 🎯🎯🎯',
    
    instructionsHTML: `
        <p>These tests check your <code>is_dart_valid</code> subprogram, as well as the flow of your <code>play_game</code> subprogram.</p>
        <p><strong>‼️ Important:</strong> Ensure your global scores are stored in a list called <code>score</code> for the tests to work.</p>
        <p>This code will only check the subprogram logic - don't include any global inputs here.</p>
    `,

    challengeTests: `
tester = Tester()
try:
    # 1. Check is_dart_valid function structure and logic
    tester.check_function_exists("is_dart_valid")
    tester.check_function_parameters("is_dart_valid", 1)

    if tester.confirm_function_exists("is_dart_valid"):
        # Valid single
        tester.full_check("is_dart_valid", args=[11], e_return=True, quiet=False)
        # Bullseye 1
        tester.full_check("is_dart_valid", args=[50], e_out="Shot!", e_return=True, quiet=False)
        # Bullseye 2
        tester.full_check("is_dart_valid", args=[25], e_out="Shot!", e_return=True, quiet=False)
        # Invalid 1
        tester.full_check("is_dart_valid", args=[-5], e_return=False, quiet=False)
        # Invalid 2
        tester.full_check("is_dart_valid", args=[500], e_return=False, quiet=False)
        # Double 15
        tester.full_check("is_dart_valid", args=[30], e_out="Double 15", e_return=True, quiet=False)
        # Treble 20
        tester.full_check("is_dart_valid", args=[60], e_out="Treble 20", e_return=True, quiet=False)
    
    # 2. Check play_game function and score variable
    tester.check_variable_exists("score")
    tester.check_function_exists("play_game")

    if tester.confirm_function_exists("play_game") and tester.confirm_variable_exists("score"):
        
        # Test A: Player 1 wins cleanly in one turn
        try:
            globals()['score'] = [101, 101]
            # Throw sequence: 60 (Treble 20), 1 (Single 1), 40 (Double 20) -> Reaches exactly 0 with a double
            with patch("builtins.input", side_effect=["60", "1", "40"]), patch("sys.stdout", new=StringIO()) as fake_out:
                globals()['play_game']()
            
            if globals()['score'][0] == 0:
                tester.include_result("play_game correctly handles a clean winning leg for Player 1.", PASSED)
            else:
                tester.include_result(f"play_game failed Player 1 win logic. Expected final score [0, 101], got {globals()['score']}", FAILED)
        except StopIteration:
            tester.include_result("play_game asked for more inputs than expected during a winning turn. Check win condition logic.", FAILED)
        except Exception as e:
            tester.include_result(f"play_game crashed during a standard winning turn: {e}", FAILED)

        # Test B: Player 1 Busts, Player 2 Wins
        try:
            globals()['score'] = [20, 20]
            # Player 1 throws 15, then 10 (Total 25. Busts, score resets to 20).
            # Player 2 throws 20 (Double 10, valid double, wins!).
            with patch("builtins.input", side_effect=["15", "10", "20"]), patch("sys.stdout", new=StringIO()) as fake_out:
                globals()['play_game']()
            
            output = fake_out.getvalue()
            if globals()['score'] == [20, 0] and "Bust!" in output:
                tester.include_result("play_game correctly handles a bust and allows Player 2 to win.", PASSED)
            else:
                tester.include_result(f"play_game failed bust logic. Expected score [20, 0] with a 'Bust!' print, got {globals()['score']}", FAILED)
        except Exception as e:
            tester.include_result(f"play_game crashed during bust/Player 2 testing: {e}", FAILED)

        # Test C: Invalid Dart Handling
        try:
            globals()['score'] = [10, 10]
            # Player 1 throws 500 (invalid dart), then 10 (Double 5, wins).
            with patch("builtins.input", side_effect=["500", "10"]), patch("sys.stdout", new=StringIO()) as fake_out:
                globals()['play_game']()
            
            output = fake_out.getvalue()
            # If the invalid dart ended the turn, they wouldn't win. If it crashed, we hit the except block.
            if globals()['score'][0] == 0 and "Invalid dart" in output:
                tester.include_result("play_game correctly rejects invalid darts without ending the turn.", PASSED)
            else:
                tester.include_result("play_game failed to handle invalid darts correctly.", FAILED)
        except Exception as e:
            tester.include_result(f"play_game crashed during invalid dart testing: {e}", FAILED)

    else:
        # Explicitly skip tests if requirements aren't met
        tester.include_result("play_game Player 1 wins (Skipped - missing function or 'score' variable).", SKIPPED)
        tester.include_result("play_game Player 2 wins (Skipped - missing function or 'score' variable).", SKIPPED)
        tester.include_result("play_game rejects invalid darts without ending the turn (Skipped - missing function or 'score' variable).", SKIPPED)

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
