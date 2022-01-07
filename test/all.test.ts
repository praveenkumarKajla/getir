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

    it('Incorrect Dates throw Error : Get All Records with sum of counts array between minCount & maxCount', async () => {

        const payload = {
            "startDate": "2016-01-26",
            "endDate": "2016-01-25",
            "minCount": 2700,
            "maxCount": 3000
        }
        const queryParams = querystring.stringify(payload)
        const response : any = await Server.server.inject({
            method: 'GET',
            url: `/v1/records/?${queryParams}`,
            });
        console.log(response.result)


        expect(response.statusCode).to.equal(400); // valid status code
        expect(response.result.message).to.equal(`"endDate" must be greater than "ref:startDate"`)
    });

    it('Success : Get All Records with sum of counts array between minCount & maxCount', async () => {

        const payload = {
            "startDate": "2016-01-26",
            "endDate": "2018-02-02",
            "minCount": 2700,
            "maxCount": 3000
        }
        const queryParams = querystring.stringify(payload)
        const response : any = await Server.server.inject({
            method: 'GET',
            url: `/v1/records/?${queryParams}`,
            });

        expect(response.statusCode).to.equal(200); // valid code
        expect(response.result.code).to.equal(0);
        expect(response.result.msg).to.equal("Success");
        expect(response.result.records.length).to.greaterThan(-1);
    });

    
  
});



