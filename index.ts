export enum Gender {
    MALE = 'M',
    FEMALE = 'F'
}

export type Person = {
    heidth: number,
    gender: Gender
}

export class Persons {
    static instance = new Persons();

    private persons: Person[] = [];

    add(person: Person): void {
        this.persons.push(person);
    }

    men = () => this.persons.filter(x => x.gender == Gender.MALE);
    women = () => this.persons.filter(x => x.gender == Gender.FEMALE);

    private average(persons: Person[]): number {
        return persons.reduce((x, y) => x + y.heidth, 0) / persons.length;
    }

    private max(persons: Person[]): number {
        return persons.reduce((x, y) => Math.max(x, y.heidth), -Infinity);
    }


    private min(persons: Person[]): number {
        return persons.reduce((x, y) => Math.min(x, y.heidth), +Infinity);
    }

    static checkHeidth(heidth: number): boolean {
        return heidth >= 1.1 || heidth <= 2.3;
    }

    toString(): string {
        return `
        Homens: 
        Quantidade: ${this.men().length} média: ${this.average(this.men()).toFixed(2)} maior: ${this.max(this.men())} menor: ${this.min(this.men())}
        Mulheres: 
        Quantidade: ${this.women().length} média: ${this.average(this.women()).toFixed(2)}  maior: ${this.max(this.women())} menor: ${this.min(this.women())}
        `;
    }
}

export class RequestDataHandler {
    static instance = new RequestDataHandler();

    requestHeidth(showmessage: (m: string) => string | null): number {
        const message = 'Informe uma altura válida';
        let result = Number(showmessage(message));

        while (!Persons.checkHeidth(result)) {
            result = Number(showmessage(message));
        }
        return result;
    }
}

const request = RequestDataHandler.instance;
const heidth = request.requestHeidth(window.prompt);

console.log(heidth)