export const challenge = {
    id: 't2c-06-07',
    title: 'Find and Replace 🔄🖨️',
    
    instructionsHTML: `
        <p>This challenge requires you to write two subprograms to work with lists:</p>
        <ol>
            <li><code>replace(old_val, new_val, items_list)</code>: This subprogram should take an item to find, a new item to substitute it with, and a list. It should <strong>return</strong> a new list where all occurrences of <code>old_val</code> are replaced by <code>new_val</code>.</li>
            <li><code>output(items_list)</code>: This subprogram should take a list and <strong>print</strong> each element on a new line.</li>
        </ol>
    `,

    challengeTests: `
tester = Tester()
try:
    # Check structure for 'replace' subprogram
    tester.check_function_exists("replace")
    tester.check_function_parameters("replace", 3)

    # Check structure for 'output' subprogram
    tester.check_function_exists("output")
    tester.check_function_parameters("output", 1)

    # --- Tests for replace() ---
    # Replace 1
    tester.full_check("replace", args=["A", "D", ["A", "B", "C", "A", "B", "C"]], e_return=["D", "B", "C", "D", "B", "C"], quiet=False)

    # Replace 2
    tester.full_check("replace", args=["roly", "what", ["roly", "poly", "roly", "poly", "up", "up", "up", "roly", "poly", "roly", "poly", "down", "down", "down"]], e_return=["what", "poly", "what", "poly", "up", "up", "up", "what", "poly", "what", "poly", "down", "down", "down"], quiet=False)

    # Replace 3
    tester.full_check("replace", args=["poly", "hello", ["roly", "poly", "roly", "poly", "up", "up", "up", "roly", "poly", "roly", "poly", "down", "down", "down"]], e_return=["roly", "hello", "roly", "hello", "up", "up", "up", "roly", "hello", "roly", "hello", "down", "down", "down"], quiet=False)


    # --- Tests for output() ---
    # Output 1
    tester.full_check("output", args=[["A", "B", "C", "A", "B", "C"]], e_out="A\\nB\\nC\\nA\\nB\\nC", quiet=False)

    # Output 2
    tester.full_check("output", args=[["roly", "poly", "roly", "poly", "up", "up", "up", "roly", "poly", "roly", "poly", "down", "down", "down"]], e_out="roly\\npoly\\nroly\\npoly\\nup\\nup\\nup\\nroly\\npoly\\nroly\\npoly\\ndown\\ndown\\ndown", quiet=False)

    # Output 3
    tester.full_check("output", args=[["up", "up", "down", "down", "left", "right", "left", "right", "B", "A"]], e_out="up\\nup\\ndown\\ndown\\nleft\\nright\\nleft\\nright\\nB\\nA", quiet=False)

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
