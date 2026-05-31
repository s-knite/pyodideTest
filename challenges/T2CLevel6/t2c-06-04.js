export const challenge = {
    id: 't2c-06-04',
    title: 'Times Tables 🔢✖️🧮',
    
    instructionsHTML: `
        <p>Write a subprogram named <code>times_table</code> that accepts a single integer parameter.</p>
        <p>The subprogram should print the multiplication table for that number from 1 to 12, formatted exactly as <code>1 x X = Y</code>.</p>
    `,

    challengeTests: `
tester = Tester()
try:
    # Check function structure
    tester.check_function_exists("times_table")
    tester.check_function_parameters("times_table", 1)

    # Typical 1
    tester.full_check("times_table", args=[3], e_out="1 x 3 = 3\\n2 x 3 = 6\\n3 x 3 = 9\\n4 x 3 = 12\\n5 x 3 = 15\\n6 x 3 = 18\\n7 x 3 = 21\\n8 x 3 = 24\\n9 x 3 = 27\\n10 x 3 = 30\\n11 x 3 = 33\\n12 x 3 = 36", quiet=False)

    # Evaluate 1
    tester.full_check("times_table", args=[6], e_out="1 x 6 = 6\\n2 x 6 = 12\\n3 x 6 = 18\\n4 x 6 = 24\\n5 x 6 = 30\\n6 x 6 = 36\\n7 x 6 = 42\\n8 x 6 = 48\\n9 x 6 = 54\\n10 x 6 = 60\\n11 x 6 = 66\\n12 x 6 = 72", quiet=False)

    # Evaluate 2
    tester.full_check("times_table", args=[12], e_out="1 x 12 = 12\\n2 x 12 = 24\\n3 x 12 = 36\\n4 x 12 = 48\\n5 x 12 = 60\\n6 x 12 = 72\\n7 x 12 = 84\\n8 x 12 = 96\\n9 x 12 = 108\\n10 x 12 = 120\\n11 x 12 = 132\\n12 x 12 = 144", quiet=False)

    # Hidden 1
    tester.full_check("times_table", args=[5], e_out="1 x 5 = 5\\n2 x 5 = 10\\n3 x 5 = 15\\n4 x 5 = 20\\n5 x 5 = 25\\n6 x 5 = 30\\n7 x 5 = 35\\n8 x 5 = 40\\n9 x 5 = 45\\n10 x 5 = 50\\n11 x 5 = 55\\n12 x 5 = 60", quiet=True)

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
