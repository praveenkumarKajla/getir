import * as Code from "@hapi/code"
import * as Lab from "@hapi/lab"
import fs from "fs";
import querystring from "querystring"


const expect      = Code.expect;
const lab         = exports.lab = Lab.script();

// use some BDD verbage instead of lab default
const describe    = lab.describe;
const it          = lab.it;


import * as Server from "../src/index"

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
// tests
describe('Record Routes Test', () => {


    lab.before(async () => {
        // server initialize time
        await delay(3000);
    });

    lab.after(async () => {
         await delay(3000);
        // await Server.server.stop();
    });

    it('Get All Records with sum of counts array between minCount & maxCount', async () => {

        const payload = {
            "startDate": "2016-01-26",
            "endDate": "2018-02-02",
            "minCount": 2700,
            "maxCount": 3000
        }
        const queryParams = querystring.stringify(payload)
        const response = await Server.server.inject({
            method: 'GET',
            url: `/v1/records/?${queryParams}`,
            });
        console.log(response.result)

        expect(response.statusCode).to.equal(200); // valid data
    });

    
  
});



