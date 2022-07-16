import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {map} from "rxjs";
import {bitgo, getOptions} from '../../config/bitgo.config';

@Injectable()
export class BitgoAccountService {

    constructor(private readonly httpService: HttpService) {}

    login(username: string, password: string) {

        bitgo().session()
            .then(response => {
                console.log("User is already logged in")
                return ({user: response})
            })
            .catch(error => {

                var otp = "0000000"
                bitgo().authenticate({username, password, otp})
                    .then(response => {
                        var token = response.token;
                        var user = response.user;
                        console.log('Login Success!');
                        return ({token, user});
                    })
            });
    }

    logout() {
        bitgo().logout()
    }

    getAuditLogs() {
        const req_url = process.env.BITGO_SERVER_URL + "/auditlog";

        return this.httpService.get(req_url, getOptions(req_url)).pipe(
            map(response => response.data)
        );
    }

    unlockAccount() {
        bitgo().unlock({ otp: '0000000' }).then(function (unlockResponse) {
            return unlockResponse
        });
    }

}
