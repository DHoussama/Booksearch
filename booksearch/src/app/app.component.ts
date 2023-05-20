import { Component } from '@angular/core';
import { take } from 'rxjs';
import { DictionaryService } from './core/services/dictionary.service';
import { Dictionary } from 'src/app/shared/models/dictionary';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  word = '';
  definition = '';
  definition2 = '' ;
  synonyms = '';
  theme = '';
  themeButtonLabel = '';

  constructor(private service: DictionaryService) {
    this.themeButtonLabel = this.theme ? 'Light' : 'Dark';
  }

  sendRequest(word: string) {
    if (!word) {
      this.definition = '';
      this.word = '';
    } else {
      this.service
        .getInfo(word)
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            this.word = data.word;
            this.definition = data.meanings[0].definitions[0].definition;
            this.definition2 = data.meanings[1].definitions[0].definition;
            this.synonyms = data.meanings[3].synonyms[1]; 
          },
          error: () => {
            this.word = 'Not found';
            this.definition = '';
            this.definition2 = '';
            this.synonyms = '';
          },
        });
    }
  }

  changeTheme() {
    this.theme = this.theme ? '' : 'dark-mode';
    this.themeButtonLabel = this.theme ? 'Light' : 'Dark';
  }
}