export const challenge = {
    id: 't2c-06-05',
    title: 'Vote Counter 🗳️📊🔢',
    
    instructionsHTML: `
        <p>Write a subprogram named <code>count_votes</code> that accepts a single list of strings representing votes (e.g., <code>"A"</code>, <code>"B"</code>, <code>"C"</code>, or <code>"D"</code>).</p>
        <p>The subprogram should count the occurrences of each vote and return a list of four integers representing the total counts for <code>[A, B, C, D]</code> respectively.</p>
    `,

    challengeTests: `
tester = Tester()
try:
    # Check function structure
    tester.check_function_exists("count_votes")
    tester.check_function_parameters("count_votes", 1)

    # Typical 1
    tester.full_check("count_votes", args=[["A", "B", "B", "B", "B", "C", "C", "D", "A", "B","A", "B", "A", "B", "D", "B", "C", "B", "B", "A"]], e_return=[5, 10, 3, 2], quiet=False)

    # Hidden 1
    tester.full_check("count_votes", args=[["A", "C", "B", "D", "A"]], e_return=[2, 1, 1, 1], quiet=True)

    # Hidden 2
    tester.full_check("count_votes", args=[["A", "B", "C", "A", "B", "B", "B", "C", "B", "C"]], e_return=[2, 5, 3, 0], quiet=True)

    # Hidden 3
    tester.full_check("count_votes", args=[["C", "C", "A", "D", "A", "D", "A", "C", "A", "D", "D", "B", "C", "D", "A", "B", "A", "C", "B", "C", "D", "D", "A", "C", "C"]], e_return=[7, 3, 8, 7], quiet=True)

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
