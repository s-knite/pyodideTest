export const challenge = {
    id: 't2c-04-06',
    title: 'POCC - Guess the Number 🔢❓🤔',
    
    instructionsHTML: `
        <p>These tests check that your <code>play_guess_the_number</code> subprogram handles the game logic correctly.</p>
        <p>This code will only check the subprogram logic - don't include any global inputs here.</p>
    `,

    challengeTests: `
tester = Tester()
try:
    # Check function structure
    tester.check_function_exists("play_guess_the_number")
    tester.check_function_parameters("play_guess_the_number", 2)

    # Typical 1
    tester.full_check("play_guess_the_number", args=[1, 10], inputs=["5", "7"], randoms=[7], e_out="Your guess is too low.\\nYou've got it, I chose 7. It took you 2 guesses.", quiet=False)

    # In 4
    tester.full_check("play_guess_the_number", args=[1, 20], inputs=["5", "7", "15", "13"], randoms=[13], e_out="Your guess is too low.\\nYour guess is too low.\\nYour guess is too high.\\nYou've got it, I chose 13. It took you 4 guesses.", quiet=False)

    # Lucky Guess
    tester.full_check("play_guess_the_number", args=[1, 10], inputs=["7"], randoms=[7], e_out="You've got it, I chose 7. It took you 1 guesses.", quiet=False)

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
