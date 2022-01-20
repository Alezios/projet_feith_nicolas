export class AddJWT {
    static readonly type = '[User] AddJWT';
    constructor(public payload: string) {}
}

export class AddUsername {
    static readonly type = '[User] AddUsername';
    constructor(public payload: string) {}
}