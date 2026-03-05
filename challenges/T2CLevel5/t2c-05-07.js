export const challenge = {
    id: 't2c-05-07', 
    title: 'POCC - Darts Validation 🎯🎯🎯',
    
    instructionsHTML: `
        <p>These tests check that your <code>is_dart_valid</code> subprogram correctly validates dart throws and prints the right messages.</p>
        <p>This code will only check the subprogram logic - don't include any global inputs here.</p>
    `,

    challengeTests: `
tester = Tester()
try:
    # Check function structure
    tester.check_function_exists("is_dart_valid")
    tester.check_function_parameters("is_dart_valid", 1)

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
