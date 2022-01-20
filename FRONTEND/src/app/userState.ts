import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Observable } from "rxjs";
import { AddJWT, AddUsername } from "./userAction";
import { UserStateModel } from "./userStateModel";

@Injectable({
    providedIn: 'root'
  })
@State<UserStateModel>({
    name: 'user',
    defaults: {
        tokenJwt: '',
        username: '',
    }
})

export class UserState {
    @Selector()
    static getTokenJwt(state: UserStateModel) {
        return state.tokenJwt;
    }

    @Selector()
    static getLogin(state: UserStateModel) {
        return state.username;
    }

    @Action(AddJWT)
    addJWT( { patchState }: StateContext<UserStateModel>, { payload }: AddJWT ): void {
        patchState({ tokenJwt: payload });
    }

    @Action(AddUsername)
    addUsername( { patchState }: StateContext<UserStateModel>, { payload }: AddUsername ): void {
        patchState({ username: payload });
    }
}