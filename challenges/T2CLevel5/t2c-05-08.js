export const challenge = {
    id: 't2c-05-08',
    title: 'POCC - Cut the Deck ♠️♥️♦️♣️',
    
    instructionsHTML: `
        <p>These tests will automatically play your <code>play_game</code> subprogram 500 times using random inputs to ensure it works without crashing and correctly declares a winner every time.</p>
        <p><strong>Note:</strong> Make sure your win/loss messages contain exactly <code>"You win"</code> or <code>"CPU wins"</code> so the automatic tester can tally the results!</p>
    `,

    challengeTests: `
tester = Tester()
try:
    import random
    from unittest.mock import patch
    from io import StringIO
    
    tester.check_function_exists("play_game")
    
    if tester.confirm_function_exists("play_game"):
        num_tests = 500
        player_wins = 0
        cpu_wins = 0
        errors = 0
        
        for _ in range(num_tests):
            random_input = str(random.randint(0, 34))
            
            # Patch input to provide a random number, and trap stdout to read the result
            with patch("builtins.input", side_effect=[random_input]), patch("sys.stdout", new=StringIO()) as fake_out:
                try:
                    globals()['play_game']()
                    output = fake_out.getvalue().strip()
                    
                    if "You win" in output:
                        player_wins += 1
                    elif "CPU wins" in output:
                        cpu_wins += 1
                    else:
                        errors += 1
                except StopIteration:
                    # Catches exception raised if the student's code asks for input more than once
                    errors += 1
                except Exception:
                    # Catches any other crashes during the game
                    errors += 1
        
        # Evaluate the simulation
        if errors == 0 and (player_wins + cpu_wins == num_tests):
            tester.include_result(f"Successfully simulated {num_tests} games! Player won {player_wins}, CPU won {cpu_wins}.", PASSED)
        else:
            tester.include_result(f"Simulated {num_tests} games. {errors} games crashed or failed to print 'You win' / 'CPU wins'.", FAILED)

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
