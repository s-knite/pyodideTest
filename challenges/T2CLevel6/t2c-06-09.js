export const challenge = {
    id: 't2c-06-09',
    title: 'Distribution of two dice 🎲🎲📈',
    
    instructionsHTML: `
        <p>Write a subprogram named <code>distribution</code> that accepts a single integer parameter representing the number of dice rolls.</p>
        <p>The subprogram should simulate rolling a die that many times and print the resulting counts formatted exactly as <code>value:count</code> (e.g., <code>1:167</code>), with each result on a new line.</p>
    `,

    challengeTests: `
tester = Tester()
try:
    # Check function structure
    tester.check_function_exists("distribution")
    tester.check_function_parameters("distribution", 1)

    if tester.confirm_function_parameters("distribution", 1):
        
        # Test sizes to run
        test_runs = [100, 500, 1000]
        
        for rolls in test_runs:
            with patch("sys.stdout", new=StringIO()) as fake_out:
                try:
                    globals()["distribution"](rolls)
                    result_text = fake_out.getvalue().strip()
                    
                    if not result_text:
                        tester.include_result(f"Failed test with {rolls} rolls. No output was printed.", -1)
                        continue
                    
                    # Parse lines
                    labels = []
                    counts = []
                    total_counted = 0
                    parse_error = False
                    
                    for line in result_text.splitlines():
                        if ":" not in line:
                            parse_error = True
                            continue
                        try:
                            val, count = [int(x.strip()) for x in line.split(":")]
                            labels.append(val)
                            counts.append(count)
                            total_counted += count
                        except ValueError:
                            parse_error = True
                    
                    if parse_error or not counts:
                        tester.include_result(f"Failed test with {rolls} rolls. Output format must be exactly 'value:count' on each line.", -1)
                        continue
                        
                    # Build an ASCII bar chart representation based on percentage
                    max_bar_width = 40  # 40 characters represents 100% of the rolls
                    
                    chart_lines = []
                    for lbl, cnt in zip(labels, counts):
                        # Calculate absolute percentage
                        percentage = (cnt / rolls) * 100 if rolls > 0 else 0
                        
                        # Scale bar relative to total rolls
                        bar_length = int((cnt / rolls) * max_bar_width) if rolls > 0 else 0
                        bar = "█" * max(bar_length, 1) if cnt > 0 else ""
                        
                        chart_lines.append(f"  {lbl}: {cnt:<4} ({percentage:>4.1f}%) {bar}")
                    
                    ascii_chart = "\\n".join(chart_lines)
                    
                    # Programmatic validation check
                    if total_counted == rolls:
                        status = 1  # PASSED
                        description = f"Passed {rolls} rolls verification.\\n\\n📊 Generated Distribution Layout:\\n{ascii_chart}"
                    else:
                        status = -1  # FAILED
                        description = f"Failed {rolls} rolls verification. Total count elements recorded ({total_counted}) does not equal total requested rolls ({rolls}).\\n\\n📊 Output Layout Given:\\n{ascii_chart}"
                        
                    tester.include_result(description, status)
                    
                except Exception as inner_e:
                    tester.include_result(f"Runtime error while running distribution({rolls}): {inner_e}", -1)

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
