import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <div style="text-align: center;">
      <h1> Hello Rickers!</h1>
      <h3> Welcome to Rick and Morty API </h3>
      <p> I personalizaed this section because i'm tired to see a lot 'Hello Worlds!' on many projects! </p>
      <p> Made with ❤️ by Jess </p>
    </div>
    `;
  }
}
