import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { API_CONFIG } from "src/config/api.config";
import { CategoriaDTO } from "src/models/categoria.DTO";

@Injectable()
export class CategoriaService {
    constructor(public http: HttpClient) {

    }

    findAll(): Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }
}

