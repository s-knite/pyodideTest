
export const challenge = {
    id: 't2c-02-09',
    title: 'POCC - ⚛️⚛️⚛️ Periodic table',
    
    instructionsHTML: `
        <p>These tests are for the Time 2 Code challenge 02-09 Periodic Table</p>
		<p><a href="https://time2code.today/python-course/python-level-2/python-periodic-table" target="_blank">Click here to see challenge details</a></p>
		<p>This code will only check that the subprograms work correctly - don't include any inputs here</p>
    `,

    challengeTests: `
# --- Challenge Tests ---
tester = Tester()

try:
    # Check the function exists and has the correct number of parameters
    tester.check_function_exists("periodic_table")
    tester.check_function_parameters("periodic_table", 1)

    # --- Test Cases ---

    # Test Case 1: Typical 1
    tester.full_check(
        "periodic_table",
        args=["K"],
        e_out="""Symbol: K
Element: Potassium
Atomic weight: 39.098
Group: Alkali metals""",
        quiet=False
    )

    # Test Case 2: Typical 2
    tester.full_check(
        "periodic_table",
        args=["Chlorine"],
        e_out="""Symbol: Cl
Element: Chlorine
Atomic weight: 35.45
Group: Halogens""",
        quiet=False
    )

    # Test Case 3: Hidden 1
    tester.full_check(
        "periodic_table",
        args=["Li"],
        e_out="""Symbol: Li
Element: Lithium
Atomic weight: 6.94
Group: Alkali metals""",
        quiet=True
    )

    # Test Case 4: Hidden 2
    tester.full_check(
        "periodic_table",
        args=["Bromine"],
        e_out="""Symbol: Br
Element: Bromine
Atomic weight: 79.904
Group: Halogens""",
        quiet=True
    )

    # Test Case 5: Hidden 3
    tester.full_check(
        "periodic_table",
        args=["Something"],
        e_out="Element is not in the catalogue",
        quiet=True
    )

except Exception as e:
    # Catch any critical errors during test setup
    tester.include_result(
        f"Critical error - test code could not complete: {e}",
        -1 # FAILED
    )

# Final expression returned to JavaScript
tester.json_results()
`

};
