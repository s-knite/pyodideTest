export const challenge = {
    id: 't2c-07-07',
    title: 'POCC - Tweet 🐤💬👩‍💻',
    
    instructionsHTML: `
        <p>This test checks your <code>tweets</code> subprogram.</p>
        <p>The function should take two parameters: a string (the text to chunk) and an integer (the maximum length of each chunk). It should return a list of strings split to that exact maximum length.</p>
        <p>This code will only check the subprogram logic - don't include any global inputs here.</p>
    `,

    challengeTests: `
tester = Tester()
try:
    # --- tweets ---
    tester.check_function_exists("tweets")
    tester.check_function_parameters("tweets", 2)

    # Test cases
    tester.full_check("tweets", args=["Hello", 10], e_return=["Hello"], quiet=False)
    
    tester.full_check("tweets", args=["Hello, how are you today?", 10], e_return=['Hello, how', ' are you t', 'oday?'], quiet=False)
    
    tester.full_check("tweets", args=["The quick brown fox jumps over the lazy dog.", 20], e_return=['The quick brown fox ', 'jumps over the lazy ', 'dog.'], quiet=False)
    
    tester.full_check("tweets", args=["The quick brown fox jumps over the lazy dog.", 5], e_return=['The q', 'uick ', 'brown', ' fox ', 'jumps', ' over', ' the ', 'lazy ', 'dog.'], quiet=False)
    
    tester.full_check("tweets", args=["The quick brown fox jumps over the lazy dog.", 26], e_return=['The quick brown fox jumps ', 'over the lazy dog.'], quiet=False)
    
    tester.full_check("tweets", args=["The quick brown fox jumps over the lazy dog.", 44], e_return=['The quick brown fox jumps over the lazy dog.'], quiet=False)
    
    # Hidden test case
    tester.full_check("tweets", args=["We will not go quietly into the night! We will not vanish without a fight! We're going to live on! We're going to survive! Today, we celebrate our Independence Day!", 13], e_return=['We will not g', 'o quietly int', 'o the night! ', 'We will not v', 'anish without', " a fight! We'", 're going to l', "ive on! We're", ' going to sur', 'vive! Today, ', 'we celebrate ', 'our Independe', 'nce Day!'], quiet=False)

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
