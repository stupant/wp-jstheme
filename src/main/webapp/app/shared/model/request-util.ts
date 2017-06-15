import { URLSearchParams, BaseRequestOptions } from '@angular/http';

export const createRequestOption = (req?: any): BaseRequestOptions => {
    const options: BaseRequestOptions = new BaseRequestOptions();
    if (req) {
        const params: URLSearchParams = new URLSearchParams();
        const keys = Object.keys(req);
        for (const k of keys){
          console.log('Request:', k, req[k]);
          params.set(k, req[k]);
        }
        options.params = params;
    }
    return options;
};
