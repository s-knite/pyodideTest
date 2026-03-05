export const challenge = {
    id: 't2c-04-07',
    title: 'POCC - Time Converter ⌚⏳📆',
    
    instructionsHTML: `
        <p>These tests check that your time conversion subprograms and main program work correctly.</p>
        <p>For these tests you will need to write a function called main that runs the code for your main program as in the instructions</p>
        <p>This code will check <code>seconds_to_hours</code>, <code>seconds_to_minutes</code>, <code>seconds_remaining</code>, and <code>main</code>.</p>
    `,

    challengeTests: `
tester = Tester()
try:
    # --- seconds_to_hours ---
    tester.check_function_exists("seconds_to_hours")
    tester.check_function_parameters("seconds_to_hours", 1)

    # sec2hours 1
    tester.full_check("seconds_to_hours", args=[86000], e_return=23, quiet=False)
    # sec2hours 2
    tester.full_check("seconds_to_hours", args=[30600], e_return=8, quiet=False)


    # --- seconds_to_minutes ---
    tester.check_function_exists("seconds_to_minutes")
    tester.check_function_parameters("seconds_to_minutes", 1)

    # sec2min 1
    tester.full_check("seconds_to_minutes", args=[200], e_return=3, quiet=False)
    # sec2min 2
    tester.full_check("seconds_to_minutes", args=[2010], e_return=33, quiet=False)


    # --- seconds_remaining ---
    tester.check_function_exists("seconds_remaining")
    tester.check_function_parameters("seconds_remaining", 1)

    # sec remain 1
    tester.full_check("seconds_remaining", args=[200], e_return=20, quiet=False)
    # sec remain 2
    tester.full_check("seconds_remaining", args=[2010], e_return=30, quiet=False)


    # --- main ---
    tester.check_function_exists("main")
    # Assuming main takes 0 arguments and relies on input()
    tester.check_function_parameters("main", 0)

    # Eval 1
    tester.full_check("main", inputs=["42"], e_out="0 hours 0 minutes 42 seconds", quiet=False)
    # Eval 2
    tester.full_check("main", inputs=["120"], e_out="0 hours 2 minutes 0 seconds", quiet=False)
    # Eval 3
    tester.full_check("main", inputs=["3600"], e_out="1 hours 0 minutes 0 seconds", quiet=False)
    # Eval 4
    tester.full_check("main", inputs=["65853"], e_out="18 hours 17 minutes 33 seconds", quiet=False)

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
