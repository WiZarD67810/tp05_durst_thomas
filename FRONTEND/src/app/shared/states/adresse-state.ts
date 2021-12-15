import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AddAdresse } from "../actions/addadresse.actions";
import { DeleteAdresse } from "../actions/deleteadresse.actions";
import { AdresseStateModel } from "./adresse-state-models";

@State<AdresseStateModel>({
    name: "adresse",
    defaults: {
        adresses: [],
    },
})
@Injectable()
export class AdresseState {

    @Selector()
    static getAdressesList(state: AdresseStateModel) {
        return state.adresses;
    }

    @Action(AddAdresse)
    add({ getState, patchState }: StateContext<AdresseStateModel>, { adresse }: AddAdresse){
        const state = getState();
        patchState({
            adresses: [...state.adresses, adresse],
        });
    }

    @Action(DeleteAdresse)
    remove({ getState, patchState}: StateContext<AdresseStateModel>, { adresse }: DeleteAdresse) {
        const state = getState();
        patchState({
            adresses: state.adresses.filter(
                item => item !== adresse
            )
        });
    }
}