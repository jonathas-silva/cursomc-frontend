import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/config/api.config";

@Injectable()
export class ProdutoService {
    constructor(
        public hhtp: HttpClient
    ) { }

    findByCategoria(categoria_id: string) {
        return this.hhtp.get(
            `${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`
        );
    }

    getSmallImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
        return this.hhtp.get(url, { responseType: 'blob' });
    }

}