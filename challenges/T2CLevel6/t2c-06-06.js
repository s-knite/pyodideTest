export const challenge = {
    id: 't2c-06-06',
    title: 'Fizz Buzz Challenge 🍾🔢🐝',
    
    instructionsHTML: `
        <p>Write a subprogram named <code>fizz_buzz</code> that accepts a single integer parameter representing the upper limit.</p>
        <p>The subprogram should print the numbers from 1 up to that number. However, for multiples of 3, print <code>"Fizz"</code> instead of the number, and for multiples of 5, print <code>"Buzz"</code>. For numbers which are multiples of both 3 and 5, print <code>"Fizz Buzz"</code>.</p>
    `,

    challengeTests: `
tester = Tester()
try:
    # Check function structure
    tester.check_function_exists("fizz_buzz")
    tester.check_function_parameters("fizz_buzz", 1)

    # Typical 1
    tester.full_check("fizz_buzz", args=[15], e_out="1\\n2\\nFizz\\n4\\nBuzz\\nFizz\\n7\\n8\\nFizz\\nBuzz\\n11\\nFizz\\n13\\n14\\nFizz Buzz", quiet=False)

    # Evaluate 1
    tester.full_check("fizz_buzz", args=[100], e_out="1\\n2\\nFizz\\n4\\nBuzz\\nFizz\\n7\\n8\\nFizz\\nBuzz\\n11\\nFizz\\n13\\n14\\nFizz Buzz\\n16\\n17\\nFizz\\n19\\nBuzz\\nFizz\\n22\\n23\\nFizz\\nBuzz\\n26\\nFizz\\n28\\n29\\nFizz Buzz\\n31\\n32\\nFizz\\n34\\nBuzz\\nFizz\\n37\\n38\\nFizz\\nBuzz\\n41\\nFizz\\n43\\n44\\nFizz Buzz\\n46\\n47\\nFizz\\n49\\nBuzz\\nFizz\\n52\\n53\\nFizz\\nBuzz\\n56\\nFizz\\n58\\n59\\nFizz Buzz\\n61\\n62\\nFizz\\n64\\nBuzz\\nFizz\\n67\\n68\\nFizz\\nBuzz\\n71\\nFizz\\n73\\n74\\nFizz Buzz\\n76\\n77\\nFizz\\n79\\nBuzz\\nFizz\\n82\\n83\\nFizz\\nBuzz\\n86\\nFizz\\n88\\n89\\nFizz Buzz\\n91\\n92\\nFizz\\n94\\nBuzz\\nFizz\\n97\\n98\\nFizz\\nBuzz", quiet=False)

    # Hidden 1
    tester.full_check("fizz_buzz", args=[3], e_out="1\\n2\\nFizz", quiet=True)

    # Hidden 2
    tester.full_check("fizz_buzz", args=[500], e_out="1\\n2\\nFizz\\n4\\nBuzz\\nFizz\\n7\\n8\\nFizz\\nBuzz\\n11\\nFizz\\n13\\n14\\nFizz Buzz\\n16\\n17\\nFizz\\n19\\nBuzz\\nFizz\\n22\\n23\\nFizz\\nBuzz\\n26\\nFizz\\n28\\n29\\nFizz Buzz\\n31\\n32\\nFizz\\n34\\nBuzz\\nFizz\\n37\\n38\\nFizz\\nBuzz\\n41\\nFizz\\n43\\n44\\nFizz Buzz\\n46\\n47\\nFizz\\n49\\nBuzz\\nFizz\\n52\\n53\\nFizz\\nBuzz\\n56\\nFizz\\n58\\n59\\nFizz Buzz\\n61\\n62\\nFizz\\n64\\nBuzz\\nFizz\\n67\\n68\\nFizz\\nBuzz\\n71\\nFizz\\n73\\n74\\nFizz Buzz\\n76\\n77\\nFizz\\n79\\nBuzz\\nFizz\\n82\\n83\\nFizz\\nBuzz\\n86\\nFizz\\n88\\n89\\nFizz Buzz\\n91\\n92\\nFizz\\n94\\nBuzz\\nFizz\\n97\\n98\\nFizz\\nBuzz\\n101\\nFizz\\n103\\n104\\nFizz Buzz\\n106\\n107\\nFizz\\n109\\nBuzz\\nFizz\\n112\\n113\\nFizz\\nBuzz\\n116\\nFizz\\n118\\n119\\nFizz Buzz\\n121\\n122\\nFizz\\n124\\nBuzz\\nFizz\\n127\\n128\\nFizz\\nBuzz\\n131\\nFizz\\n133\\n134\\nFizz Buzz\\n136\\n137\\nFizz\\n139\\nBuzz\\nFizz\\n142\\n143\\nFizz\\nBuzz\\n146\\nFizz\\n148\\n149\\nFizz Buzz\\n151\\n152\\nFizz\\n154\\nBuzz\\nFizz\\n157\\n158\\nFizz\\nBuzz\\n161\\nFizz\\n163\\n164\\nFizz Buzz\\n166\\n167\\nFizz\\n169\\nBuzz\\nFizz\\n172\\n173\\nFizz\\nBuzz\\n176\\nFizz\\n178\\n179\\nFizz Buzz\\n181\\n182\\nFizz\\n184\\nBuzz\\nFizz\\n187\\n188\\nFizz\\nBuzz\\n191\\nFizz\\n193\\n194\\nFizz Buzz\\n196\\n197\\nFizz\\n199\\nBuzz\\nFizz\\n202\\n203\\nFizz\\nBuzz\\n206\\nFizz\\n208\\n209\\nFizz Buzz\\n211\\n212\\nFizz\\n214\\nBuzz\\nFizz\\n217\\n218\\nFizz\\nBuzz\\n221\\nFizz\\n223\\n224\\nFizz Buzz\\n226\\n227\\nFizz\\n229\\nBuzz\\nFizz\\n232\\n233\\nFizz\\nBuzz\\n236\\nFizz\\n238\\n239\\nFizz Buzz\\n241\\n242\\nFizz\\n244\\nBuzz\\nFizz\\n247\\n248\\nFizz\\nBuzz\\n251\\nFizz\\n253\\n254\\nFizz Buzz\\n256\\n257\\nFizz\\n259\\nBuzz\\nFizz\\n262\\n263\\nFizz\\nBuzz\\n266\\nFizz\\n268\\n269\\nFizz Buzz\\n271\\n272\\nFizz\\n274\\nBuzz\\nFizz\\n277\\n278\\nFizz\\nBuzz\\n281\\nFizz\\n283\\n284\\nFizz Buzz\\n286\\n287\\nFizz\\n289\\nBuzz\\nFizz\\n292\\n293\\nFizz\\nBuzz\\n296\\nFizz\\n298\\n299\\nFizz Buzz\\n301\\n302\\nFizz\\n304\\nBuzz\\nFizz\\n307\\n308\\nFizz\\nBuzz\\n311\\nFizz\\n313\\n314\\nFizz Buzz\\n316\\n317\\nFizz\\n319\\nBuzz\\nFizz\\n322\\n323\\nFizz\\nBuzz\\n326\\nFizz\\n328\\n329\\nFizz Buzz\\n331\\n332\\nFizz\\n334\\nBuzz\\nFizz\\n337\\n338\\nFizz\\nBuzz\\n341\\nFizz\\n343\\n344\\nFizz Buzz\\n346\\n347\\nFizz\\n349\\nBuzz\\nFizz\\n352\\n353\\nFizz\\nBuzz\\n356\\nFizz\\n358\\n359\\nFizz Buzz\\n361\\n362\\nFizz\\n364\\nBuzz\\nFizz\\n367\\n368\\nFizz\\nBuzz\\n371\\nFizz\\n373\\n374\\nFizz Buzz\\n376\\n377\\nFizz\\n379\\nBuzz\\nFizz\\n382\\n383\\nFizz\\nBuzz\\n386\\nFizz\\n388\\n389\\nFizz Buzz\\n391\\n392\\nFizz\\n394\\nBuzz\\nFizz\\n397\\n398\\nFizz\\nBuzz\\n401\\nFizz\\n403\\n404\\nFizz Buzz\\n406\\n407\\nFizz\\n409\\nBuzz\\nFizz\\n412\\n413\\nFizz\\nBuzz\\n416\\nFizz\\n418\\n419\\nFizz Buzz\\n421\\n422\\nFizz\\n424\\nBuzz\\nFizz\\n427\\n428\\nFizz\\nBuzz\\n431\\nFizz\\n433\\n434\\nFizz Buzz\\n436\\n437\\nFizz\\n439\\nBuzz\\nFizz\\n442\\n443\\nFizz\\nBuzz\\n446\\nFizz\\n448\\n449\\nFizz Buzz\\n451\\n452\\nFizz\\n454\\nBuzz\\nFizz\\n457\\n458\\nFizz\\nBuzz\\n461\\nFizz\\n463\\n464\\nFizz Buzz\\n466\\n467\\nFizz\\n469\\nBuzz\\nFizz\\n472\\n473\\nFizz\\nBuzz\\n476\\nFizz\\n478\\n479\\nFizz Buzz\\n481\\n482\\nFizz\\n484\\nBuzz\\nFizz\\n487\\n488\\nFizz\\nBuzz\\n491\\nFizz\\n493\\n494\\nFizz Buzz\\n496\\n497\\nFizz\\n499\\nBuzz", quiet=True)

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
