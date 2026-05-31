export const challenge = {
    id: 't2c-07-05',
    title: 'POCC - Disemvowel 🚫🔠🔡',
    
    instructionsHTML: `
        <p>This test checks your <code>dvowel</code> subprogram.</p>
        <p>The function should take a single string parameter and return that string with certain character sequences or vowels removed or translated according to the rules.</p>
        <p>This code will only check the subprogram logic - don't include any global inputs here.</p>
    `,

    challengeTests: `
tester = Tester()
try:
    # --- dvowel ---
    tester.check_function_exists("dvowel")
    tester.check_function_parameters("dvowel", 1)

    # Test cases
    tester.full_check("dvowel", args=["Hello world"], e_return="Hll wrld", quiet=False)
    tester.full_check("dvowel", args=["The quick brown fox jumps over the lazy dog"], e_return="Th qck brwn fx jmps vr th lzy dg", quiet=False)
    tester.full_check("dvowel", args=["Computers are incredibly fast, accurate, and stupid. Human beings are incredibly slow, inaccurate, and brilliant. Together they are powerful beyond imagination."], e_return="Cmptrs r ncrdbly fst, ccrt, nd stpd. Hmn bngs r ncrdbly slw, nccrt, nd brllnt. Tgthr thy r pwrfl bynd mgntn.", quiet=False)
    tester.full_check("dvowel", args=["The real danger is not that computers will begin to think like men, but that men will begin to think like computers."], e_return="Th rl dngr s nt tht cmptrs wll bgn t thnk lk mn, bt tht mn wll bgn t thnk lk cmptrs.", quiet=False)
    tester.full_check("dvowel", args=["TAha1s E1es Itih3 Oso3OcorO3ot Umu3UsusU4ug3"], e_return="Th1s 1s th3 s3cr3t m3ss4g3", quiet=False)

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
