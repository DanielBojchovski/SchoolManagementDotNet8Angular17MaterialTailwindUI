import { WritableSignal } from "@angular/core";
import { IPrincipalModel } from "../Models/IPrincipalModel";

export interface IListPrincipalViewModel {
    principals: WritableSignal<IPrincipalModel[]>;
}