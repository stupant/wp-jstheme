import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { PostRevision } from './post-revision.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PostRevisionService {

    private resourceUrl = 'api/post-revisions';

    constructor(private http: Http) { }

    create(postRevision: PostRevision): Observable<PostRevision> {
        const copy = this.convert(postRevision);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(postRevision: PostRevision): Observable<PostRevision> {
        const copy = this.convert(postRevision);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<PostRevision> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(postRevision: PostRevision): PostRevision {
        const copy: PostRevision = Object.assign({}, postRevision);
        return copy;
    }
}
