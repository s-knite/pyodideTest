export const challenge = {
    id: 't2c-05-09',
    title: 'POCC - London Underground 🚇🗺️🚇',
    
    instructionsHTML: `
        <p>These tests check your <code>get_station</code> and <code>calculate_stops</code> subprograms.</p>
        <p><strong>Note:</strong> Make sure you have the global <code>stations</code> list (containing the Victoria line stations) defined in your code so the functions can access it!</p>
        <p>This code will only check the subprogram logic - don't include any global inputs here.</p>
    `,

    challengeTests: `
tester = Tester()
try:
    # --- get_station ---
    tester.check_function_exists("get_station")
    # Assuming get_station takes 0 arguments and relies on input()
    tester.check_function_parameters("get_station", 0)

    # First try
    tester.full_check("get_station", inputs=["Brixton"], e_return="Brixton", quiet=False)
    
    # Third try
    tester.full_check("get_station", inputs=["V", "Vaux", "Vauxhall"], e_return="Vauxhall", quiet=False)

    # Eventually
    tester.full_check("get_station", inputs=["A", "B", "C", "A", "B", "C", "A", "B", "C", "A", "B", "C", "Oxford Circus"], e_return="Oxford Circus", quiet=False)


    # --- calculate_stops ---
    tester.check_function_exists("calculate_stops")
    # calculate_stops takes 1 argument (a list containing two stations)
    tester.check_function_parameters("calculate_stops", 1)

    # Stockwell to Oxford Circus
    tester.full_check("calculate_stops", args=[["Stockwell", "Oxford Circus"]], e_return=5, quiet=False)
    
    # Brixton to Walthamstow Central
    tester.full_check("calculate_stops", args=[["Brixton", "Walthamstow Central"]], e_return=15, quiet=False)

    # Oxford Circus to Stockwell
    tester.full_check("calculate_stops", args=[["Oxford Circus", "Stockwell"]], e_return=5, quiet=False)

    # Seven Sisters to Victoria
    tester.full_check("calculate_stops", args=[["Seven Sisters", "Victoria"]], e_return=8, quiet=False)

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
