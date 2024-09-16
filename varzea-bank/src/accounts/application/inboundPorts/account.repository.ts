import { Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import { Account } from "../../domain/models/account.model";

@Injectable()
export class AccountRepository {
    //estou fazendo o repository no service com o typeorm
}