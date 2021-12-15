export class Produit {

    CheminImage: string = "";
    DateAjout: string = "";
    Resume: string = "";
    Descriptif: string = "";
    Note: number = -1;
    Type: string = "";
    Etat: string = "";

    constructor(public Reference: string,
        public Intitule: string,
        public Prix: number) { }
}