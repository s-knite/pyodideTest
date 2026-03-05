export const challenge = {
    id: 't2c-04-09',
    title: 'POCC - Rock, Paper, Scissors 🪨📃✂️',
    
    instructionsHTML: `
        <p>These tests check all your subprograms for the Rock, Paper, Scissors game.</p>
        <p><strong>!!Note there is a typo on the Time2Code page - please make sure your function is called get_cpu_choice not cpu_choice!!</strong></p>
        <p>This code will test <code>convert</code>, <code>get_player_choice</code>, <code>cpu_choice</code>, <code>who_won_round</code>, and <code>play_game</code>.</p>
    `,

    challengeTests: `
tester = Tester()
try:
    # --- convert ---
    tester.check_function_exists("convert")
    tester.check_function_parameters("convert", 1)

    # Convert 1
    tester.full_check("convert", args=["r"], e_return="rock", quiet=False)
    # Convert 2
    tester.full_check("convert", args=["p"], e_return="paper", quiet=False)
    # Convert 3
    tester.full_check("convert", args=["s"], e_return="scissors", quiet=False)


    # --- get_player_choice ---
    tester.check_function_exists("get_player_choice")
    tester.check_function_parameters("get_player_choice", 0)

    # Player choice 1
    tester.full_check("get_player_choice", inputs=["r"], e_return="r", quiet=False)
    # Player choice 2
    tester.full_check("get_player_choice", inputs=["a", "p"], e_return="p", quiet=False)
    # Player choice 3
    tester.full_check("get_player_choice", inputs=["a", "b", "c", "s"], e_return="s", quiet=False)


    # --- cpu_choice ---
    tester.check_function_exists("get_cpu_choice")
    tester.check_function_parameters("get_cpu_choice", 0)

    # Get CPU 1
    tester.full_check("get_cpu_choice", randoms=[1], e_return="r", quiet=False)
    # Get CPU 2
    tester.full_check("get_cpu_choice", randoms=[2], e_return="p", quiet=False)
    # Get CPU 3
    tester.full_check("get_cpu_choice", randoms=[3], e_return="s", quiet=False)


    # --- who_won_round ---
    tester.check_function_exists("who_won_round")
    tester.check_function_parameters("who_won_round", 2)

    # Winner CPU
    tester.full_check("who_won_round", args=["s", "r"], e_return="cpu", quiet=False)
    # Winner Player
    tester.full_check("who_won_round", args=["r", "s"], e_return="player", quiet=False)
    # Winner Draw
    tester.full_check("who_won_round", args=["s", "s"], e_return="draw", quiet=False)


    # --- play_game --- exact string match
    # tester.check_function_exists("play_game")
    # tester.check_function_parameters("play_game", 0)

    # Full game CPU win
    # e_out_cpu_win = "player score: 0  cpu score: 0\\ncpu's paper beats player's rock\\n\\nplayer score: 0  cpu score: 1\\ncpu's paper beats player's rock\\n\\nplayer score: 0  cpu score: 2\\ncpu's scissors beats player's paper\\n\\nplayer score: 0  cpu score: 3\\ncpu's rock beats player's scissors\\n\\nplayer score: 0  cpu score: 4\\ncpu's rock beats player's scissors\\n\\nCPU WINS!"
    # tester.full_check("play_game", inputs=["r", "r", "p", "s", "s"], randoms=[2, 2, 3, 1, 1], e_out=e_out_cpu_win, quiet=False)

    # Full game Player win
    # e_out_player_win = "player score: 0  cpu score: 0\\nplayer's rock beats cpu's scissors\\n\\nplayer score: 1  cpu score: 0\\nplayer's rock beats cpu's scissors\\n\\nplayer score: 2  cpu score: 0\\nplayer's paper beats cpu's rock\\n\\nplayer score: 3  cpu score: 0\\nplayer's scissors beats cpu's paper\\n\\nplayer score: 4  cpu score: 0\\nplayer's scissors beats cpu's paper\\n\\nPlayer WINS!"
    # tester.full_check("play_game", inputs=["r", "r", "p", "s", "s"], randoms=[3, 3, 1, 2, 2], e_out=e_out_player_win, quiet=False)

# --- play_game (Flexible Keyword Matching) ---
    tester.check_function_exists("play_game")
    if tester.confirm_function_exists("play_game"):
        
        # Scenario 1: Full game CPU win
        try:
            with patch("builtins.input", side_effect=["r", "r", "p", "s", "s"]), \
                 patch("random.randint", side_effect=[2, 2, 3, 1, 1]), \
                 patch("sys.stdout", new=StringIO()) as fake_out:
                
                globals()['play_game']()
                
                # Convert student output to lowercase for easy searching
                output = fake_out.getvalue().lower()
                
                # Check for the presence of key victory phrases instead of an exact string
                if "cpu wins" in output or "cpu won" in output:
                    tester.include_result("play_game correctly calculates and announces a CPU win.", PASSED)
                else:
                    tester.include_result("play_game failed to announce the CPU as the winner.", FAILED)
        except StopIteration:
            tester.include_result("play_game crashed: Asked for input too many times.", FAILED)
        except Exception as e:
            tester.include_result(f"play_game CPU win test crashed: {e}", FAILED)

        # Scenario 2: Full game Player win
        try:
            with patch("builtins.input", side_effect=["r", "r", "p", "s", "s"]), \
                 patch("random.randint", side_effect=[3, 3, 1, 2, 2]), \
                 patch("sys.stdout", new=StringIO()) as fake_out:
                
                globals()['play_game']()
                output = fake_out.getvalue().lower()
                
                if "player wins" in output or "player won" in output or "you win" in output:
                    tester.include_result("play_game correctly calculates and announces a Player win.", PASSED)
                else:
                    tester.include_result("play_game failed to announce the Player as the winner.", FAILED)
        except StopIteration:
            tester.include_result("play_game crashed: Asked for input too many times.", FAILED)
        except Exception as e:
            tester.include_result(f"play_game Player win test crashed: {e}", FAILED)
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
