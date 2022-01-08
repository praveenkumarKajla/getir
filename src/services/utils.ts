 /**
  * return common response object fields 
  * @property code 
  * @property msg
*/
export function getResponseObject(code: number, msg: string) {
    return {
      code,
      msg,
    };
  }