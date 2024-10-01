import { Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import { Client } from "../../domain/client.model";
import axios from "axios";
import { response } from "express";

@Injectable()
export class ClientRepository {
 // repository foi criada na service pelo typeorn
}