import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/config/api.config";
import { ClienteDTO } from "src/models/cliente.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService {
    constructor(
        public http: HttpClient,
        public storage: StorageService
    ) { }


    findByEmail(email: string): Observable<ClienteDTO> {
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({ 'Authorization': 'Bearer Bearer ' + token }); //Por algum motivo precisei colocar duas vezes o Bearer
        console.log("localUser: ", this.storage.getLocalUser());
        console.log("token: " + token);
        console.log("header: " + authHeader.get('Authorization'));


        return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
            { 'headers': authHeader });
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
        return this.http.get(url, { responseType: 'blob' });
    }


}