export const challenge = {
    id: 't2c-05-04',
    title: 'POCC - Random Name Generator 🎲📛🏭',
    
    instructionsHTML: `
        <p>These tests check that your <code>generate_name</code> subprogram correctly picks and combines names.</p>
        <p><strong>‼️ Important:</strong> For the automatic testing to work, you MUST use the exact name arrays provided in the instructions: <code>["Muhammad", "Noah", "Jack", "Lily", "Sophia", "Olivia"]</code> and <code>["Wang", "Smith", "Devi", "Jones", "Kim", "Rodríguez"]</code>.</p>
        <p>This code will only check the subprogram logic - don't include any global inputs here.</p>
    `,

    challengeTests: `
tester = Tester()
try:
    # Check function structure
    tester.check_function_exists("generate_name")
    tester.check_function_parameters("generate_name", 0)

    # Muhammad Smith
    tester.full_check("generate_name", randoms=[0, 1], e_return="Muhammad Smith", quiet=False)

    # Noah Wang
    tester.full_check("generate_name", randoms=[1, 0], e_return="Noah Wang", quiet=False)

    # Lily Rodríguez
    tester.full_check("generate_name", randoms=[3, 5], e_return="Lily Rodríguez", quiet=False)

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
