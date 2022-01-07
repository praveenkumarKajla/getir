export type IResponse = {
    name: string;
    code: string;
    message: string;
};
export class ResponseObject extends Error {
    readonly name: string;

    readonly code: string;

    constructor(response: IResponse) {
      super(response.message);
      this.name = response.name;
      this.code = response.code;
    }
}
