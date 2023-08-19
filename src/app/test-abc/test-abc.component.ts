import { Component } from '@angular/core';

@Component({
  selector: 'app-test-abc',
  templateUrl: './test-abc.component.html',
  styleUrls: ['./test-abc.component.css']
})
export class TestAbcComponent {
  persons: Persons = Persons.instance;
  constructor() {
    const request = RequestDataHandler.instance;
    
    request.handler(this.persons, window.prompt);

  }
}

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
    return heidth >= 1.1 && heidth <= 2.3;
  }

  static checkGender(gender: string): boolean {
    return ['F', 'M'].includes(gender[0].toUpperCase());
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

  private requestHeidth(showmessage: (m: string, t:string) => string | null): number {
    const message = 'Informe uma altura válida';
    const tempate = '1.1';
    let result = Number(showmessage(message,tempate));

    while (!Persons.checkHeidth(result)) {
      result = Number(showmessage(message,tempate));
    }
    return result;
  }

  private requestGender(showmessage: (m: string, t:string) => string | null): Gender {
    const message = 'Informe um gênero válido\nM: masculino\nF: feminino';
    const tempate = 'F';

    let result = showmessage(message, tempate)?.[0].toUpperCase();

    while (!Persons.checkGender(result ?? '')) {
      result = showmessage(message, tempate)?.[0].toUpperCase();
    }

    if (result === Gender.FEMALE)
      return Gender.FEMALE;

    return Gender.MALE;
  }

  private requestPerson(showmessage: (m: string,t:string) => string | null): Person {

    let heidth = this.requestHeidth(showmessage);

    let gender = this.requestGender(showmessage);

    return { heidth: heidth, gender: gender };
  }

  handler(persons: Persons, showmessage: (m: string, t:string) => string | null) {

    const person = this.requestPerson(showmessage);
    persons.add(person);

    const message = 'Parar?\n S: sim\n N: não';
    const tempate = 'N';

    let result = showmessage(message, tempate)?.[0].toUpperCase();

    if (result === 'S') {
      return;
    }

    this.handler(persons, showmessage);
  }
}

