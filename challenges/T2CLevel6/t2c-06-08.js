export const challenge = {
    id: 't2c-06-08',
    title: 'The Twelve Days of Christmas 🎄🦢💍',
    
    instructionsHTML: `
        <p>Write a subprogram named <code>output_song</code> that prints the first 5 verses of <em>The Twelve Days of Christmas</em>.</p>
        <p>Your spelling, punctuation, and spacing should match the standard lyrics closely. You must achieve at least <strong>95% accuracy</strong> to pass!</p>
    `,

    challengeTests: `
tester = Tester()
try:
    # Check function structure first
    tester.check_function_exists("output_song")
    tester.check_function_parameters("output_song", 0)

    if tester.confirm_function_parameters("output_song", 0):
        from difflib import SequenceMatcher, unified_diff
        
        # Pre-processed clean target string
        correct_lyrics = (
            "On the first day of Christmas\\nMy true love gave to me\\nA partridge in a pear tree.\\n\\n"
            "On the second day of Christmas\\nMy true love gave to me\\nTwo turtle doves\\nAnd a partridge in a pear tree.\\n\\n"
            "On the third day of Christmas\\nMy true love gave to me\\nThree french hens\\nTwo turtle doves\\nAnd a partridge in a pear tree.\\n\\n"
            "On the fourth day of Christmas\\nMy true love gave to me\\nFour calling birds\\nThree french hens\\nTwo turtle doves\\nAnd a partridge in a pear tree.\\n\\n"
            "On the fifth day of Christmas\\nMy true love gave to me\\nFive gold rings\\nFour calling birds\\nThree french hens\\nTwo turtle doves\\nAnd a partridge in a pear tree."
        )

        # Manually patch stdout to intercept the output
        with patch("sys.stdout", new=StringIO()) as fake_out:
            try:
                globals()["output_song"]()
                student_output = fake_out.getvalue().strip()
                
                # Calculate similarity ratio
                ratio = SequenceMatcher(None, correct_lyrics.strip(), student_output).ratio() * 100
                status = 1 if ratio >= 95.0 else -1
                
                description = f"Checking output text similarity accuracy. Target: >95%. Got: {ratio:.0f}%."
                
                # If they failed but got close (80% - 95%), generate a curated diff snippet
                if status == -1:
                    if ratio >= 80.0:
                        description += "\\n\\n🔍 Here is a hint showing where your lyrics differ (- expected, + yours):\\n"
                        
                        expected_lines = correct_lyrics.strip().splitlines()
                        student_lines = student_output.splitlines()
                        
                        raw_diff = list(unified_diff(expected_lines, student_lines, lineterm=""))
                        
                        # Filter out unified diff metadata headers (---, +++, @@) to keep it readable for kids
                        clean_diff = [line for line in raw_diff[2:] if not line.startswith("@@")]
                        
                        # Show up to the first 6 corrections so the screen isn't flooded
                        description += "\\n".join(clean_diff[:6])
                        if len(clean_diff) > 6:
                            description += "\\n... (additional mismatches found)"
                    else:
                        description += " Lyrics are significantly mismatched. Double-check your spelling, newlines, and punctuation!"
                        
                tester.include_result(description, status)
                
            except Exception as inner_e:
                tester.include_result(f"Runtime error while executing output_song: {inner_e}", -1)

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
